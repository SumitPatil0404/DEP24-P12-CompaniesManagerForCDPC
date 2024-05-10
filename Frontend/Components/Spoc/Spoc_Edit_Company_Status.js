import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import fetchAPI from '../../Tools/FetchAPI';

import { BASE_URL } from '../../api';
import LoadingScreen from '../Common/LoadingScreen'; // Import the LoadingScreen component
import { Picker } from '@react-native-picker/picker';

const secretKey = 'hiii';

const Spoc_Edit_Company_Status = ({ route, navigation }) => {
  const company = route.params.company;
  const cycle = route.params.cycle;
  const [selectedStatus, setSelectedStatus] = useState(company.status);
  const [updates, setUpdates] = useState(company.updates);
  const [loading, setLoading] = useState(false); // State for managing loading

  const handleSaveChanges = async () => {
    try {
      setLoading(true); // Set loading to true while saving changes

      let requestBody = { company_id: company.company_id, status: selectedStatus, updates: updates, cycle_id: cycle.cycle_id};
      let response = await fetchAPI(`${BASE_URL}/company/editstatus`, requestBody, "POST", false);

      console.log(response);
      navigation.goBack();

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
          {/* <Text style={styles.title}>Edit Company Status</Text> */}
          <Picker
            selectedValue={selectedStatus}
            onValueChange={(itemValue, itemIndex) => setSelectedStatus(itemValue)}
            style={styles.picker}
            itemStyle={{ color: '#fff' }}>
            <Picker.Item label="Pending" value="Pending" />
            <Picker.Item label="Interested" value="Interested" />
            <Picker.Item label="Confirmed" value="Confirmed" />
            <Picker.Item label="On Hold" value="On Hold" />
            <Picker.Item label="Scheduled" value="Scheduled" />
            <Picker.Item label="Completed" value="Completed" />
            <Picker.Item label="Rejected" value="Rejected" />
          </Picker>
          {/* <TextInput
            style={styles.input}
            placeholderTextColor="#aaa" // Placeholder color
            placeholder="Updates"
         
            value={updates}
            onChangeText={(text) => setUpdates(text)}
          /> */}
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
    backgroundColor: '#202020', // Updated background color
    // borderRadius: 20, // Increased border radius for a more rounded look
    padding: 20,
    
   
  
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Updated text color
    marginBottom: 20,
  },
  input: {
    color: '#fff', // Updated text color
    height: 60,
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#333', // Input background color
    borderRadius: 8,
    
  },
  picker: {
    color: '#fff', // Updated text color
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#333', // Picker background color
    borderRadius: 8,
    borderColor: '#fff', // Picker border color
  },
  button: {
    backgroundColor: '#128C7E', // Button color
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Spoc_Edit_Company_Status;
