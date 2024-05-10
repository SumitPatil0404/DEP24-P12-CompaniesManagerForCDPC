import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import fetchAPI from '../../Tools/FetchAPI';
import { BASE_URL } from '../../api';
import LoadingScreen from '../Common/LoadingScreen';

const Super_User_Notifications = ({ route }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
 const email="superuser@iitrpr.ac.in";
 const email1 = route.params.email;
  console.log(email);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      let t = { email: email };
      const response = await fetchAPI(`${BASE_URL}/notification/user`, t, 'POST', false);
      if (!response.ok) {
        console.log('Error fetching notifications');
        return;
      }
      t = { email: email1 };
      const response1 = await fetchAPI(`${BASE_URL}/notification/user`, t, 'POST', false);
      if (!response1.ok) {
        console.log('Error fetching notifications');
        return;
      }

      response.notifications = response.notifications.concat(response1.notifications);
      const sortedNotifications = sortNotificationsByDate(response.notifications);
      setNotifications(sortedNotifications);
      console.log('Notifications:', sortedNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
    finally
    {
      setLoading(false);
    }
  };

  const sortNotificationsByDate = (notifications) => {
    return notifications.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  };

  const groupNotificationsByDate = (notifications) => {
    // Group notifications by date
    const groupedNotifications = notifications.reduce((groups, notification) => {
      const date = new Date(notification.created_at).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(notification);
      return groups;
    }, {});

    // Convert grouped notifications object to array of objects with date and notifications
    return Object.keys(groupedNotifications).map((date) => ({
      date,
      notifications: groupedNotifications[date],
    }));
  };

  const renderNotificationItem = ({ item }) => (
    <View>
      {item.notifications.map((notification, index) => (
        <View key={index} style={styles.notificationContainer}>
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationDate}>{formatDate(item.date)}</Text>
          </View>
          <View>
            <Text style={styles.notificationTitle}>{notification.sender_email}</Text>
            <Text style={styles.notificationContent}>{notification.message}</Text>
            {index < item.notifications.length - 1 && <View style={styles.messageSeparator} />}
          </View>
        </View>
      ))}
    </View>
  );
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  if(loading)
  {
    return <LoadingScreen />
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={groupNotificationsByDate(notifications)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderNotificationItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#282828', // Background color
  },
 
  notificationContainer: {
    backgroundColor: '#fff',
    borderRadius: 16, // Increased border radius for a more rounded look
    padding: 10,
    marginBottom: 16,
    elevation: 2,
    position: 'relative', // To make positioning of date/time absolute relative to this container
  },
  notificationHeader: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 8,
    backgroundColor: '#2ecc71', // Background color for date/time
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 8,
    elevation: 3,
  },
  notificationDate: {
    color: '#fff', // Text color for date/time
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2ecc71', // Text color
  },
  notificationContent: {
    fontSize: 16,
    color: '#555555',
    fontWeight: 'bold',
  },
});

export default Super_User_Notifications;
