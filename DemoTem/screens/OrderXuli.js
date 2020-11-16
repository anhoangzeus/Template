import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const OrderXuli = () => {
    return (
      <View style={styles.container}>
        <Text>Xuli Screen</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default OrderXuli;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});