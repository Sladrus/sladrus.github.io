import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TelegramService from './components/telegram/TelegramService';
import KeysStore from './store/KeysStore';
import ProjectStore from './store/ProjectStore';
import UserStore from './store/UserStore';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider
    value={{
      keysStore: new KeysStore(),
      userStore: new UserStore(),
      projectStore: new ProjectStore(),
      telegramService: new TelegramService(),
    }}
  >
    <App />
  </Context.Provider>
);
