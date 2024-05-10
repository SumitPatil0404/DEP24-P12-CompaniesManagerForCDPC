import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Alert, // Import Alert component
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import fetchAPI from '../../Tools/FetchAPI';
import {BASE_URL} from '../../api';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const Super_User_Placement_Cycle = ({route}) => {
  const navigation = useNavigation();
  const [cycles, setCycles] = useState([]);
  const [selectedCycle, setSelectedCycle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const {email,cycle} = route.params;
  const [user, setUser] = useState('');
  const [superUser, setSuperUser] = useState('');

  useEffect(() => {
    fetchCycleData();
  }, []);

  useEffect(() => {
    fetchuser();
    fetchSuperUserName();
  }, []);

  const fetchSuperUserName = async () => {
    try {
      let response1 = await fetchAPI(
        `${BASE_URL}/placement/selectcycle`,
        {cycle: getCycleNumber(new Date())},
        'POST',
        false,
      );
      let cycle = response1.data[0];
      let k=1;
      let t = {email: email, cycle_id: cycle.cycle_id,user_id:k};

      let user = await AsyncStorage.getItem('user');
      let response;
      if (user === 'superuser') {
        response = await fetchAPI(
          `${BASE_URL}/superuser/profile`,
          t,
          'POST',
          false,
        );
        if (!response.ok) {
          console.log('Error getting user data');
          return;
        }
        setSuperUser(response.data);
        console.log(response.data);
       
      }
      else{
        response = await fetchAPI(
          `${BASE_URL}/user/profile`,
          t,
          'POST',
          false,
        );
        if (!response.ok) {
          console.log('Error getting user data');
          return;
        }
        setSuperUser(response.userData);
        //console.log(response.data);
      }

     
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchuser = async () => {
    const user = await AsyncStorage.getItem('user');
    setUser(user);
  };

  const fetchCycleData = async () => {
    try {
      let response = await fetchAPI(
        `${BASE_URL}/placement/cycles`,
        {},
        'POST',
        false,
      );
      if (!response.ok) {
        console.log('Error getting cycle data');
        return;
      }
      setCycles(response.data);
      setIsLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCreateCycle = async () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to create a new cycle?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Create',
          onPress: async () => {
            try {
              let mostRecentCycle = cycles.reduce((prev, current) =>
                prev.cycle > current.cycle ? prev : current,
              );
              let mostRecentYear = mostRecentCycle.cycle;
              let mostRecentCycleId = mostRecentCycle.cycle_id;

              let response = await fetchAPI(
                `${BASE_URL}/placement/createcycle`,
                {
                  cycle: mostRecentYear + 1,
                },
                'POST',
                false,
              );

              if (!response.ok) {
                console.log('Error creating cycle');
                return;
              }
                
             
                let response2 = await fetchAPI(
                  `${BASE_URL}/placement/cycles`,
                  {},
                  'POST',
                  false,
                );
                if (!response2.ok) {
                  console.log('Error getting cycle data');
                  return;
                }
                setCycles(response2.data);
                setIsLoading(false);
                console.log(response2.data);
              

              mostRecentCycle = response2.data.reduce((prev, current) =>
                prev.cycle > current.cycle ? prev : current,
              );
              mostRecentYear = mostRecentCycle.cycle;
              mostRecentCycleId = mostRecentCycle.cycle_id;
              console.log(mostRecentCycleId+ " "+mostRecentYear+"dfdf");
              let t = {
                cycle_id: mostRecentCycleId,
                email: superUser.email,
                name: superUser.name,
                position: superUser.position,
                department: superUser.department,
                phone: superUser.phone,
              };
              let response1 = await fetchAPI(
                `${BASE_URL}/superuser/addsuperuser`,
                t,
                'POST',
                false,
              );
              navigation.goBack();
            
            } catch (error) {
              console.error('Error creating cycle:', error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleConfirm = async () => {
    if (selectedCycle !== '') {
      Alert.alert('Alert', 'Are you sure you want to select this cycle?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {
            let cycle = selectedCycle;
            // let cycle1=getCycleNumber(new Date());
            let response1 = await fetchAPI(
              `${BASE_URL}/placement/selectcycle`,
              {cycle: cycle},
              'POST',
              false,
            );
            // console.log(response1.data[0]);
            cycle = response1.data[0];
            console.log(cycle);
            if (user === 'superuser') {
              navigation.navigate('Super_User_Home_Page', {email, cycle});
            } else {
              navigation.navigate('Spoc_Home_Page', {email, cycle});
            }
          },
        },
      ]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Select or Create Placement Cycle</Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCycle}
            onValueChange={itemValue => setSelectedCycle(itemValue)}
            style={styles.picker}>
            <Picker.Item label="Select Cycle" value="" />
            {cycles.map(cycle => (
              <Picker.Item
                key={cycle.cycle_id}
                label={`${cycle.cycle} - ${cycle.cycle + 1}`}
                value={cycle.cycle}
              />
            ))}
          </Picker>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
            disabled={selectedCycle === ''}>
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>

        {superUser.position === 'Placement Officer' && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleCreateCycle}>
              <Text style={styles.buttonText}>Create New Cycle</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#202020',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    backgroundColor: '#657e8c',
    padding: 15,
    borderRadius: 10,
    width: '70%',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: '#128C7E',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  confirmButtonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  picker: {
    flex: 1,
    height: 50,
    color: '#202020 ',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2ecc71',
    paddingHorizontal: 10,
  },
});

export default Super_User_Placement_Cycle;
