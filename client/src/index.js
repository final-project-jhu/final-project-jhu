import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { TaskProvider } from './utils/GlobalState';

ReactDOM.render(
    <React.StrictMode>
        < TaskProvider>
            <App />
        </TaskProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// serviceWorker.unregister();

