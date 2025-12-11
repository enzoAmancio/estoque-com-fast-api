# Inventory Control App

This is a mobile application built with React Native and Expo for managing inventory control. The app allows users to log in, view inventory items, manage movements (entry, exit, and exchange), and track movement history.

## Features

- **User Authentication**: Users can log in using their credentials. The app uses JWT for secure authentication.
- **Inventory Visualization**: Users can view a list of inventory items, including their names, categories, and quantities.
- **Movements Management**: Users can navigate to different screens to manage inventory movements, including entries, exits, and exchanges.
- **Movement History**: Users can view the history of all movements made in the inventory.

## Project Structure

```
controle-ti-app
├── src
│   ├── screens
│   │   ├── LoginScreen.js
│   │   ├── EstoqueScreen.js
│   │   ├── MovimentacoesScreen.js
│   │   └── HistoricoScreen.js
│   ├── components
│   │   ├── Card.js
│   │   ├── Button.js
│   │   └── Input.js
│   ├── services
│   │   ├── api.js
│   │   └── storage.js
│   ├── navigation
│   │   └── AppNavigator.js
│   └── utils
│       └── constants.js
├── assets
│   └── adaptive-icon.png
├── App.js
├── app.json
├── package.json
├── babel.config.js
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd controle-ti-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open the app in an emulator or on a physical device using the Expo Go app.

## Usage

- **Login**: Enter your username and password to log in.
- **Home Screen**: After logging in, you will see a greeting message and options to navigate to the inventory, movements, and logout.
- **Inventory**: View the list of items in the inventory and refresh the list as needed.
- **Movements**: Access different types of inventory movements and manage them accordingly.
- **History**: Check the history of all movements made in the inventory.

## Technologies Used

- React Native
- Expo
- Axios
- AsyncStorage
- React Navigation
- FastAPI (backend)

## License

This project is licensed under the MIT License. See the LICENSE file for details.