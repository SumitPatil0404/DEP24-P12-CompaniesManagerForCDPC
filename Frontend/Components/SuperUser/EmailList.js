import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { BASE_URL } from '../../api';
import fetchAPI from '../../Tools/FetchAPI';
import LoadingScreen from '../Common/LoadingScreen';

const EmailList = ({route}) => {
  const [emails, setEmails] = useState([]);
  const  email  = route.params.email[0];
  const [loading, setLoading] = useState(true);

  console.log(email);

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      setLoading(true);
      // Make a request to your backend to fetch emails
      let t={
        email: email
      }
    const data = await fetchAPI(`${BASE_URL}/user/emails`,t,'POST',false);
    if(data.ok){
      setEmails(data.data);
     }
     else 
     {
        setEmails([]);
     } // Assuming your backend returns an array of emails
      console.log(data);
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
    finally {
      setLoading(false);
    }

  };

  const renderItem = ({ item }) => (
    <View style={styles.emailContainer}>
      <Text style={styles.subject}>{item.subject}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </View>
  );
  const keyExtractor = (item, index) => `${item.subject}_${item.body}_${index}`;
  if(loading)
  {
    return <LoadingScreen />
  }
  return (
   


    <View style={styles.container}>
      <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center',marginBottom:20}}>{email}</Text>
      {emails.length === 0 ? (
        <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>
          No emails found
        </Text>
      ) : 
      <FlatList
        data={emails}
        renderItem={renderItem}
        keyExtractor={keyExtractor} // Assuming each email has a unique id
      />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#202020', // black background
  },
  emailContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#333', // slightly lighter than black
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 10,
   

   
    margin:10, // black background
  },
  subject: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // white text
  },
  body: {
    fontSize: 14,
    marginTop: 5,
    color: '#ccc', // lighter text
  },
});

export default EmailList;
