import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import fetchAPI from '../../Tools/FetchAPI';
import { BASE_URL } from '../../api';
import LoadingScreen from '../Common/LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Spoc_Profile = ({ route }) => {
  const navigation = useNavigation();
  const { email,cycle } = route.params;
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true); // State variable to control loading screen visibility

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          let t = { email,cycle_id:cycle.cycle_id };
          let response = await fetchAPI(`${BASE_URL}/user/profile`, t, 'POST', false);
  
          if (!response.ok) {
            console.log('Error getting user data');
            return;
          }
  
          // Assuming the response contains user data
          // console.log(response.userData);
          setUserData(response.userData);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false); // Set loading to false when data fetching is complete
        }
      };
  
      fetchData();
    }, [email]) // Include any dependencies here that should trigger a refetch when changed
  );

  const handleLogout = async() => {
    // Remove user data from AsyncStorage on logout
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('user');
    navigation.navigate('Welcome_Page');
  };

  const handleEditProfile = () => {
    navigation.navigate('Spoc_Edit_Profile', { email ,cycle});
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingScreen />
      ) : (
        userData && (
          <View style={styles.card}>
           
            <Image style={styles.avatar} source={require('../../image/ben-sweet-2LowviVHZ-E-unsplash.jpg')} />
    
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Name:</Text>
              <Text style={styles.fieldValue}>{userData.name || 'N/A'}</Text>
            </View>
    
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Position:</Text>
              <Text style={styles.fieldValue}>{userData.position.toUpperCase() || 'N/A'}</Text>
            </View>
    
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Department:</Text>
              <Text style={styles.fieldValue}>{userData.department.toUpperCase() || 'N/A'}</Text>
            </View>
    
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Email:</Text>
              <Text style={styles.fieldValue}>{userData.email}</Text>
            </View>
    
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Phone:</Text>
              <Text style={styles.fieldValue}>{userData.phone || 'N/A'}</Text>
            </View>
    
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
                <Text style={styles.buttonText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#202020',
    // Background color
  },
  card: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'left',
   
  },
  avatar: {
    alignItems: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
   
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db', // Text color
    marginVertical: 10,
    
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
   
  },
  fieldLabel: {
    fontSize: 18,
  
    fontWeight: 'bold',
    color: '#2c3e50', // Text color
    marginRight: 10,
  },
  fieldValue: {
    fontSize: 18,
    color: '#2c3e50', // Text color
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#128C7E',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#e74c3c', // Change to your preferred color for the logout button
  },
});

export default Spoc_Profile;
