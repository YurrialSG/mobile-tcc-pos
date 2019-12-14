import React from 'react';
import { NativeRouter, Switch, Route } from 'react-router-native';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './src/graphql/client';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/components/TabsNavigator';
// import List from './src/screens/List';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NativeRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/home" component={Home} />
        </Switch>
      </NativeRouter>
    </ApolloProvider>
  );
}
