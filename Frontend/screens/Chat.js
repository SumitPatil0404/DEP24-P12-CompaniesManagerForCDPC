import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { BASE_URL } from '../api';
import fetchAPI from '../Tools/FetchAPI';
import { Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from '../Components/Common/LoadingScreen';

const Chat = ({ route }) => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const { email, cycle } = route.params;
  const [sender, setSender] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);
  

  // Fetch users from backend when component mounts
  useEffect(() => {
    const fetchData = async () => {
      await fetchSender(); // Wait for sender to be fetched
      await fetchUsers(); // Then fetch users
    };

    fetchData();
  }, []);

  const fetchSender = async () => {
    try {
      setLoading(true);
      let t = { email: email, cycle_id: cycle.cycle_id };
      const response = await fetchAPI(`${BASE_URL}/user/superuser`, t, 'POST', false);
      setSender(response.data[0]);
    } catch (error) {
      console.error('Error fetching users:', error);
    }

    finally {
      setLoading(false);
    }
  }

  // Function to fetch users from backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      let t = { cycle_id: cycle.cycle_id };
      const response = await fetchAPI(`${BASE_URL}/user/superuser/all`, t, 'POST', false);
      const filteredUsers = response.data.filter(user => user.email !== email);
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }



    finally {
      setLoading(false);
    }
  };

  // Function to handle clicking on a user
  const handleUserClick = (user) => {
    // Navigate to chat screen with selected user
    navigation.navigate('ChatScreen', { sender, user });
  };

  // Filter and sort users based on search query and sort order
  const filteredAndSortedUsers = users
    .filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });

  // Render item for user list
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleUserClick(item)}>
      <View style={styles.userItem}>
        <Image source={require('../image/user1.png')} style={styles.icon} />
        <Text style={styles.userName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  if(loading)
  {
    return <LoadingScreen />
  }
  return (
    <View style={styles.container}>
      {/* Search input field */}
      <View style={styles.sortContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name"
        placeholderTextColor="#fff"
        value={searchQuery}
        onChangeText={setSearchQuery} // Update the search query state
      />

      {/* Sort button */}
      <TouchableOpacity
        style={styles.sortButton}
        onPress={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
        <Text style={styles.sortButtonText}>
          {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
        </Text>
      </TouchableOpacity>
      </View>

      {/* Flatlist of users */}
      <FlatList
        data={filteredAndSortedUsers}
        renderItem={renderItem}
        keyExtractor={(item) => item.user_id} // Assuming each user has a unique ID
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#404040',
  },
  icon: {
    width: 45,
    height: 45,
    marginRight: 15,
  },
  userName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  searchInput: {
    backgroundColor: '#404040',
    color: '#fff',
    marginRight: 10,
    borderRadius: 8,
    marginLeft: 10,
    padding: 10,
    flex: 0.9,
   
    fontSize: 16, // Take 90% of the available width
  },
  sortContainer: {
    flexDirection: 'row', // Adjusted to row direction
    alignItems: 'center', // Center items vertically
    justifyContent: 'flex', // Align items to the right
    marginBottom: 20,

    // Take 10% of the available width
  },
  sortButton: {
    backgroundColor: '#3498db',
    padding: 12,

    borderRadius: 8,
    flex: 0.1,
  },
  sortButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Chat;
