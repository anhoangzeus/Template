import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Order = () => {
    return (
      <View style={styles.container}>
        <Text>InfoUser Screen</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});