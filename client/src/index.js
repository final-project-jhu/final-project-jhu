import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
=======
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

serviceWorker.unregister();
>>>>>>> 22fee636e9773170278a17efaef18413c34a9592
