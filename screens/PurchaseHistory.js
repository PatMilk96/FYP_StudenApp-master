import { React, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useAuth } from '../auth';
import { useNavigation } from '@react-navigation/native';

const PurchaseHistory = () => {
    const { authState, updatePurchaseHistory, setUser } = useAuth();
    const { user } = authState;
    const navigation = useNavigation();

    useEffect(() => {
        console.log("Updated purchases:", user.purchases);
    }, [user.purchases]); // Log updated purchases whenever user.purchases changes

    const handleBack = () => {
        navigation.goBack();
    };

    const handleRefreshHistory = async () => {
        try {
            const result = await updatePurchaseHistory();
            if (result && result.error) {
                alert(result.msg);
            }
        } catch (error) {
            console.error('Error during refresh: ', error);
            alert('Error during refresh. Please try again.');
        }
    };

    //console.log(user.purchases);

  return (
    <View style={styles.container}>
      <FlatList
        data={user.purchases}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.purchaseItem}>
            <Text style={styles.purchaseName}>{item.name}</Text>
            <Text style={styles.purchaseName}>Price: €{item.price}</Text>
            <Text style={styles.purchaseName}>Purchase Date: {item.purchaseDate}</Text>
          </View>
        )}
      />
      <Button title="Refresh" onPress={handleRefreshHistory} color="#115b5d" />
      <Button title="Back" onPress={handleBack} color="#115b5d" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#45828a',
    padding: 20,
  },
  purchaseItem: {
    backgroundColor: '#79b8c9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  purchaseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  purchasePrice: {
    fontSize: 14,
  },
});

export default PurchaseHistory;