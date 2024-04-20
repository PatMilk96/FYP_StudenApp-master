import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../auth';
import { styles } from '../styles/appStyles';

const Home = () => {
    const { authState, updateBalance } = useAuth();
    const { user } = authState;
    const navigation = useNavigation();

     const handleTopUp = () => {
    navigation.navigate('TopUp');
  };

  const handlePurchaseHistory = () => {
    navigation.navigate('PurchaseHistory');
  };

  const handleUpdateBalance = async () => {
        try {
            const result = await updateBalance();
            if (result && result.error) {
                alert(result.msg);
            }
        } catch (error) {
            console.error('Error during refresh: ', error);
            alert('Error during refresh. Please try again later.');
        }
    };

  const formattedBalance = user.balance.toFixed(2);

    return (
        <View style={styles.homeContainer}>
            <Text>Welcome</Text>
            <Text style={styles.emailText}>{user.email}</Text>
            <Text style={styles.balanceText}>Balance: €{formattedBalance}</Text>
            <View style={styles.buttonContainer}>
            <View style={styles.buttonContainer}>
                <Button title="Top Up Account" onPress={handleTopUp} color="#115b5d" />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Purchase History" onPress={handlePurchaseHistory} color="#115b5d" />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Update Balance" onPress={handleUpdateBalance} color="#115b5d" />
            </View>
         </View>
        </View>
    );
};

export default Home;
