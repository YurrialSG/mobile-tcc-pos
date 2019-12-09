import React from 'react';
import { NativeRouter, Switch, Route } from 'react-router-native';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/components/TabsNavigator';

export default function App() {
  return (
    <NativeRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={Home} />
      </Switch>
    </NativeRouter>
  );
}
