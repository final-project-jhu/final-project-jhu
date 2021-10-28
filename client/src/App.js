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
import Nav from './components/Nav';
import { TaskManager } from './utils/GlobalState';

const httpLink = createHttpLink({
    uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});


const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {

    return (
        <ApolloProvider client={client}>
            <Router>
                <div>
                   
                        {/* <Nav /> */}
                        <Switch>
                            <Route exact path="/" component={Dashboard} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/signup" component={Signup} />
                            <Route exact path="/tasks" component={Tasks} />
                            <Route exact path="/team" component={Team} />
                        </Switch>
                    
                </div>
            </Router>
        </ApolloProvider>
    );

}

export default App;