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

const Super_User_View_Users = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [expandedUsers, setExpandedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // Set initial sort order to 'asc'
  const navigation = useNavigation();
  const { email, cycle } = route.params;

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );

  const fetchData = async () => {
    try {
      let t = { cycle_id: cycle.cycle_id };
      let response = await fetchAPI(`${BASE_URL}/user/all`, t, 'POST', false);

      if (response.ok) {
        // Sort the users based on the initial sort order
        const sortedUsers = response.data.sort((a, b) => {
          const nameA = (a.name || '').toUpperCase(); // Ensure name is not null
          const nameB = (b.name || '').toUpperCase(); // Ensure name is not null
          if (sortOrder === 'asc') {
            return nameA.localeCompare(nameB);
          } else {
            return nameB.localeCompare(nameA);
          }
        });
        setUsers(sortedUsers);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  const toggleDetails = (user) => {
    if (expandedUsers.includes(user.email)) {
      setExpandedUsers(expandedUsers.filter((id) => id !== user.email));
    } else {
      setExpandedUsers([...expandedUsers, user.email]);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleEditUser = (user_email) => {
    navigation.navigate('Super_User_Edit_User', { email, user_email, cycle });
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    const sortedUsers = [...users].sort((a, b) => {
      const nameA = (a.name || '').toUpperCase(); // Ensure name is not null
      const nameB = (b.name || '').toUpperCase(); // Ensure name is not null
      if (newSortOrder === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
    setUsers(sortedUsers);
  };

  const filteredUsers = users.filter(
    (user) =>
      (user.name || '').toLowerCase().includes(searchQuery.toLowerCase()), // Ensure name is not null
  );

  const handleViewCompanies = (email) => {
    navigation.navigate('Spoc_Assigned_Companies', { email, cycle });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name"
            value={searchQuery}
            placeholderTextColor="#000"
            onChangeText={handleSearch}
          />
          <TouchableOpacity style={styles.sortButton} onPress={handleSort}>
            <Text style={styles.sortButtonText}>
              {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
            </Text>
          </TouchableOpacity>
        </View>
        {/* <UserPDF users={users} /> */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}>
        
      
        {filteredUsers.map((user, index) => (
          <TouchableWithoutFeedback key={index}>
            <View style={styles.userContainer}>
              <View style={styles.userHeader}>
                <Text style={styles.userName}>
                  {user.name != null ? user.name : 'SPOC'}
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.viewButton}
                    onPress={() => toggleDetails(user)}>
                    <Text style={styles.buttonText}>
                      {expandedUsers.includes(user.email) ? 'Hide' : 'View'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => handleEditUser(user.email)}>
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {expandedUsers.includes(user.email) && (
                <>
                  <Text style={styles.label}>
                    Position:{' '}
                    <Text style={styles.userInfo}>
                      {user.position.toUpperCase()}
                    </Text>
                  </Text>
                  <Text style={styles.label}>
                    Department:{' '}
                    <Text style={styles.userInfo}>
                      {user.department.toUpperCase()}
                    </Text>
                  </Text>
                  <Text style={styles.label}>
                    Email: <Text style={styles.userInfo}>{user.email}</Text>
                  </Text>
                  <Text style={styles.label}>
                    Phone:{' '}
                    <Text style={styles.userInfo}>
                      {user.phone || 'N/A'}
                    </Text>
                  </Text>
                  <View style={styles.buttonContainer1}>
                    <TouchableOpacity
                      style={styles.viewCompanyButton}
                      onPress={() => handleViewCompanies(user.email)}>
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
      {/* Display UserPDF component at the bottom */}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#202020',
  },
  scrollView: {
    flex: 1,
    
  },
  contentContainer: {
    paddingBottom: 20,
  },
  pdfContainer: {
    marginTop:10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  userContainer: {
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
  buttonContainer1: {
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#128C7E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
  },
  viewCompanyButton: {
    backgroundColor: '#128C7E',
    borderRadius: 8,
    width: '60%',
    marginTop: 30,
    padding: 10,
  },
  viewButton: {
    backgroundColor: '#657e8c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 18,
    color: '#fff',
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

export default Super_User_View_Users;
