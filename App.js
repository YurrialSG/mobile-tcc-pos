import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './src/components/graphql/client';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import ServiceNew from './src/screens/ServiceNew';
import Home from './src/components/TabsNavigator';

export default function App() {

  const [user, setUser] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then((value) => {
        const data = JSON.parse(value);
        if (data) {
          setUser(true)
        }
      })
  })

  return (
    <ApolloProvider client={client}>
      <NativeRouter>
        {user ?
          <Switch>
            {/* <Route exact path="/" component={Login} /> */}
            <Route exact path="/" component={Home} />
            <Route path="/serviceNew" component={ServiceNew} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
          </Switch>
          :
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/serviceNew" component={ServiceNew} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={Home} />
          </Switch>
        }
      </NativeRouter>
    </ApolloProvider>
  );
}
