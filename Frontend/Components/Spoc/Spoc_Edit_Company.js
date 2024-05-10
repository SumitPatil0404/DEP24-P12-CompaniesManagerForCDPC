import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import HR_Component from '../Common/HR_Component';
import {
  encryptJSONToString,
  decryptStringToJSON,
} from '../../Tools/DataSecurity';
import fetchAPI from '../../Tools/FetchAPI';
import {BASE_URL} from '../../api';
import LoadingScreen from '../Common/LoadingScreen';
import Company_Details from '../Common/Company_Details';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

const Spoc_Edit_Company = ({route, navigation}) => {
  const {company, company_id} = route.params;
  const {cycle} = route.params;
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);

  const [editedCompany, setEditedCompany] = useState({
    name: company.name,
    updates: company.updates,
    hrDetails: company.details!=null?decryptStringToJSON(company.details):[],
    companyDetails: company.company_details!=null?decryptStringToJSON(company.company_details):[],
    jaf: company.jaf!=null?decryptStringToJSON(company.jaf):null,
    inf: company.inf!=null?decryptStringToJSON(company.inf):null,
  });

  const addHr = () => {
    setEditedCompany({
      ...editedCompany,
      hrDetails: [
        ...editedCompany.hrDetails,
        {hrName: '', emails: [''], phoneNumbers: [''], linkedinProfile: ''},
      ],
    });
  };

  const handleHrNameChange = (index, text) => {
    const newHrDetails = [...editedCompany.hrDetails];
    newHrDetails[index].hrName = text;
    setEditedCompany({...editedCompany, hrDetails: newHrDetails});
  };

  const handleEmailChange = (hrIndex, emailIndex, text) => {
    const newHrDetails = [...editedCompany.hrDetails];
    newHrDetails[hrIndex].emails[emailIndex] = text;
    setEditedCompany({...editedCompany, hrDetails: newHrDetails});
  };

  const handlePhoneChange = (hrIndex, phoneIndex, text) => {
    const newHrDetails = [...editedCompany.hrDetails];
    newHrDetails[hrIndex].phoneNumbers[phoneIndex] = text;
    setEditedCompany({...editedCompany, hrDetails: newHrDetails});
  };

  const handleLinkedinChange = (index, text) => {
    const newHrDetails = [...editedCompany.hrDetails];
    newHrDetails[index].linkedinProfile = text;
    setEditedCompany({...editedCompany, hrDetails: newHrDetails});
  };

  const handleCompanyChange = text => {
    setEditedCompany({...editedCompany, name: text});
  };

  const handleUpdatesChange = text => {
    setEditedCompany({...editedCompany, updates: text});
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (editedCompany.name.trim() === '') {
      Alert.alert('Alert', 'Please enter a company name');
      setLoading(false);
      return;
    }

    // if (editedCompany.updates.trim() === '') {
    //   Alert.alert('Alert', 'Please enter updates');
    //   setLoading(false);
    //   return;
    // }

    const emptyHRName = editedCompany.hrDetails.find(
      hr => hr.hrName.trim() === '',
    );
    if (emptyHRName) {
      Alert.alert('Alert', 'HR name cannot be empty');
      setLoading(false);
      return;
    }

     let j=encryptJSONToString(editedCompany.jaf)
     let i= encryptJSONToString(editedCompany.inf)
    try {
      setLoading(true);
      

      let t = {
        company_id: company_id,
        name: editedCompany.name,
        details: encryptJSONToString(editedCompany.hrDetails),
        updates: editedCompany.updates,
        company_details: encryptJSONToString(editedCompany.companyDetails),
        cycle_id: cycle.cycle_id,
        jaf: j,
        inf: i,
      };
      let response = await fetchAPI(
        `${BASE_URL}/company/edit`,
        t,
        'POST',
        false,
      );
      console.log(response);
      navigation.goBack();
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeHR = index => {
    const newHrDetails = [...editedCompany.hrDetails];
    newHrDetails.splice(index, 1);
    setEditedCompany({...editedCompany, hrDetails: newHrDetails});
  };

  const removeEmail = (hrIndex, emailIndex) => {
    const newHrs = [...editedCompany.hrDetails];
    newHrs[hrIndex].emails.splice(emailIndex, 1);
    setEditedCompany({...editedCompany, hrDetails: newHrs});
  };

  const removePhoneNumber = (hrIndex, phoneIndex) => {
    const newHrs = [...editedCompany.hrDetails];
    newHrs[hrIndex].phoneNumbers.splice(phoneIndex, 1);
    setEditedCompany({...editedCompany, hrDetails: newHrs});
  };

  const addEmail = hrIndex => {
    const newHrDetails = [...editedCompany.hrDetails];
    newHrDetails[hrIndex].emails.push('');
    setEditedCompany({...editedCompany, hrDetails: newHrDetails});
  };

  const addPhoneNumber = hrIndex => {
    const newHrDetails = [...editedCompany.hrDetails];
    newHrDetails[hrIndex].phoneNumbers.push('');
    setEditedCompany({...editedCompany, hrDetails: newHrDetails});
  };
  const handleCTCChange = text => {
    const newCompanyDetails = {...editedCompany.companyDetails};
    newCompanyDetails.ctc = text;
    setEditedCompany({...editedCompany, companyDetails: newCompanyDetails});
  };
  const handleStipendChange = text => {
    const newCompanyDetails = {...editedCompany.companyDetails};
    newCompanyDetails.stipend = text;
    setEditedCompany({...editedCompany, companyDetails: newCompanyDetails});
  };

  const handleJobLocationChange = text => {
    const newCompanyDetails = {...editedCompany.companyDetails};
    newCompanyDetails.jobLocation = text;
    setEditedCompany({...editedCompany, companyDetails: newCompanyDetails});
  };

  const handleCategoryChange = selectedItems => {
    const newCompanyDetails = {...editedCompany.companyDetails};
    newCompanyDetails.categories = selectedItems;
    setEditedCompany({...editedCompany, companyDetails: newCompanyDetails});
  };

  const handleBatchChange = selectedItems => {
    const newCompanyDetails = {...editedCompany.companyDetails};
    newCompanyDetails.eligibleBatches = selectedItems;

    setEditedCompany({...editedCompany, companyDetails: newCompanyDetails});
  };
  const remove = () => {
    setVisible(false);
    setEditedCompany({
      ...editedCompany,
      companyDetails: {},
    });
  };
  const addDetails = () => {
    setVisible(true);
    setEditedCompany({
      ...editedCompany,
      companyDetails: {
        ctc: '',
        stipend: '',
        jobLocation: '',
        categories: [],
        eligibleBatches: [],
      },
    });
  };

  const handleUploadINF = async () => {
    try {
      setLoading(true);
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      const {uri} = res[0];

      // Read the PDF file and convert it to a buffer
      const pdfBuffer = await RNFS.readFile(uri, 'base64');

      let response = await fetchAPI(
        `${BASE_URL}/file/buffer`,
        {buffer: pdfBuffer},
        'POST',
        false,
      );

      let t = {
        text: response.text,
      };
      //let res=await axios.post('https://plankton-app-tkucz.ondigitalocean.app/acad/dep',{text:text})
      let res1 = await fetchAPI(
        `https://plankton-app-tkucz.ondigitalocean.app/acad/dep`,
        t,
        'POST',
        false,
      );

      //const expandedResult = expandObject(res1.result);

      // Log the expanded result
      console.log(res1);
      //setJsonData(res1.result);
      setEditedCompany({...editedCompany, inf: res1.result});

      setLoading(false);
      //  navigation.navigate('Super_User_View_Pdf', {jsonData: res1.result});

      // console.log(res1)
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An error occurred while processing the PDF file');
    }
  };

  const handleUploadJAF = async () => {
    try {
      setLoading(true);
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      const {uri} = res[0];

      // Read the PDF file and convert it to a buffer
      const pdfBuffer = await RNFS.readFile(uri, 'base64');

      let response = await fetchAPI(
        `${BASE_URL}/file/buffer`,
        {buffer: pdfBuffer},
        'POST',
        false,
      );

      let t = {
        text: response.text,
      };
      //let res=await axios.post('https://plankton-app-tkucz.ondigitalocean.app/acad/dep',{text:text})
      let res1 = await fetchAPI(
        `https://plankton-app-tkucz.ondigitalocean.app/acad/dep`,
        t,
        'POST',
        false,
      );

      //const expandedResult = expandObject(res1.result);

      // Log the expanded result
      console.log(res1);
      //setJsonData(res1.result);
       setEditedCompany({...editedCompany, jaf: res1.result});
      setLoading(false);
      //  navigation.navigate('Super_User_View_Pdf', {jsonData: res1.result});

      // console.log(res1)
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An error occurred while processing the PDF file');
    }
  };

  const handleDeleteCompany = () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to delete this company?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => setLoading(false),
        },
        {
          text: 'Delete Company',
          onPress: async () => {
            setLoading(true);
            try {
              let t = {company_id: company_id, cycle_id: cycle.cycle_id};
              let response = await fetchAPI(
                `${BASE_URL}/company/delete`,
                t,
                'POST',
                false,
              );
              console.log(response);
              navigation.goBack();
            } catch (error) {
              console.error('Error fetching user data:', error);
            } finally {
              setLoading(false);
            }
          },
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <FlatList
          contentContainerStyle={styles.innerContainer}
          data={[{key: 'content'}]}
          renderItem={() => (
            <>
              {/* Company Name */}
              {/* <Text style={styles.title}>Company Name : </Text>
              <TextInput
                style={styles.input}
                placeholder="Company Name"
                value={editedCompany.name}
                onChangeText={handleCompanyChange}
              /> */}

              {/* Updates */}
              {/* <Text style={styles.title}>Updates : </Text>
              <TextInput
                style={styles.input}
                placeholder="Company Updates"
                value={editedCompany.updates}
                onChangeText={handleUpdatesChange}
                multiline
              /> */}

              {/* HR Details */}
              <Text style={styles.title}>HR Details : </Text>
              {editedCompany.hrDetails.map((hr, hrIndex) => (
                <HR_Component
                  key={hrIndex}
                  hr={hr}
                  index={hrIndex}
                  handleHrNameChange={handleHrNameChange}
                  handleEmailChange={handleEmailChange}
                  handlePhoneChange={handlePhoneChange}
                  handleLinkedinChange={handleLinkedinChange}
                  removeHR={() => removeHR(hrIndex)}
                  removeEmail={removeEmail}
                  removePhoneNumber={removePhoneNumber}
                  addEmail={() => addEmail(hrIndex)}
                  addPhoneNumber={() => addPhoneNumber(hrIndex)}
                />
              ))}
              <TouchableOpacity style={styles.addHrButton} onPress={addHr}>
                <Text style={styles.addHrButtonText}>Add HR</Text>
              </TouchableOpacity>

              {/* Render the Company_Details component */}
              <Text style={styles.title}>Company Details :</Text>

              {visible && (
                <Company_Details
                  companydetails={editedCompany.companyDetails}
                  handleCTCChange={handleCTCChange}
                  handleStipendChange={handleStipendChange}
                  handleJobLocationChange={handleJobLocationChange}
                  handleCategoryChange={handleCategoryChange}
                  handleBatchChange={handleBatchChange}
                  remove={remove}
                />
              )}

              {!visible && (
                <TouchableOpacity
                  style={styles.addHrButton}
                  onPress={addDetails}>
                  <Text style={styles.addHrButtonText}>Add Details</Text>
                </TouchableOpacity>
              )}

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  style={[styles.addHrButton, {flex: 1, marginRight: 10, backgroundColor: '#3498db'}]}
                  onPress={handleUploadINF}>
                  <Text style={styles.addHrButtonText}>Upload INF</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.addHrButton, {flex: 1, marginLeft: 10, backgroundColor: '#3498db'}]}
                  onPress={handleUploadJAF}>
                  <Text style={styles.addHrButtonText}>Upload JAF</Text>
                </TouchableOpacity>
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Save Changes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDeleteCompany}>
                <Text style={styles.deleteButtonText}>Delete Company</Text>
              </TouchableOpacity>
            </>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: '#202020',
    height: '100%',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: '#282828',
    marginBottom: 16,
    paddingHorizontal: 10,
    paddingLeft: 15,
    borderRadius: 8,
    color: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#B9B9B9',
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

export default Spoc_Edit_Company;
