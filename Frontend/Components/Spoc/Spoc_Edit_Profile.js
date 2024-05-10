import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import fetchAPI from '../../Tools/FetchAPI';
import CryptoJS from 'react-native-crypto-js';
import { BASE_URL } from '../../api';
import LoadingScreen from '../Common/LoadingScreen'; // Import the LoadingScreen component
const secretKey = 'hiii';

const handleNameValidation = (name) => /^[a-zA-Z\s]+$/.test(name);
const handlePhoneValidation = (phoneno) => /^\d{10}$/.test(phoneno);

const Spoc_Edit_Profile = ({ route, navigation }) => {
  const email = route.params.email;
  const cycle = route.params.cycle;
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(false); // State for managing loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true while fetching data
        let t = { email: email,cycle_id:cycle.cycle_id };
        let response = await fetchAPI(`${BASE_URL}/user/profile`, t, "POST", false);

        console.log(response);
        setUserData(response.userData);
        setName(response.userData.name);
        setPhone(response.userData.phone);

      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // Set loading back to false after fetching data
      }
    };

    fetchData();
  }, [email]);

  const handleSaveChanges = async () => {
    try {
      setLoading(true); // Set loading to true while saving changes

      if (!handleNameValidation(name)) {
        Alert.alert("Alert ","Invalid Name");
        return;
      }

      if (!handlePhoneValidation(phone)) {
        Alert.alert("Alert ","Invalid Phone No.");
        return;
      }

      let t = { email: email, name: name, phone: phone,cycle_id:cycle.cycle_id };
      let response = await fetchAPI(`${BASE_URL}/user/editprofile`, t, "POST", false);

      console.log(response);
      navigation.navigate("Spoc_Profile", { email,cycle });

    } catch (error) {
      console.error('Error saving changes:', error);
    } finally {
      setLoading(false); // Set loading back to false after saving changes
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingScreen /> // Render the loading screen if loading is true
      ) : (
        <View style={styles.formContainer}>
       

          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            placeholderTextColor="#000"
            onChangeText={(text) => setName(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={phone}
            placeholderTextColor="#000"
            onChangeText={(text) => setPhone(text)}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleSaveChanges}
          >
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

export default Spoc_Edit_Profile;
