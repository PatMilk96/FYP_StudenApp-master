import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/appStyles';
import { useAuth } from '../auth';
import { ActivityIndicator } from 'react-native';

const TopUp = () => {
    const [topUpAmount, setTopUpAmount] = useState('');
    const [cardholderName, setCardholderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const { authState, performTopUp } = useAuth();
    const { user } = authState;
    const formattedBalance = user.balance.toFixed(2);
    const navigation = useNavigation();

    const handleBack = () => {
        navigation.goBack();
    };

    const handleTopUp = async () => {
        if (!topUpAmount || !cardholderName || !cardNumber || !expiryDate || !cvv) {
            Alert.alert('All fields are required');
            return;
        }

        try {
            const result = await performTopUp(topUpAmount);
            console.log("handleTopUp ", user.balance)
            if (result && result.error) {
                Alert.alert(result.msg);
            } else {
                Alert.alert('Top-Up successful');
            }
        } catch (error) {
            console.error('Error during top-up:', error);
            Alert.alert('Error during top-up. Please try again.');
        }
    };

    if (!user) {
        return <ActivityIndicator />; 
    }


    return (
        <View style={styles.homeContainer}>
            <View style={styles.balanceContainer}>
                <Text style={styles.balanceText}>Balance: €{formattedBalance}</Text>
            </View>
            <ScrollView>
            <View style={styles.topUpContainer}>
                <TextInput
                    style={styles.input}
                    value={topUpAmount}
                    onChangeText={setTopUpAmount}
                    placeholder="Top Up Amount"
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    value={cardholderName}
                    onChangeText={setCardholderName}
                    placeholder="Cardholder Name"
                />
                <TextInput
                    style={styles.input}
                    value={cardNumber}
                    onChangeText={setCardNumber}
                    placeholder="Card Number"
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    value={expiryDate}
                    onChangeText={setExpiryDate}
                    placeholder="Expiry Date"
                />
                <TextInput
                    style={styles.input}
                    value={cvv}
                    onChangeText={setCvv}
                    placeholder="CVV"
                    keyboardType="numeric"
                />
                
                
            </View>
                </ScrollView>
                    <View style={styles.buttonContainer}>
                        <Button title="Top Up" onPress={handleTopUp} color="#115b5d" />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="Back" onPress={handleBack} color="#115b5d" />
                    </View>
        </View>
    );
};

export default TopUp;