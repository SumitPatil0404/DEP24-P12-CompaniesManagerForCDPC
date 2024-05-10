import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'; // Import Picker
import fetchAPI from '../../Tools/FetchAPI';
import { Picker } from '@react-native-picker/picker';
import { BASE_URL } from '../../api';
import LoadingScreen from '../Common/LoadingScreen';

const Super_User_Edit_User = ({ route, navigation }) => {
  const { email,user_email,cycle } = route.params;
  const [loading, setLoading] = useState(true);
  const [editedUser, setEditedUser] = useState({
    name:'',
    department: '',
  });

  const [selectedName, setSelectedName] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      let t = { email: user_email ,cycle_id:cycle.cycle_id};
      let response = await fetchAPI(`${BASE_URL}/user/profile`, t, "POST", false);
      if (response.ok) {
        const { name, department } = response.userData;
        setEditedUser({ name: name, department: department });
        setSelectedName(name);
        setSelectedDepartment(department);
      } else {
        Alert.alert('Error', 'Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      Alert.alert('Error', 'Failed to fetch user details');
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (text) => {
    setEditedUser({ ...editedUser, name: text });
    setSelectedName(text);
  };

  const handleDepartmentChange = (text) => {
    setEditedUser({ ...editedUser, department: text });
    setSelectedDepartment(text);
  };

  const handleSubmit = async () => {
    setLoading(true);

    // Validation
    if (editedUser.name.trim() === '') {
      Alert.alert('Alert', 'Please enter a name');
      setLoading(false);
      return;
    }

    if (editedUser.department.trim() === '') {
      Alert.alert('Alert', 'Please enter a department');
      setLoading(false);
      return;
    }

    try {
      let t = {
        email: user_email,
        name: editedUser.name,
        position : 'Representative',
        department: editedUser.department,
        cycle_id:cycle.cycle_id
      };
      let response = await fetchAPI(`${BASE_URL}/superuser/edituser`, t, "POST", false);
      console.log(response);
      navigation.goBack();
    } catch (error) {
      console.error('Error editing user:', error);
      Alert.alert('Error', 'Failed to edit user');
    } finally {
      setLoading(false);
    }

    try{
      let t = { sender_email: email, receiver_email: user_email, message: `Your name and department has been changed by the superuser. Now you are 
      ${editedUser.name} of ${editedUser.department} department` };
     
      let response = await fetchAPI(`${BASE_URL}/notification/superuser/user`, t, "POST", false);
     if(response.ok){
      console.log(response);
      console.log('Notification sent successfully');
     }
      else{
        console.log(response);
        console.log('Notification not sent');
      }

    }
    catch (error) {
      console.error('Error sending notification:', error);
      // Alert.alert('Error', 'Failed to send notification');
    }

  };

  const handleDeleteUser = () => {
   
    Alert.alert(
      'Confirm',
      'Are you sure you want to delete this user?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => setLoading(false),
        },
        {
          text: 'Delete User',
          onPress: async () => {
            setLoading(true);
            try {
              let t = { email: user_email ,cycle_id:cycle.cycle_id};
              let response1= await fetchAPI(`${BASE_URL}/user/superuser`, t, 'POST', false);
              response1= response1.data[0].user_id

             t={user_id:response1,cycle_id:cycle.cycle_id}
              let response = await fetchAPI(`${BASE_URL}/superuser/deleteuser`, t, "POST", false);
              console.log(response);
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting user:', error);
              Alert.alert('Error', 'Failed to delete user');
            } finally {
              setLoading(false);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
       

          {/* name Picker */}
          <Text style={styles.label}>Name:</Text>
          <TextInput

            style={styles.input}
            value={selectedName}
            onChangeText={(text) => handleNameChange(text)}
            placeholder="Enter name"
            placeholderTextColor="#aaa" // Placeholder color
          />

          {/* Department Picker */}
          <Text style={styles.label}>Select Department:</Text>
          <Picker
            selectedValue={selectedDepartment}
            onValueChange={(itemValue) => handleDepartmentChange(itemValue)}
            style={styles.picker}
            itemStyle={{ color: '#fff' }}
          >

            <Picker.Item label="SDE" value="SDE" />
            <Picker.Item label="Non-Core" value="Non-Core" />
            <Picker.Item label="Electrical" value="Electrical" />
            <Picker.Item label="Mechanical" value="Mechanical" />
            <Picker.Item label="Chemical" value="Chemical" />
            <Picker.Item label="Civil" value="Civil" />
            <Picker.Item label="Metallurgy" value="Metallurgy" />
          </Picker>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Save Changes</Text>
          </TouchableOpacity>

          {/* Delete Button */}
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteUser}>
            <Text style={styles.deleteButtonText}>Delete User</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#000',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#B9B9B9',
  },
  picker: {
    height: 40,
    width: '100%',
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: '#282828',
    marginBottom: 16,
    borderRadius: 8,
    color: '#fff',
  },
  input: {
    height: 60,
    width: '100%',
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: '#282828',
    marginBottom: 16,
    // paddingHorizontal: 10,
    fontSize: 18,
    padding: 15,
    borderRadius: 8,
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#128C7E',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 36,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default Super_User_Edit_User;
