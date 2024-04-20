// import * as React from 'react';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, ImageBackground  } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './auth';
import Login from './screens/Login';
import  Home  from './screens/Home';
import TopUp from './screens/TopUp';
import PurchaseHistory from './screens/PurchaseHistory';

const Stack = createNativeStackNavigator();

export default App = () => {
    const { authState, onLogout } = useAuth();

  return (
      <AuthProvider>
        <Layout></Layout>
      </AuthProvider>
  );
};

export const Layout = () => {
    const { authState, onLogout } = useAuth();

    return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerRight: () => <Button onPress={onLogout} title="Sign Out" />,
              }}
            />
            <Stack.Screen name="TopUp" component={TopUp} />
            <Stack.Screen name="PurchaseHistory" component={PurchaseHistory} />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};