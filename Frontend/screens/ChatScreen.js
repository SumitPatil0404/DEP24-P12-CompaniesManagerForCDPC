import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {BASE_URL} from '../api';
import fetchAPI from '../Tools/FetchAPI';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native-elements';
import LoadingScreen from '../Components/Common/LoadingScreen';
const ChatScreen = ({route}) => {
  const navigation = useNavigation();
  const {sender, user} = route.params; // Assuming user object is passed from previous screen
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);

  // Function to fetch messages from backend
  const fetchMessages = async () => {
    try {
      // setLoading(true);
      // Fetch messages for the specific user
      let t = {sender_id: sender.user_id, receiver_id: user.user_id};
      const response = await fetchAPI(`${BASE_URL}/messages`, t, 'POST', false);
      setMessages(response.messages);
      // console.log(response);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      // setLoading(false);
    }
  };

  // Simulated function to send a message
  const sendMessage = async () => {
    try {
     
      // Simulate sending message to the backend
      // const messageDate = new Date(item.sent_at);
      const currentTime = new Date();
      const ISTOffset = 330; // IST offset in minutes
      const ISTTime = new Date(currentTime.getTime() + ISTOffset * 60000);
      // console.log(ISTTime.toISOString());
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        sender: 'me',
      };
      setInputText('');

      // Simulated backend call to save the message
      let t = {
        user_id: sender.user_id,
        message: inputText,
        receiver_id: user.user_id,
        sent_at: currentTime.toISOString(),
      };
      let response = await fetchAPI(
        `${BASE_URL}/send/message`,
        t,
        'POST',
        false,
      );

      // Fetch messages again to get the updated list
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchMessages();
    setLoading(false);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={styles.headerContainer1}>
          <Image source={require('../image/user1.png')} style={styles.icon} />
          <Text style={styles.headerText}>{user.name}</Text>
        </View>
      ),
    });
  }, []);

  const renderItem = ({item, index}) => {
    // Determine if the message is sent by the sender or receiver
    const isSender = item.sender_id === sender.user_id;

    // Calculate the background color based on the sender
    const messageBackgroundColor = isSender ? '#6cbf73' : '#4287f5';

    // Parse the message date
    let messageDate = new Date(item.sent_at);

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // console.log(messageDate + " mesaage date" + index)
    // console.log(today + " today")
    // console.log(yesterday + " yesterday")
    // Function to format the time text
    const formatTimeText = date => {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    // Function to format the date text
    const formatDateText = date => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (date >= today) {
        return 'Today';
      } else if (date >= yesterday) {
        return 'Yesterday';
      } else {
        return date.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      }
    };

    return (
      <View style={styles.messageContainer}>
        {/* Show date if it's a new date */}
        {/* {!index || new Date(item.sent_at).toDateString() !== new Date(messages[index - 1].sent_at).toDateString() && (
          <Text style={styles.dateText}>{formatDateText(messageDate)}</Text>
         )}  */}
        {!index ? (
          <Text style={styles.dateText}>{formatDateText(messageDate)}</Text>
        ) : (
          new Date(item.sent_at).toDateString() !==
            new Date(messages[index - 1].sent_at).toDateString() && (
            <Text style={styles.dateText}>{formatDateText(messageDate)}</Text>
          )
        )}
        {/* Show time */}
        <View
          style={[
            styles.message,
            {
              alignSelf: isSender ? 'flex-end' : 'flex-start',
              backgroundColor: messageBackgroundColor,
            },
          ]}>
          <Text style={styles.messageText}>{item.message_text}</Text>
          <Text style={styles.timeText}>{formatTimeText(messageDate)}</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>{user.name}</Text>
      </View> */}
      {messages.length === 0 ? (
        <Text style={styles.noMessageText}>No messages to display</Text>
      ) : (
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.message_id}
          // inverted // To display the most recent messages at the bottom
        />
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
        />
        {/* <Button title="Send" onPress={sendMessage} /> */}
        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  headerText: {
    fontSize: 30,
    color: '#ffffff',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000000',
    color: '#ffffff',
  },
  icon: {
    width: 45,
    height: 45,
    marginRight: 15,
  },
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageContainer: {
    marginBottom: 10,
  },
  message: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 10,
  },
  messageText: {
    color: '#ffffff',
    marginBottom: 8,
  },
  timeText: {
    fontSize: 10,
    color: '#ffffff',
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  noMessageText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    height: '90%',
  },
  button: {
    backgroundColor: '#4287f5', // Button color
    padding: 10,
    borderRadius: 15,
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
