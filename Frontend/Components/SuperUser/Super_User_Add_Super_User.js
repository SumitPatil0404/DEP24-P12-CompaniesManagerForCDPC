import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import fetchAPI from '../../Tools/FetchAPI';
import {BASE_URL} from '../../api';

import LoadingScreen from '../Common/LoadingScreen';

const handleEmailValidation = email => {
  email = email.trim();
  const emailRegex = /@iitrpr\.ac\.in$/;
  return emailRegex.test(email);
};

const handleNameValidation = name => {
  name = name.trim();

  const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
  return nameRegex.test(name);
};

const Super_User_Add_Super_User = ({route}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('Select');
  const [selectedDepartment, setSelectedDepartment] = useState('Select');
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const email1 = route.params.email;
  const cycle = route.params.cycle;
  const addSuperuser = async () => {
    try {
      setIsLoading(true); // Set loading state to true

      // Validation: Check if the email is not empty
      const isValidEmail = handleEmailValidation(email);
      const isValidName = handleNameValidation(name);

      if (!isValidName) {
        Alert.alert('Alert', 'Invalid Name.');
        setIsLoading(false); // Set loading state to false
        return;
      }
      if (!isValidEmail) {
        Alert.alert(
          'Invalid Email',
          'Please enter a valid IIT Ropar email address.',
        );
        setIsLoading(false); // Set loading state to false
        return;
      }

      if (position === 'Select') {
        Alert.alert('Alert', 'Please select a position.');
        setIsLoading(false); // Set loading state to false
        return;
      }
      if
      (selectedDepartment === 'Select') {
        Alert.alert('Alert', 'Please select a department.');
        setIsLoading(false); // Set loading state to false
        return;
      }


      let t = {
        name: name,
        email: email,
        position: position,
        department: selectedDepartment,
        cycle_id: cycle.cycle_id,
      };
      let response = await fetchAPI(
        `${BASE_URL}/superuser/addsuperuser`,
        t,
        'POST',
        false,
      );

      console.log('API Response:', response);
      if (response.ok === false) {
        Alert.alert('Error', 'Failed to add user. Please try again.');
      } else {
        if (response.result.isUserAdded) {
          try {
            let t = {
              sender_email: email1,
              receiver_email: email,
              message: 'You have been added as a Superuser',
            };
            let response = await fetchAPI(
              `${BASE_URL}/notification/superuser/user`,
              t,
              'POST',
              false,
            );
            console.log(response);
            if (response.ok) {
              console.log('Notification sent successfully');
            } else {
              console.log('Notification not sent');
            }
          } catch (error) {
            console.error('Error sending notification:', error);
            // Alert.alert('Error', 'Failed to send notification');
          }

          Alert.alert('Success', 'Super User added successfully');

          setEmail('');
          setName('');
          setPosition('Select');
          setSelectedDepartment('Select');
        } else if (response.result.isUserAlreadyAdded) {
          Alert.alert('Alert', 'Super User Email already exists.');
          // setEmail('');
         
        } else if (response.result.isDuplicatePositionDepartment) {
          Alert.alert(
            'Alert',
            'Super User with same position and department already exists.',
          );
          setPosition('Select');
          setSelectedDepartment('Select');

        }
      }
    } catch (error) {
      console.error('Error adding super user:', error);
      Alert.alert('Error', 'Failed to add super user. Please try again.');
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
        placeholder="Enter name"
        placeholderTextColor="#aaa" // Placeholder color
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="Enter email"
        keyboardType="email-address"
        placeholderTextColor="#aaa" // Placeholder color
      />

      <Text style={styles.label}>Select Position:</Text>
      <Picker
        selectedValue={position}
        onValueChange={itemValue => setPosition(itemValue)}
        style={styles.picker}
        itemStyle={{color: '#fff'}}>
        <Picker.Item label="Select" value="Select" />  
        <Picker.Item label="Placement Officer" value="Placement Officer" />
        <Picker.Item label="Chairperson" value="Chairperson" />
        <Picker.Item label="Vice-Chairperson" value="Vice-Chairperson" />
        <Picker.Item label="HPC" value="HPC" />
        <Picker.Item label="APC" value="APC" />
        <Picker.Item label="DPC" value="DPC" />
        <Picker.Item label="IC" value="IC" />
        <Picker.Item label="DIC" value="DIC" />
      </Picker>

      <Text style={styles.label}>Select Department:</Text>
      {[
        'Placement Officer',
        'Chairperson',
        'Vice-Chairperson',
        'HPC',
        'IC',
      ].includes(position) ? (
        <Picker
          selectedValue={selectedDepartment}
          onValueChange={itemValue => setSelectedDepartment(itemValue)}
          style={styles.picker}
          itemStyle={{color: '#fff'}}>
          <Picker.Item label="Select" value="Select" />
          <Picker.Item label="ALL" value="ALL" />
        </Picker>
      ) : (
        <Picker
          selectedValue={selectedDepartment}
          onValueChange={itemValue => setSelectedDepartment(itemValue)}
          style={styles.picker}
          itemStyle={{color: '#fff'}}>
             
          <Picker.Item label="Select" value="Select" />
          <Picker.Item label="SDE" value="SDE" />
          <Picker.Item label="Non-Core" value="Non-Core" />
          <Picker.Item label="Electrical" value="Electrical" />
          <Picker.Item label="Mechanical" value="Mechanical" />
          <Picker.Item label="Chemical" value="Chemical" />
          <Picker.Item label="Civil" value="Civil" />
          <Picker.Item label="Metallurgy" value="Metallurgy" />
        </Picker>
      )}

      <TouchableOpacity style={styles.button} onPress={addSuperuser}>
        <Text style={styles.buttonText}>Add Super User</Text>
      </TouchableOpacity>

      {isLoading && <LoadingScreen />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#202020', // Background color
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // Bright green text color
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#fff', // Text color
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#fff', // Border color
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    color: '#fff', // Text color
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
  button: {
    backgroundColor: '#128C7E', // Button color
    padding: 15,
    borderRadius: 10,
    width: '70%',

    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Super_User_Add_Super_User;
