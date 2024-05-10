import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import HR_Component from '../Common/HR_Component';
import {encryptJSONToString} from '../../Tools/DataSecurity';
import fetchAPI from '../../Tools/FetchAPI';
import {BASE_URL} from '../../api';
import LoadingScreen from '../Common/LoadingScreen';
import Company_Details from '../Common/Company_Details'; // Importing the Company_Details component

const Spoc_Add_Companies = ({route}) => {
  const [companyName, setCompanyName] = useState('');
  const [updates, setUpdates] = useState('');
  const [hrs, setHrs] = useState([]);
  const [companydetails, setCompanyDetails] = useState({});
  const {email,cycle} = route.params;
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const addHr = () => {
    setHrs([
      ...hrs,
      {hrName: '', emails: [''], phoneNumbers: [''], linkedinProfile: ''},
    ]);
  };

  const addDetails = () => {
    setVisible(true);
    setCompanyDetails({
      ctc: '',
      stipend: '',
      jobLocation: '',
      categories: [],
      eligibleBatches: [],
    });
  };

  const handleHrNameChange = (index, text) => {
    const newHrs = [...hrs];
    newHrs[index].hrName = text;
    setHrs(newHrs);
  };

  const handleEmailChange = (hrIndex, emailIndex, text) => {
    const newHrs = [...hrs];
    newHrs[hrIndex].emails[emailIndex] = text;
    setHrs(newHrs);
  };

  const addEmail = hrIndex => {
    const newHrs = [...hrs];
    newHrs[hrIndex].emails.push('');
    setHrs(newHrs);
  };

  const handleUpdatesChange = text => {
    setUpdates(text);
  };

  const handlePhoneChange = (hrIndex, phoneIndex, text) => {
    const newHrs = [...hrs];
    newHrs[hrIndex].phoneNumbers[phoneIndex] = text;
    setHrs(newHrs);
  };

  const addPhoneNumber = hrIndex => {
    const newHrs = [...hrs];
    newHrs[hrIndex].phoneNumbers.push('');
    setHrs(newHrs);
  };

  const handleLinkedinChange = (index, text) => {
    const newHrs = [...hrs];
    newHrs[index].linkedinProfile = text;
    setHrs(newHrs);
  };

  const handleSubmit = async () => {
    // Validation for empty fields
    if (companyName.trim() === '') {
      Alert.alert('Alert', 'Please enter a company name');
      return;
    }

    if (hrs.length !== 0 && hrs.some(hr => hr.hrName.trim() === '')) {
      Alert.alert('Alert', 'Please enter HR details');
      return;
    }

    // if (updates.trim() === '') {
    //   Alert.alert('Alert', 'Please enter updates');
    //   return;
    // }

    setLoading(true);
    console.log('Company Name:', companyName);
    console.log('HRs:', hrs);

    const hrsjson = encryptJSONToString(hrs);
    console.log('Encrypted HRs:', hrsjson);
    console.log('Company Details:', companydetails);
    const companydetailsjson = encryptJSONToString(companydetails);
    console.log('Encrypted Company Details:', companydetailsjson);
    let t = {
      name: companyName,
      details: hrsjson,
      updates: updates,
      company_details: companydetailsjson,
      cycle_id: cycle.cycle_id,
    };
    try {
      let response = await fetchAPI(
        `${BASE_URL}/user/addcompany`,
        t,
        'POST',
        false,
      );

      console.log(response);
      if (response.ok) {
        Alert.alert('Success', response.message);

        try {
          let k = 'superuser@iitrpr.ac.in';
          let t = {
            sender_email: email,
            receiver_email: k,
            message: `Company ${companyName} has been added by ${email}`,
          };
          let response = await fetchAPI(
            `${BASE_URL}/notification/user/superuser`,
            t,
            'POST',
            false,
          );
          console.log(response);
          if (response.ok) {
            console.log('Notification sent to superuser');
          } else {
            console.log('Error sending notification to superuser');
          }
        } catch (error) {
          console.error('API Error:', error);
        }

        setCompanyName('');
        setHrs([]);
        setUpdates('');
        setCompanyDetails({});
        setVisible(false);
      } else {
        Alert.alert('Error', response.message);
      }
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Error', 'Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  const removeHR = index => {
    const newHrs = [...hrs];
    newHrs.splice(index, 1);
    setHrs(newHrs);
  };

  const removeEmail = (hrIndex, emailIndex) => {
    const newHrs = [...hrs];
    newHrs[hrIndex].emails.splice(emailIndex, 1);
    setHrs(newHrs);
  };

  const removePhoneNumber = (hrIndex, phoneIndex) => {
    const newHrs = [...hrs];
    newHrs[hrIndex].phoneNumbers.splice(phoneIndex, 1);
    setHrs(newHrs);
  };

  const handleCTCChange = text => {
    // Update CTC value
    setCompanyDetails(prevCompany => ({
      ...prevCompany,
      ctc: text,
    }));
  };

  // Function to handle changes in Stipend
  const handleStipendChange = text => {
    // Update Stipend value
    setCompanyDetails(prevCompany => ({
      ...prevCompany,
      stipend: text,
    }));
  };

  // Function to handle changes in Job Location
  const handleJobLocationChange = text => {
    // Update Job Location value
    setCompanyDetails(prevCompany => ({
      ...prevCompany,
      jobLocation: text,
    }));
  };

  // Function to handle changes in Category
  const handleCategoryChange = selectedItems => {
    setCompanyDetails(prevCompany => ({
      ...prevCompany,
      categories: selectedItems,
    }));
  };
  const handleBatchChange = selectedItems => {
    // Update selected batches
    setCompanyDetails(prevCompany => ({
      ...prevCompany,
      eligibleBatches: selectedItems,
    }));
    console.log('Updated categories:', companydetails);
  };

  const remove = () => {
    setVisible(false);
    setCompanyDetails({});
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.innerContainer}
      data={[{key: 'content'}]}
      renderItem={() => (
        <>
          <Text style={styles.title}>Company Name:</Text>
          {/* Company Name input */}
          <TextInput
            style={styles.input}
            placeholderTextColor="#B9B9B9"
            placeholder="Company Name"
            value={companyName}
            onChangeText={text => setCompanyName(text)}
          />

          <Text style={styles.title}>HR Details:</Text>
          {hrs.map((hr, hrIndex) => (
            <HR_Component
              key={hrIndex}
              hr={hr}
              index={hrIndex}
              handleHrNameChange={handleHrNameChange}
              handleEmailChange={handleEmailChange}
              addEmail={addEmail}
              handlePhoneChange={handlePhoneChange}
              addPhoneNumber={addPhoneNumber}
              handleLinkedinChange={handleLinkedinChange}
              removeHR={removeHR}
              removeEmail={removeEmail}
              removePhoneNumber={removePhoneNumber}
            />
          ))}

          {/* Add HR button */}
          <TouchableOpacity style={styles.addHrButton} onPress={addHr}>
            <Text style={styles.addHrButtonText}>Add HR</Text>
          </TouchableOpacity>

          {/* Render the Company_Details component */}
          <Text style={styles.title}>Company Details :</Text>

          {visible && (
            <Company_Details
              companydetails={companydetails} // Pass any necessary props to Company_Details component
              handleCTCChange={handleCTCChange}
              handleStipendChange={handleStipendChange}
              handleJobLocationChange={handleJobLocationChange}
              handleCategoryChange={handleCategoryChange}
              handleBatchChange={handleBatchChange}
              remove={remove}
            />
          )}

          {!visible && (
            <TouchableOpacity style={styles.addHrButton} onPress={addDetails}>
              <Text style={styles.addHrButtonText}>Add Details</Text>
            </TouchableOpacity>
          )}

          {/* Updates input */}
          {/* <Text style={styles.title}>Updates:</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholderTextColor="#B9B9B9"
            placeholder="Updates"
            multiline
            numberOfLines={4}
            value={updates}
            onChangeText={handleUpdatesChange}
          /> */}

          {/* Submit button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Add Company</Text>
          </TouchableOpacity>

          {/* Loading screen */}
          {loading && <LoadingScreen />}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  innerContainer: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#B9B9B9',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: '#B9B9B9',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  addHrButton: {
    backgroundColor: '#657e8c',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  addHrButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#128C7E',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Spoc_Add_Companies;
