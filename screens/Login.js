import { View, Image, Button, TextInput, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../auth';
import { styles } from '../styles/appStyles';
import logo from '../images/logo.png';
import CanteenATU from '../images/CanteenATU.png';

const Login = () => {
    const { onLogin, onRegister } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        const result = await onLogin(email, password);
        if (result && result.error) {
            alert(result.msg);
            console.log('Result:', result)
        } else{
            setEmail('');
            setPassword('');
        }
    };

    const register = async () => {
        const result = await onRegister(email, password);
        if (result && result.error) {
            alert(result.msg);
        } else{
            login();
        }
    };



    return (
        <View style={styles.container}>
        <View style={styles.authContainer}>
            <ImageBackground source={CanteenATU} style={styles.imageBackground}>
                <Image source={logo} style={styles.logo2} />
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
                    autoCapitalize="none"
                    secureTextEntry
                />
                <View style={styles.buttonContainer}>
                    <Button onPress={login} title="Sign In" style={styles.button} color="#115b5d" />
                </View>
                <View style={styles.buttonContainer}>
                    <Button onPress={register} title="Create Account" style={styles.button} color="#115b5d" />
                </View>
            </ImageBackground>
        </View>
    </View>
    );
};

export default Login;