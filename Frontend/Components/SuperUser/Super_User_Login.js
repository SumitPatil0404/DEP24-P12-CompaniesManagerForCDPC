import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from '../Common/LoadingScreen';
import fetchAPI from '../../Tools/FetchAPI';
import { BASE_URL } from '../../api';

const getCycleNumber = date => {
  const month = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
  const year = date.getFullYear();

  // Check if the date falls between June 2023 and May 2024
  if (month <= 5) {
    return (year - 1) % 100; // Return the last two digits of the year
  } else {
    // Return a default value or handle other cases as needed
    return year % 100; // Or any other default value
  }
};

const Super_User_Login = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleEmailValidation = (email) => {
    const emailRegex = /@iitrpr\.ac\.in$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    setLoading(true);

    try {
      if (!handleEmailValidation(email)) {
        Alert.alert('Invalid Email', 'Please enter a valid IIT Ropar email address.');
        return;
      }
      let cycle= getCycleNumber(new Date());
      let response1= await fetchAPI(`${BASE_URL}/placement/selectcycle`, { cycle }, 'POST', false);
      console.log(response1);
      cycle=response1.data[0];
      let t = { email: email ,cycle_id:cycle.cycle_id};
      let response = await fetchAPI(`${BASE_URL}/superuser/login`, t, 'POST', false);

      console.log(response);

      if (response.isUserPresent) {
        navigation.navigate('Super_User_OTP', { email ,cycle});
      } else {
        Alert.alert('Invalid Email', 'The provided email is not a Super User.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Super User</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        placeholderTextColor="#555"
        onChangeText={(text) => setEmail(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {loading && <LoadingScreen />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#202020',
  },
  title: {
    color: '#2ecc71',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'San Francisco',
    color: '#fff',
  },
  input: {
    color: 'black',
    height: 40,
    width: '80%',
    borderColor: '#2ecc71',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#fff',
  },
  button: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    width: '70%',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'San Francisco',
  },
});

export default Super_User_Login;
