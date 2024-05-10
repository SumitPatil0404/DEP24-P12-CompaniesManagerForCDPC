import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import fetchAPI from '../../Tools/FetchAPI';
import {BASE_URL} from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
// Import your loading component from the components file
import LoadingScreen from '../Common/LoadingScreen';


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
const Spoc_Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('hpc');
  const [loading, setLoading] = useState(false);

  const navigation1 = useNavigation();

  const handleEmailValidation = (email) => {
    const emailRegex = /@iitrpr\.ac\.in$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    const isValidEmail = handleEmailValidation(email);

    if (!isValidEmail) {
      Alert.alert('Invalid Email', 'Please enter a valid IIT Ropar email address.');
      return;
    }

    const position = selectedRole;
    let cycle = getCycleNumber(new Date());

    

    setLoading(true);
  
    try {
      let cycle= getCycleNumber(new Date());
      const response1 = await fetchAPI(`${BASE_URL}/placement/selectcycle`, { cycle }, 'POST', false);

      console.log(response1);
     cycle=response1.data[0];
      const credentials = {
        email,
        cycle_id: cycle.cycle_id,
      };
      const response = await fetchAPI(`${BASE_URL}/user/login`, credentials, 'POST', false);
      console.log(response);

      if (response.isUserPresent) {
        navigation1.navigate('Spoc_OTP', { email,cycle });
      } else {
        Alert.alert('User Not Present', 'Please check your email and role.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Student Representative</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          placeholderTextColor="#555"
          onChangeText={(text) => setEmail(text)}
        />

      

        <TouchableOpacity style={styles.smallButton} onPress={handleLogin}>
          <Text style={styles.buttonText}> Login </Text>
        </TouchableOpacity>
      </View>

      {loading && <LoadingScreen />}
    </>
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
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 30,
  },
  input: {
    color: '#fff',
    height: 40,
    width: '80%',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  smallButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    marginBottom: 12,
    color: '#fff',
  },
  picker: {
    width: '80%',
    height: 40,
    marginBottom: 16,
    color: '#fff',
    backgroundColor: '#202020',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2ecc71',
  },
});

export default Spoc_Login;
