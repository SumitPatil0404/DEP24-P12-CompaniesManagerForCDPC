import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import fetchAPI from '../../Tools/FetchAPI';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { BASE_URL } from '../../api';
import LoadingScreen from '../Common/LoadingScreen'; // Import your loading screen component here
import UserPDF from '../Spoc/UserPDF';
const Super_User_View_Super_Users = ({route}) => {
  const [loading, setLoading] = useState(true);
  const [superUsers, setSuperUsers] = useState([]);
  const [expandedSuperUsers, setExpandedSuperUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // Set initial sort order to 'asc'
  const navigation = useNavigation();
  const {email,cycle} = route.params;

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    try {
      let t={cycle_id:cycle.cycle_id}
      let response = await fetchAPI(`${BASE_URL}/superuser/all`, t, 'POST', false); // Update API endpoint for super users

      if (response.ok) {
        // Sort the super users based on the initial sort order
        const sortedSuperUsers = response.data.sort((a, b) => {
          const nameA = (a.name || '').toUpperCase(); // Ensure name is not null
          const nameB = (b.name || '').toUpperCase(); // Ensure name is not null
          if (sortOrder === 'asc') {
            return nameA.localeCompare(nameB);
          } else {
            return nameB.localeCompare(nameA);
          }
        });
        setSuperUsers(sortedSuperUsers);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching super user data:', error);
      setLoading(false);
    }
  };

  const toggleDetails = superUser => {
    if (expandedSuperUsers.includes(superUser.email)) {
      setExpandedSuperUsers(expandedSuperUsers.filter(id => id !== superUser.email));
    } else {
      setExpandedSuperUsers([...expandedSuperUsers, superUser.email]);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  

  const handleEditSuperUser = (user_email) => {
    navigation.navigate('Super_User_Edit_Super_User', {email,user_email,cycle});
  };
   
  const handleViewCompanies = email => {
    navigation.navigate('Spoc_Assigned_Companies', {email,cycle});
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    const sortedSuperUsers = [...superUsers].sort((a, b) => {
      const nameA = (a.name || '').toUpperCase(); // Ensure name is not null
      const nameB = (b.name || '').toUpperCase(); // Ensure name is not null
      if (newSortOrder === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
    setSuperUsers(sortedSuperUsers);
  };

  const filteredSuperUsers = superUsers.filter(superUser =>
    (superUser.name || '').toLowerCase().includes(searchQuery.toLowerCase()) // Ensure name is not null
  );

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
    
    <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name"
          placeholderTextColor="#000"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity
          style={styles.sortButton}
          onPress={handleSort}>
          <Text style={styles.sortButtonText}>{sortOrder === 'asc' ? 'A-Z' : 'Z-A'}</Text>
        </TouchableOpacity>
      </View>
      {/* <UserPDF users={superUsers} /> */}
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {filteredSuperUsers.map((superUser, index) => (
        <TouchableWithoutFeedback
          key={index}
         >
          <View style={styles.superUserContainer}>
            <View style={styles.userHeader}>
              <Text style={styles.superUserName}>{superUser.name != null ? superUser.name : 'Super User'}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => toggleDetails(superUser)}>
                  <Text style={styles.buttonText}>
                    {expandedSuperUsers.includes(superUser.email) ? 'Hide' : 'View'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEditSuperUser(superUser.email)}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
             
              </View>
            </View>
            {expandedSuperUsers.includes(superUser.email) && (
              <>
                <Text style={styles.label}>
                  Position: <Text style={styles.userInfo}>{superUser.position.toUpperCase()}</Text>
                </Text>
                <Text style={styles.label}>
                  Department: <Text style={styles.userInfo}>{superUser.department ===null ? "Null" : superUser.department.toUpperCase()}</Text>
                </Text>
                <Text style={styles.label}>
                  Email: <Text style={styles.userInfo}>{superUser.email}</Text>
                </Text>
                <Text style={styles.label}>
                  Phone: <Text style={styles.userInfo}>{superUser.phone || ' N/A'}</Text>
                </Text>
                <View style={styles.buttonContainer1}>
                  <TouchableOpacity
                    style={styles.viewCompanyButton}
                    onPress={() => handleViewCompanies(superUser.email)}>
                    <Text style={styles.buttonText}>
                      View Assigned Companies
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </TouchableWithoutFeedback>
      ))}
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#202020',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  buttonContainer1: {
  
    alignItems: 'center',
  },
  viewCompanyButton: {
    backgroundColor: '#128C7E',
   
    borderRadius: 8,
    width: '60%',
    
   
    marginTop: 30,
    padding:10,
   
  },
  superUserContainer: {
    flexGrow: 1,
    marginBottom: 10,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    elevation: 3,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#128C7E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
  },
  viewButton: {
    backgroundColor: '#657e8c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  userInfo: {
    fontSize: 18,
    color: '#b8d8d8',
    marginBottom: 8,
  },
  label: {
    color: '#3498db',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  superUserName: {
    fontSize: 18,
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 0.9,
    backgroundColor: '#fff',
    marginRight: 10,
    borderRadius: 8,
    padding: 10,
    color: '#000',
    fontSize: 16,
  },
  sortButton: {
    flex: 0.1,
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Super_User_View_Super_Users;
