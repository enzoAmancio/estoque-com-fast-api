# Sistema de Controle de Estoque - Vertical

Sistema mobile de controle de estoque desenvolvido com **React Native + Expo** (frontend) e **FastAPI** (backend).

## 🎨 Design
- **Tema:** Preto elegante com detalhes em ouro (#FFD700)
- **Empresa:** Vertical

## 📱 Funcionalidades

### Autenticação
- Login com JWT
- Token armazenado localmente com AsyncStorage

### Gestão de Estoque
- **Visualizar Estoque**: Lista completa de itens
- **Entrada**: Registrar entrada de itens no estoque
- **Saída**: Registrar saída de itens
- **Troca**: Movimentar itens entre setores
- **Histórico**: Visualizar todas as movimentações

## 🚀 Tecnologias

### Frontend (Mobile)
- React Native 0.81.5
- Expo SDK 54
- React Navigation 6
- Axios
- AsyncStorage

### Backend (API)
- FastAPI
- SQL Server conexão por (pyodbc)
- JWT Authentication
- Passlib + Jose

## ⚙️ Configuração

### Backend
```bash
# Ativar ambiente virtual
/venv/Scripts/Activate.ps1

# Instalar dependências
pip install -r requirements.txt

# Iniciar servidor
python -m uvicorn app:app --host seuipdoback --port 8000 
```

### Frontend
```bash
cd controle-ti-app-1

# Instalar dependências
npm install

# Iniciar Expo
npm start
```

## 🔧 Configuração de Rede
- **Backend:** http://seuip:8000
- **Metro Bundler:** exp://seuip:8081
- **Modo:** LAN (necessário para conexão entre dispositivos)

## 📂 Estrutura do Projeto

```
estoque-vert/
├── controle-ti-app-1/          # App React Native
│   ├── src/
│   │   ├── screens/            # Telas do app
│   │   ├── navigation/         # Configuração de rotas
│   │   └── utils/              # Utilitários (theme.js)
│   ├── App.js
│   └── package.json
│
├── estoque-backend/            # API FastAPI
│   ├── app.py                  # Aplicação principal
│   └── requirements.txt
│
└── venv/                       # Ambiente virtual Python
```

## 🎯 Endpoints da API

### Autenticação
- `POST /login` - Login de usuário
- `POST /register` - Cadastro de usuário

### Estoque
- `GET /estoque` - Listar itens
- `POST /itens` - Criar novo item
- `POST /estoque/entrada` - Registrar entrada
- `POST /estoque/saida` - Registrar saída
- `POST /estoque/troca` - Trocar entre setores
- `GET /estoque/movimentacoes` - Histórico

## 👨‍💻 Desenvolvido para
**Vertical** - Controle de TI
