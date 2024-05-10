import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from './LoadingScreen';

const Welcome_Page = () => {
  const navigation = useNavigation();

  const handleSuperUserPress = () => {
    navigation.navigate('Super_User_Login');
  };

  const handleSpocPress = () => {
    navigation.navigate('Spoc_Login');
  };

  const handleCorPress = () => {
    navigation.navigate('Spoc_Login');
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the CDPC</Text>

      <TouchableOpacity style={styles.button} onPress={handleSuperUserPress}>
        <Text style={styles.buttonText}>Super User</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={[styles.button, styles.signupButton1]} onPress={handleCorPress}>
        <Text style={styles.buttonText}>DPC/ IC/ DIC</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={[styles.button, styles.signupButton]} onPress={handleSpocPress}>
        <Text style={styles.buttonText}>Student Representative</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#202020', // Set a black background color
  },
  title: {
    color: '#2ecc71', // Set a green color
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'San Francisco',
    color: '#fff', // Set white text color
  },
  button: {
    backgroundColor: '#2ecc71', // Set a green background color
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 30, // Make the button rounded
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#000', // Set black text color
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'San Francisco',
  },
  signupButton: {
    backgroundColor: '#FFD700',
   // Set a yellow color for the signup button
  },
  signupButton1: {
    backgroundColor: '#657e8c', // Set a yellow color for the signup button
  },
});

export default Welcome_Page;
