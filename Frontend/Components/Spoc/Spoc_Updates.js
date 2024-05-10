import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { BASE_URL } from '../../api';
import fetchAPI from '../../Tools/FetchAPI';
import LoadingScreen from '../Common/LoadingScreen';

const Spoc_Updates = ({ navigation, route }) => {
  const [updates, setUpdates] = useState([]);
  const [newUpdateText, setNewUpdateText] = useState('');
  const [user, setUser] = useState();
  const { company_id, company_name, cycle, email } = route.params;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading  (true);
    fetchUpdates();
    
    setLoading(false);
  }, []);
  
  useEffect(() => {
    
    fetchUser() ;
    
    
  }, []);

  const fetchUser = async () => {
    try {
      setLoading(true);
      let response = await fetchAPI(
        `${BASE_URL}/company/user`,
        {
          email: email,
          cycle_id: cycle.cycle_id
        },
        'POST',
        false,
      );
      if (!response.ok) {
        console.log('Error getting user data');
        return;
      }
      setUser(response.data[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    finally {
      setLoading(false);
    }

  };

  const fetchUpdates = async () => {
    try {
      // setLoading(true);
      let t = {
        company_id: company_id,
        cycle_id: cycle.cycle_id
      }
      let response = await fetchAPI(
        `${BASE_URL}/company/updates`,
        t,
        'POST',
        false,
      );
      console.log(response.data);
      setUpdates(response.data);
    } catch (error) {
      console.error('Error fetching updates:', error);
    }
    finally
    {
      // setLoading(false);
    }
  };

  const handleAddUpdate = async () => {
    try {
      // setLoading(true);
      if (!newUpdateText) {
        Alert.alert('Please enter an update');
        return;
      }
      let t = {
        company_id: company_id,
        cycle_id: cycle.cycle_id,
        text: newUpdateText,
        user_id: user.user_id
      }

      let response = await fetchAPI(
        `${BASE_URL}/company/addupdate`,
        t,
        'POST',
        false,
      );
      if (!response.ok) {
        console.log('Error adding update');
        return;
      }
      await fetchUpdates();

      setNewUpdateText('');
    } catch (error) {
      console.error('Error adding update:', error);
    }
    finally {
      // setLoading(false);
    }
  };

  const renderItem = ({ item, index }) => {
    console.log(item);
    const isMyUpdate = (item && item.user_id) === (user && user.user_id);
    const backgroundColor = isMyUpdate ? '#137570' : '#2c3e50';
    const creationDate = new Date(item.created_at);
    
    const formatTimeText = date => {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    const formatDateText = date => {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };

    const showDate = index === 0 || new Date(item.created_at).toDateString() !== new Date(updates[index - 1].created_at).toDateString();

    return (
      <View key={index}>
      {showDate && (
        <Text style={styles.dateText}>{formatDateText(creationDate)}</Text>
      )}
      <View style={[styles.updateContainer, { alignSelf: isMyUpdate ? 'flex-end' : 'flex-start' }]}>
        <View style={[styles.updateItem, { backgroundColor }]}>
          <Text style={styles.updateUserName}>{isMyUpdate ? 'You' : item.user_name}</Text>
          <Text style={styles.updateText}>{item.text}</Text>
          <Text style={styles.updateTime}>{formatTimeText(creationDate)}</Text>
        </View>
      </View>
    </View>
    );
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      
        {/* {updates.length > 0 ? (
          updates.map(renderItem)
        ) : (
          <Text style={styles.noUpdatesText}>No updates available</Text>
        )}
        */}
       {updates.length === 0 ? (
       <Text style={styles.noUpdatesText}>No updates available</Text>
      ) : (
        <FlatList
          data={updates}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          //inverted // To display the most recent messages at the bottom
        />
      )}
      <View style={styles.addUpdateContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter new update"
          placeholderTextColor="#fff"
          value={newUpdateText}
          onChangeText={setNewUpdateText}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddUpdate}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#000',
  },
  updateContainer: {
    maxWidth: '80%', // Adjust the maximum width as needed
    marginBottom: 10,
    alignSelf: 'flex-start', // Default alignment
  },
  updateItem: {
    padding: 10,
    borderRadius: 8,
  },
  updateUserName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  updateText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  updateTime: {
    fontSize: 12,
    color: '#bdc3c7',
    textAlign: 'right',
  },
  dateText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  noUpdatesText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    height: "85%",
  },
  addUpdateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#3498db',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Spoc_Updates;
