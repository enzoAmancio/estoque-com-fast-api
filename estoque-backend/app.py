from fastapi import FastAPI, HTTPException, Depends
import pyodbc
import os
from passlib.context import CryptContext
from jose import jwt, JWTError
import datetime
from dotenv import load_dotenv
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordRequestForm , OAuth2PasswordBearer

load_dotenv()

app = FastAPI()

server = "localhost\\SQLEXPRESS"
database = "ControleTI"
driver = "{ODBC Driver 18 for SQL Server}"
trusted_connection = "yes"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# --------------------- SCHEMAS ---------------------
class Usuario(BaseModel):
    nome: str
    login: str
    senha: str
    permissao: str | None = "user"

class Item(BaseModel):
    nome_item: str
    descricao: str | None = None
    categoria: str | None = None

class Movimentacao(BaseModel):
    id_item: int
    quantidade: int
    setor_origem: str | None = None
    setor_destino: str | None = None
    descricao: str | None = None


# --------------------- CONEXÃO ---------------------
def get_connection():
    return pyodbc.connect(
        f"DRIVER={driver};"
        f"SERVER={server};"
        f"DATABASE={database};"
        f"Trusted_Connection={trusted_connection};"
        "Encrypt=no;"
    )


# --------------------- AUTH ---------------------
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
CHAVE_SECRETA = os.getenv("SECRET_KEY")
ALGORITMO = os.getenv("ALGORITHM")


def hash_senha(senha): 
    return pwd_context.hash(senha)
def verify_password(senha, hashed): 
    return pwd_context.verify(senha, hashed)


def verificar_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, CHAVE_SECRETA, algorithms=[ALGORITMO])
        return int(payload["sub"])
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido ou expirado")


def verificar_admin(user_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT permissao FROM Usuarios WHERE id = ?", user_id)
    row = cursor.fetchone()
    conn.close()
    if not row or row[0] != "admin":
        raise HTTPException(status_code=403, detail="Acesso negado")


# --------------------- ROTAS ---------------------
@app.post("/register")
def registro(dados: Usuario):
    conn = get_connection()
    cursor = conn.cursor()
    hashed = hash_senha(dados.senha)

    try:
        cursor.execute(
            "INSERT INTO Usuarios (nome,login,senha_hash,permissao) VALUES (?,?,?,?)",
            dados.nome, dados.login, hashed, dados.permissao
        )
        conn.commit()
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=400, detail=str(e))
    
    conn.close()
    return {"status": "Usuário admin criado com sucesso!"}


@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT id, senha_hash FROM Usuarios WHERE login = ?", form_data.username)
    row = cursor.fetchone()
    if not row:
        raise HTTPException(status_code=401, detail="Usuário não encontrado")

    user_id, senha_hash = row
    if not verify_password(form_data.password, senha_hash):
        raise HTTPException(status_code=401, detail="Senha incorreta")

    expiration = datetime.datetime.utcnow() + datetime.timedelta(hours=8)
    token = jwt.encode({"sub": str(user_id), "exp": expiration}, CHAVE_SECRETA, algorithm=ALGORITMO)

    conn.close()
    return {"access_token": token, "token_type": "bearer"}


# ============== ITENS ==============
@app.post("/itens")
def adicionar_item(item: Item, user_id: int = Depends(verificar_token)):
    verificar_admin(user_id)
    
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            INSERT INTO Itens (nome_item, descricao, categoria)
            VALUES (?, ?, ?)""",
            item.nome_item, item.descricao, item.categoria)

        cursor.execute("SELECT @@IDENTITY")
        id_item = cursor.fetchone()[0]

        cursor.execute("INSERT INTO Estoque (id_item, quantidade) VALUES (?, 0)", id_item)

        conn.commit()
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=400, detail=str(e))
    
    conn.close()
    return {"status": "Item criado!", "id_item": id_item}


@app.get("/itens")
def listar_itens(token: str = Depends(oauth2_scheme)):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, nome_item, categoria FROM Itens")
    items = [{"id": r[0], "nome": r[1], "categoria": r[2]} for r in cursor.fetchall()]
    conn.close()
    return items


# ============== ESTOQUE ==============
@app.get("/estoque")
def listar(user_id: int = Depends(verificar_token)):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT I.id, I.nome_item, E.quantidade, I.categoria
        FROM Estoque E
        JOIN Itens I ON E.id_item = I.id
    """)
    rows = cursor.fetchall()
    conn.close()
    return [
        {"id_item": r[0], "nome_item": r[1], "quantidade": r[2], "categoria": r[3]}
        for r in rows
    ]


@app.post("/estoque/entrada")
def entrada(mov: Movimentacao, user_id: int = Depends(verificar_token)):
    verificar_admin(user_id)
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("UPDATE Estoque SET quantidade = quantidade + ? WHERE id_item = ?",
                   mov.quantidade, mov.id_item)
    
    cursor.execute("""
        INSERT INTO Movimentacoes (id_item, id_usuario, tipo, quantidade, setor_destino, descricao)
        VALUES (?, ?, 'entrada', ?, ?, ?)""",
        mov.id_item, user_id, mov.quantidade, mov.setor_destino, mov.descricao)

    conn.commit()
    conn.close()
    return {"status": "Entrada registrada!"}


@app.post("/estoque/saida")
def saida(mov: Movimentacao, user_id: int = Depends(verificar_token)):
    verificar_admin(user_id)
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT quantidade FROM Estoque WHERE id_item = ?", mov.id_item)
    row = cursor.fetchone()
    if not row or row[0] < mov.quantidade:
        conn.close()
        raise HTTPException(status_code=400, detail="Quantidade insuficiente")

    cursor.execute("UPDATE Estoque SET quantidade = quantidade - ? WHERE id_item = ?",
                   mov.quantidade, mov.id_item)
    
    cursor.execute("""
        INSERT INTO Movimentacoes (id_item, id_usuario, tipo, quantidade, setor_origem, setor_destino, descricao)
        VALUES (?, ?, 'saida', ?, ?, ?, ?)""",
        mov.id_item, user_id, mov.quantidade, mov.setor_origem, mov.setor_destino, mov.descricao)

    conn.commit()
    conn.close()
    return {"status": "Saída registrada!"}


@app.get("/estoque/movimentacoes")
def listar_mov(user_id: int = Depends(verificar_token)):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT M.id, I.nome_item, M.tipo, M.quantidade, M.setor_origem, M.setor_destino, M.descricao, M.data_mov
        FROM Movimentacoes M
        JOIN Itens I ON M.id_item = I.id
        ORDER BY M.data_mov DESC
    """)

    rows = cursor.fetchall()
    conn.close()

    return [
        {
            "id": r[0],
            "item": r[1],
            "tipo": r[2],
            "quantidade": r[3],
            "setor_origem": r[4],
            "setor_destino": r[5],
            "descricao": r[6],
            "data_mov": r[7],
        }
        for r in rows
    ]
