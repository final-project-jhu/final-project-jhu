import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Tasks from './pages/Tasks';
import Team from './pages/Team';

const httpLink = createHttpLink({
    uri: '/graphql',
});

// const authLink = setContext((_, { headers }) => {
//     const token = localStorage.getItem('id_token');
//     return {
//         headers: {
//             ...headers,
//             authorization: token ? `Bearer ${token}` : '',
//         },
//     };
// });

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div>

                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;