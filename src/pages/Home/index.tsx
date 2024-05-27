import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello world!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121214',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#f1f1f1',
  },
});
