import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Input} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import fetchAPI from '../../Tools/FetchAPI';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL} from '../../api';
import LoadingScreen from '../Common/LoadingScreen';

const handleEmailValidation = email => {
  email = email.trim();
  const emailRegex = /@iitrpr\.ac\.in$/;
  return emailRegex.test(email);
};

const handleNameValidation = name => {
  // Trim leading and trailing spaces from the name
  name = name.trim();

  const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
  return nameRegex.test(name);
};

const Super_User_Add_User = ({route}) => {
  const [name, setName] = useState(''); // Remove this line
  const [email, setEmail] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('sde');
  const [isLoading, setIsLoading] = useState(false);
  const email1 = route.params.email;
  const cycle = route.params.cycle;
  const navigation = useNavigation();

  const handleAddUser = async () => {
    try {
      setIsLoading(true);
      // Validation: Check if the email is not empty
      const isValidName = handleNameValidation(name);
      if (!isValidName) {
        Alert.alert('Invalid Name', 'Please enter a valid name.');
        setIsLoading(false);
        return;
      }
      const isValidEmail = handleEmailValidation(email);

      if (!isValidEmail) {
        Alert.alert(
          'Invalid Email',
          'Please enter a valid IIT Ropar email address.',
        );
        setIsLoading(false);
        return;
      }

      let t = {
        name: name,
        email: email,
        position: 'Representative',
        department: selectedDepartment,
        cycle_id: cycle.cycle_id,
      };
      let response = await fetchAPI(
        `${BASE_URL}/superuser/adduser`,
        t,
        'POST',
        false,
      );

      console.log('API Response:', response);

      if (response.result.isUserAlreadyAdded) {
        Alert.alert('Alert', 'User Already exists');
      } else {
        console.log(
          'Adding user with email:',
          email,
          'and Department:',
          selectedDepartment,
        );
          
        try{
        let t = {
          sender_email: email1,
          receiver_email: email,
          message: 'You have been added as a Student Representative.',
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

        // Display success message
        Alert.alert('Success', 'Added successfully');
      }

      // Clear input fields
      setName('');
      setEmail('');
    
      setSelectedDepartment('sde');
    } catch (error) {
      console.error('Error:', error);
      // Handle error if needed
      Alert.alert('Error', 'Failed to add user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name :</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
        placeholder="Enter Name"
        placeholderTextColor="#aaa" // Placeholder color
      />

      <Text style={styles.label}>Email :</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="Enter email"
        keyboardType="email-address"
        placeholderTextColor="#aaa" // Placeholder color
      />

      {/* <Text style={styles.label}>Select Position:</Text>
      <Picker
        selectedValue={selectedPosition}
        onValueChange={itemValue => setSelectedPosition(itemValue)}
        style={styles.picker}
        itemStyle={{color: '#fff'}}>
        <Picker.Item label="HPC" value="hpc" />
        <Picker.Item label="APC" value="apc" />
        <Picker.Item label="DPC" value="dpc" />
        <Picker.Item label="IC" value="ic" />
        <Picker.Item label="DIC" value="dic" />
        <Picker.Item label="Representative" value="representative" />
      </Picker> */}

      <Text style={styles.label}>Select Department :</Text>
      <Picker
        selectedValue={selectedDepartment}
        onValueChange={itemValue => setSelectedDepartment(itemValue)}
        style={styles.picker}
        itemStyle={{color: '#fff'}}>
    
        <Picker.Item label="SDE" value="SDE" />
        <Picker.Item label="Non-Core" value="Non-Core" />
        <Picker.Item label="Electrical" value="Electrical" />
        <Picker.Item label="Mechanical" value="Mechanical" />
        <Picker.Item label="Chemical" value="Chemical" />
        <Picker.Item label="Civil" value="Civil" />
        <Picker.Item label="Metallurgy" value="Metallurgy" />
      </Picker>

      <TouchableOpacity
        style={styles.button}
        onPress={handleAddUser}
        disabled={isLoading}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>

      {isLoading && <LoadingScreen />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#202020', // Background color
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#fff', // Text color
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#fff', // Border color
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    color: '#fff', // Text color
  },
  picker: {
    width: '80%',
    height: 40,
    marginTop: -8,
    marginBottom: 10,
    color: '#fff',
    backgroundColor: '#202020',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2ecc71',
  },
  button: {
    backgroundColor: '#128C7E', // Button color
    padding: 15,
    borderRadius: 20,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Super_User_Add_User;
