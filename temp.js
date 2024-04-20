const Stack = createNativeStackNavigator()
const ngrok = 'https://bde7-109-78-78-220.ngrok-free.app';

export default App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const handleAuthentication = async () => {
    try {
      const response = await fetch(
        isLogin ? {ngrok} + '/signin' : {ngrok} + '/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            confirmPassword: isLogin ? undefined : confirmPassword, // Only send confirmPassword for signup
          }),
        }
      );
      const data = await response.json();

      if (data.success) {
        setUser(data.user); // Assuming your server returns the authenticated user object
        console.log(data.user);
      } else {
        // Handle authentication failure (e.g., display error message)
        console.error('Authentication failed:', data.message);
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
      console.log(error.data);
      //console.log(error);
      //console.log(error);
    }
  };
  //###########################################################################################

  const toggleAuthMode = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      {!isLogin && (
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          secureTextEntry
        />
      )}
      <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} />
      <Button
        title={isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        onPress={toggleAuthMode}
      />
    </View>
  );
};




//#######################################################################################

/*
// import * as React from 'react';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, ImageBackground  } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ATU from './images/ATU.png';
import logo from './images/logo.png';
import CanteenATU from './images/CanteenATU.png';
import { styles } from './styles/appStyles';
import { Dimensions } from 'react-native';
import { AuthProvider, useAuth } from './auth';

const Stack = createNativeStackNavigator();
const ngrok = 'https://f010-109-78-78-220.ngrok-free.app';

const AuthScreen = ({ email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, isLogin, setIsLogin, errorMessage }) => {
  const { onLogin } = useAuth();

  const handleAuthentication = async () => {
    try {
      const result = await onLogin(email, password);
      if (result.error) {
        // Handle authentication error
        console.log(result.msg);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      // Handle other errors
      console.log('An error occurred. Please try again later.');
    }
  };
  
  return (
    <View>
      <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      {!isLogin && (
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          secureTextEntry
        />
      )}
        <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} />
        {errorMessage && <Text>{errorMessage}</Text>}
    </View>
  );
};

/*
const AuthenticatedScreen = ({ user, handleSignOut }) => {
  const { onLogout } = useAuth();

  const handleSignOut = async () => {
    try {
      await onLogout();
    } catch (error) {
      console.error('Sign out error:', error.message);
    }
  };
  
  return (
    <View>
=
      <Text>Welcome, {user.email}</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};
*/

/*
const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Auth" component={AuthScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <NavigationContainer>
      <AuthProvider>
        <AuthNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;

*/