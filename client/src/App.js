import React from 'react';
<<<<<<< HEAD
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
  } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

import { setContext } from "@apollo/client/link/context";
const httpLink = createHttpLink({
    uri: "/graphql",
});
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("id_token");
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});
=======
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

// const authLink = setContext((_, { headers }) => {
//     const token = localStorage.getItem('id_token');
//     return {
//         headers: {
//             ...headers,
//             authorization: token ? `Bearer ${token}` : '',
//         },
//     };
// });

>>>>>>> fe9a1d5dc3e319c68e79251466b74273c1751fe7
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
<<<<<<< HEAD
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
    </ApolloProvider>
  );
=======
    return (
        <ApolloProvider client={client}>
            <Router>
                <div>
                    <TaskManager>
                        <Nav />
                        <Switch>
                            <Route exact path="/" component={Dashboard} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/signup" component={Signup} />
                            <Route exact path="/tasks" component={Tasks} />
                            <Route exact path="/team" component={Team} />
                        </Switch>
                    </TaskManager>
                </div>
            </Router>
        </ApolloProvider>
    );
>>>>>>> fe9a1d5dc3e319c68e79251466b74273c1751fe7
}

export default App;