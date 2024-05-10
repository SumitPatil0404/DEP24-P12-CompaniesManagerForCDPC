import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import fetchAPI from '../../Tools/FetchAPI';
import { BASE_URL } from '../../api';
import LoadingScreen from '../Common/LoadingScreen';

const secretKey = 'hiii';

const handleNameValidation = (name) => /^[a-zA-Z\s]+$/.test(name);
const handlePhoneValidation = (phoneno) => /^\d{10}$/.test(phoneno);

const Super_User_Edit_Profile = ({ route }) => {
  const email = route.params.email;
  const cycle = route.params.cycle;
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let t = { email: email ,cycle_id:cycle.cycle_id};
        let response = await fetchAPI(`${BASE_URL}/superuser/profile`, t, 'POST', false);

        console.log(response);
        setUserData(response.data);
        setName(response.data.name);
        setPhone(response.data.phone);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [email]);

  const handleSaveChanges = async () => {
    try {
      setIsLoading(true);
      if (!handleNameValidation(name)) {
        Alert.alert('Invalid Name');
        setIsLoading(false);
        return;
      }

      if (!handlePhoneValidation(phone)) {
        Alert.alert('Invalid Phone No.');
        setIsLoading(false);
        return;
      }

      let t = { email: email, name: name, phone: phone ,cycle_id : cycle.cycle_id};
      let response = await fetchAPI(`${BASE_URL}/superuser/editprofile`, t, 'POST', false);

      console.log(response);
      navigation.navigate('Super_User_Profile', { email });
    } catch (error) {
      console.error('Error saving changes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <View style={styles.formContainer}>
        

          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            placeholderTextColor="#555"
            onChangeText={(text) => setName(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={phone}
            placeholderTextColor="#555"
            onChangeText={(text) => setPhone(text)}
          />

          <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#202020', // Background color
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20, // Increased border radius for a more rounded look
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black', // Text color
    marginBottom: 20,
  },
  input: {
    color: 'black',
    height: 40,
    borderColor: '#2ecc71', // Border color
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#128C7E', // Button color
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Super_User_Edit_Profile;
