import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';
import fetchAPI from '../../Tools/FetchAPI';
import {BASE_URL} from '../../api';
import {Image} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import {ActivityIndicator} from 'react-native';
import LoadingScreen from '../Common/LoadingScreen';

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

const Super_User_Home_Page = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [superUserName, setSuperUserName] = useState('');
  const {email, cycle} = route.params;
  const [previousCycle, setPreviousCycle] = useState(true);
  const [currentCycle, setCurrentCycle] = useState(cycle);
  // console.log(email);
  // console.log(cycle.cycle + ' cycle');

  // console.log(cycleNumber);
  useEffect(() => {
    let cycleNumber = getCycleNumber(new Date());
   
    setCurrentCycle(cycle.cycle)
    if (Number(cycleNumber) > Number(cycle.cycle)) {
      setPreviousCycle(false);
      console.log('Previous cycle');
      console.log(cycleNumber+' '+cycle);
    } else {
      setPreviousCycle(true);
      console.log('Current cycle');
      console.log(cycleNumber+' '+cycle);
    }
    
    fetchSuperUserName();
  }, [cycle]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit?',
          [
            {
              text: 'Cancel',
              onPress: () => null, // Do nothing if cancel is pressed
              style: 'cancel',
            },
            {text: 'Exit', onPress: () => BackHandler.exitApp()}, // Exit the app if exit is pressed
          ],
          {cancelable: false}, // Disable cancel button
        );
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  

  const fetchSuperUserName = async () => {
    try {
      let cycle1=getCycleNumber(new Date());
      let response1= await fetchAPI(`${BASE_URL}/placement/selectcycle`, { cycle :cycle1 }, 'POST', false);
      console.log(response1.data[0]);
      cycle1=response1.data[0].cycle_id;
      let t = {email: email,cycle_id:cycle1};
      let response = await fetchAPI(
        `${BASE_URL}/superuser/profile`,
        t,
        'POST',
        false,
      );

      if (!response.ok) {
        console.log('Error getting user data');
        return;
      }
      setSuperUserName(response.data.name);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.notificationIcon}
            onPress={() =>
              navigation.navigate('Super_User_Notifications', {email})
            }>
            <Image
              source={require('../../image/notification.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.messageIcon}
            onPress={() =>
              navigation.navigate('Chat', {email,cycle})
            }>
            <Image
              source={require('../../image/chat.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileIcon}
            onPress={() => navigation.navigate('Super_User_Profile', {email,cycle})}>
            <Image
              source={require('../../image/profile.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () =>  <View style={styles.headerContainer1}>
      <Text style={styles.headerText}>{`PC : ${cycle.cycle} - ${cycle.cycle + 1}`}</Text>
    </View>
    });
  }, [navigation,cycle]);

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Welcome, {superUserName}</Text>
        </View>
        {previousCycle && (
          <View style={styles.Container}>
            <Text style={styles.title}>ADD</Text>
            <View style={styles.mainContainer}>
              <TouchableOpacity
                style={styles.subContainer}
                onPress={() => {
                  navigation.navigate('Super_User_Add_Companies', {email,cycle});
                }}>
                <Image
                  source={require('../../image/company1.png')} // Replace 'your_image.jpg' with your image file path
                  style={styles.image}
                />
                <Text style={styles.subTitle}>Companies</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.subContainer}
                onPress={() => {
                  navigation.navigate('Super_User_Add_User', {email,cycle});
                }}>
                <Image
                  source={require('../../image/user.jpeg')} // Replace 'your_image.jpg' with your image file path
                  style={styles.image}
                />
                <Text style={styles.subTitle}>Student Reps</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subContainer}
                onPress={() => {
                  navigation.navigate('Super_User_Add_Super_User', {email,cycle});
                }}>
                <Image
                  source={require('../../image/admin.jpeg')} // Replace 'your_image.jpg' with your image file path
                  style={styles.image}
                />
                <Text style={styles.subTitle}>Superusers</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.Container}>
          <Text style={styles.title}>View</Text>
          <View style={styles.mainContainer1}>
            <View style={styles.mainContainer}>
              <TouchableOpacity
                style={styles.subContainer}
                onPress={() => {
                  navigation.navigate('Super_User_View_Companies',{email,cycle});
                }}>
                <Image
                  source={require('../../image/company1.png')} // Replace 'your_image.jpg' with your image file path
                  style={styles.image}
                />
                <Text style={styles.subTitle}>Companies</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.subContainer}
                onPress={() => {
                  navigation.navigate('Super_User_View_Users', {email,cycle});
                }}>
                <Image
                  source={require('../../image/user.jpeg')} // Replace 'your_image.jpg' with your image file path
                  style={styles.image}
                />
                <Text style={styles.subTitle}>Student Reps</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subContainer}
                onPress={() => {
                  navigation.navigate('Super_User_View_Super_Users', {email,cycle});
                }}>
                <Image
                  source={require('../../image/admin.jpeg')} // Replace 'your_image.jpg' with your image file path
                  style={styles.image}
                />
                <Text style={styles.subTitle}>Superusers</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mainContainer}>
              <TouchableOpacity
                style={styles.subContainer}
                onPress={() => {
                  navigation.navigate('Spoc_Assigned_Companies', {email,cycle});
                }}>
                <Image
                  source={require('../../image/company1.png')} // Replace 'your_image.jpg' with your image file path
                  style={styles.image}
                />
                <Text style={styles.subTitle}> Assigned Companies</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subContainer}
                onPress={() => {
                  navigation.navigate('Super_User_View_Emails',{email,cycle});
                }}>
                <Image
                  source={require('../../image/company1.png')} // Replace 'your_image.jpg' with your image file path
                  style={styles.image}
                />
                <Text style={styles.subTitle}>Emails</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.subContainer}></TouchableOpacity>
            </View>
          </View>
        </View>

        {previousCycle && (
          <View style={styles.Container}>
            <Text style={styles.title}>Companies</Text>
            <View style={styles.mainContainer}>
              <TouchableOpacity
                style={styles.subContainer}
                onPress={() => {
                  navigation.navigate('Super_User_Assign_Companies',{email,cycle});
                }}>
                <Image
                  source={require('../../image/company1.png')} // Replace 'your_image.jpg' with your image file path
                  style={styles.image}
                />
                <Text style={styles.subTitle}>Assign</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subContainer}
                onPress={() => {
                  navigation.navigate('Super_User_Reassign_Companies', {email,cycle});
                }}>
                <Image
                  source={require('../../image/company1.png')} // Replace 'your_image.jpg' with your image file path
                  style={styles.image}
                />
                <Text style={styles.subTitle}>Reassign</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.subContainer}></TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.Container1}>
          <Text style={styles.title}>Manage</Text>
          <View style={styles.mainContainer}>
            <TouchableOpacity
              style={styles.subContainer}
              onPress={() => {
                navigation.navigate('Super_User_Placement_Cycle', {email,cycle});
              }}>
              <Image
                source={require('../../image/company1.png')} // Replace 'your_image.jpg' with your image file path
                style={styles.image}
              />
              <Text style={styles.subTitle}>Placement Cycle</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.subContainer}></TouchableOpacity>
            <TouchableOpacity style={styles.subContainer}></TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
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
    marginLeft: 20,
  },
  headerText: {
    fontSize: 20,
    color: '#ffffff',
  },
  notificationIcon: {
    marginRight: 'auto', // Pushes the notification icon to the far left
    // marginLeft: 15,
    marginRight: 5,
    // borderColor: '#fff', // Green color from your theme
    // borderWidth: 1,
    // borderRadius: 50,
    // padding: 20, // Margin to separate the icon from the edge
  },
  messageIcon: {
    marginRight: 'auto', // Pushes the notification icon to the far left
    // marginLeft: 1,
    marginRight: 5,
    // borderColor: '#fff', // Green color from your theme
    // borderWidth: 1,
    // borderRadius: 50,
  //  / padding: 20, // Margin to separate the icon from the edge
  },
  profileIcon: {
    marginLeft: 'auto', // Pushes the profile icon to the far right
    marginRight: 15,
    // Margin to separate the icon from the edge
  },
  icon: {
    width: 45,
    height: 45,
    // Green color from your theme
  },
  container: {
    flex: 1,

    padding: 20,
    backgroundColor: '#202020',

    // borderColor: '#2ecc71', // Green color from your theme
    // borderWidth: 1,

    // Background color from your theme
  },
  greetingContainer: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff', // Green color from your theme
  },
  Container: {
    backgroundColor: '#333333', // Background color for "ADD" section
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    flex: 1,
    // borderColor: '#2ecc71', // Green color from your theme
    // borderWidth: 1,
    // Rounded corners for the container
  },
  Container1: {
    backgroundColor: '#333333', // Background color for "ADD" section
    padding: 10,
    borderRadius: 10,
    marginBottom: 35,
    flex: 1,
    // borderColor: '#2ecc71', // Green color from your theme
    // borderWidth: 1,
    // Rounded corners for the container
  },
  image: {
    width: 60, // Adjust the width and height as needed
    height: 60,
    resizeMode: 'cover',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2ecc71', // Green color from your theme
    borderRadius: 26,
    // backgroundColor: '#grey',
    opacity: 0.7,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row', // Arrange sub-containers horizontally
    justifyContent: 'space-between',
    // borderColor: '#2ecc71', // Green color from your theme
    // borderWidth: 1, // Space evenly between sub-containers
    marginBottom: 9,
  },
  mainContainer1: {
    flex: 1,
    flexDirection: 'col', // Arrange sub-containers horizontally
    justifyContent: 'space-between',
    // borderColor: '#2ecc71', // Green color from your theme
    // borderWidth: 1, // Space evenly between sub-containers
    // padding: 15,
  },
  subContainer: {
    alignItems: 'center',
    flex: 1, // Align items in the center
    // borderColor: '#2ecc71', // Green color from your theme
    // borderWidth: 1,
  },
  subContainer2: {
    alignItems: 'center',
    flex: 1, // Align items in the center
    flexDirection: 'row',
  },
  subContainer1: {
    marginLeft: 40,
    flex: 2, // Align items in the center
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff', // White color from your theme
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 17,
    color: '#ffffff', // White color from your theme
  },
});

export default Super_User_Home_Page;
