// App.js
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//common
import Welcome_Page from './Components/Common/Welcome_Page';

//spoc
import Spoc_Login from './Components/Spoc/Spoc_Login';
import Spoc_OTP from './Components/Spoc/Spoc_OTP';
import Spoc_Home_Page from './Components/Spoc/Spoc_Home_Page';
import Spoc_Profile from './Components/Spoc/Spoc_Profile';
import Spoc_Edit_Profile from './Components/Spoc/Spoc_Edit_Profile';
import Spoc_Notifications from './Components/Spoc/Spoc_Notifications';
import Spoc_View_Companies from './Components/Spoc/Spoc_View_Companies';
import Spoc_Assigned_Companies from './Components/Spoc/Spoc_Assigned_Companies';
import Spoc_Edit_Company from './Components/Spoc/Spoc_Edit_Company';
import Spoc_Add_Companies from './Components/Spoc/Spoc_Add_Companies';
import Spoc_Edit_Company_Status from './Components/Spoc/Spoc_Edit_Company_Status';
import Spoc_View_Emails from './Components/Spoc/Spoc_View_Emails';
import Spoc_Updates from './Components/Spoc/Spoc_Updates';
//superuser
import Super_User_Login from './Components/SuperUser/Super_User_Login';
import Super_User_OTP from './Components/SuperUser/Super_User_OTP';
import Super_User_Home_Page from './Components/SuperUser/Super_User_Home_Page';
import Super_User_Profile from './Components/SuperUser/Super_User_Profile';
import Super_User_Edit_Profile from './Components/SuperUser/Super_User_Edit_Profile';
import Super_User_Notifications from './Components/SuperUser/Super_User_Notifications';
import Super_User_Add_Companies from './Components/SuperUser/Super_User_Add_Companies';
import Super_User_Add_User from './Components/SuperUser/Super_User_Add_User';
import Super_User_Edit_User from './Components/SuperUser/Super_User_Edit_User';
import Super_User_Add_Super_User from './Components/SuperUser/Super_User_Add_Super_User';
import Super_User_Edit_Super_User from './Components/SuperUser/Super_User_Edit_Super_User';
import Super_User_Assign_Companies from './Components/SuperUser/Super_User_Assign_Companies';
import Super_User_Reassign_Companies from './Components/SuperUser/Super_User_Reassign_Companies';
import Super_User_View_Companies from './Components/SuperUser/Super_User_View_Companies';
import Super_User_View_Users from './Components/SuperUser/Super_User_View_Users';
import Super_User_View_Super_Users from './Components/SuperUser/Super_User_View_Super_Users';
import Super_User_Placement_Cycle from './Components/SuperUser/Super_User_Placement_Cycle';
import Super_User_View_Emails from './Components/SuperUser/Super_User_View_Emails';
import Super_User_View_Pdf from './Components/SuperUser/Super_User_View_Pdf';
import EmailList from './Components/SuperUser/EmailList';

//CHAT

import Chat from './screens/Chat';

import ChatScreen from './screens/ChatScreen';

import {BASE_URL} from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import fetchAPI from './Tools/FetchAPI';

const Stack = createStackNavigator();

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

const App = () => {
  return (
    <NavigationContainer>
      <AppContent />
    </NavigationContainer>
  );
};

const AppContent = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Check AsyncStorage for stored email and user role
    // AsyncStorage.clear();
    checkAsyncStorageValue();
  }, []); // Run only once on component mount

  const checkAsyncStorageValue = async () => {
    try {
      // await AsyncStorage.removeItem('email');
      // await AsyncStorage.removeItem('user');
      const email = await AsyncStorage.getItem('email');
      const user = await AsyncStorage.getItem('user');

      let cycle = getCycleNumber(new Date());
      let response1 = await fetchAPI(
        `${BASE_URL}/placement/selectcycle`,
        {cycle},
        'POST',
        false,
      );
      console.log(response1.data[0]);
      cycle = response1.data[0];

      if (email && (user === 'spoc' || user === 'superuser')) {
        navigation.navigate(
          user === 'spoc' ? 'Spoc_Home_Page' : 'Super_User_Home_Page',
          {
            email,
            cycle,
          },
        );
      }
    } catch (error) {
      console.error('Error checking AsyncStorage value:', error);
    }
  };

  return (
    <Stack.Navigator initialRouteName="Welcome_Page">
      {/* common*/}
      <Stack.Screen
        name="Welcome_Page"
        component={Welcome_Page}
        options={{headerShown: false}}
      />

      {/* chat */}
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: 'Chat', // Text color of the header
        }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: '', // Text color of the header
        }}
      />

      {/* spoc */}
      <Stack.Screen
        name="Spoc_Login"
        component={Spoc_Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Spoc_OTP"
        component={Spoc_OTP}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Spoc_Home_Page"
        component={Spoc_Home_Page}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: '', // Text color of the header
        }}
      />

      <Stack.Screen
        name="Spoc_Profile"
        component={Spoc_Profile}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: 'Profile', // Text color of the header
        }}
      />

      <Stack.Screen
        name="Spoc_Edit_Profile"
        component={Spoc_Edit_Profile}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: 'Edit Profile', // Text color of the header
        }}
      />

      <Stack.Screen
        name="Spoc_Notifications"
        component={Spoc_Notifications}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: 'Notifications', // Text color of the header
        }}
      />

      <Stack.Screen
        name="Spoc_View_Companies"
        component={Spoc_View_Companies}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: 'Companies', // Text color of the header
        }}
      />

      <Stack.Screen
        name="Super_User_View_Emails"
        component={Super_User_View_Emails}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: 'Companies', // Text color of the header
        }}
      />

      <Stack.Screen
        name="Spoc_View_Emails"
        component={Spoc_View_Emails}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: 'Companies', // Text color of the header
        }}
      />

<Stack.Screen
        name="Spoc_Updates"
        component={Spoc_Updates}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: 'Updates', // Text color of the header
        }}
      />

      <Stack.Screen
        name="Spoc_Edit_Company_Status"
        component={Spoc_Edit_Company_Status}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: 'Edit Company Status', // Text color of the header
        }}
      />
      <Stack.Screen
        name="Spoc_Assigned_Companies"
        component={Spoc_Assigned_Companies}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: 'Companies', // Text color of the header
        }}
      />

      <Stack.Screen
        name="Spoc_Add_Companies"
        component={Spoc_Add_Companies}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: 'Add Company', // Text colorema of the header
        }}
      />

      <Stack.Screen
        name="Spoc_Edit_Company"
        component={Spoc_Edit_Company}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: 'Edit Company', // Text color of the header
        }}
      />

      {/* superuser */}

      <Stack.Screen
        name="Super_User_Login"
        component={Super_User_Login}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Super_User_OTP"
        component={Super_User_OTP}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Super_User_Home_Page"
        component={Super_User_Home_Page}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: '', // Text color of the header
        }}
      />

      <Stack.Screen
        name="Super_User_Profile"
        component={Super_User_Profile}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: 'Profile', // Text color of the header
        }}
      />

      <Stack.Screen
        name="Super_User_Edit_Profile"
        component={Super_User_Edit_Profile}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: 'Edit Profile', // Text color of the header
        }}
      />

      <Stack.Screen
        name="Super_User_View_Pdf"
        component={Super_User_View_Pdf}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: 'View JAF/INF', // Text color of the header
        }}
      />

      <Stack.Screen
        name="Super_User_Notifications"
        component={Super_User_Notifications}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: 'Notifications', // Text color of the header
        }}
      />

      <Stack.Screen
        name="Super_User_Add_Companies"
        component={Super_User_Add_Companies}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: 'Add Company', // Text color of the header
        }}
      />
      <Stack.Screen
        name="Super_User_Add_User"
        component={Super_User_Add_User}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: 'Add Student Representative', // Text color of the header
        }}
      />

      <Stack.Screen
        name="EmailList"
        component={EmailList}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: 'Emails', // Text color of the header
        }}
      />

      <Stack.Screen
        name="Super_User_Placement_Cycle"
        component={Super_User_Placement_Cycle}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: 'Placement Cycle', // Text color of the header
        }}
      />

      <Stack.Screen
        name="Super_User_Edit_User"
        component={Super_User_Edit_User}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: 'Edit User', // Text color of the header
        }}
      />
      <Stack.Screen
        name="Super_User_Add_Super_User"
        component={Super_User_Add_Super_User}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: 'Add Super User', // Text color of the header
        }}
      />

      <Stack.Screen
        name="Super_User_Edit_Super_User"
        component={Super_User_Edit_Super_User}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: 'Edit Super User', // Text color of the header
        }}
      />

      <Stack.Screen
        name="Super_User_Assign_Companies"
        component={Super_User_Assign_Companies}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: 'Companies', // Text color of the header
        }}
      />

      <Stack.Screen
        name="Super_User_Reassign_Companies"
        component={Super_User_Reassign_Companies}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: 'Companies', // Text color of the header
        }}
      />

      <Stack.Screen
        name="Super_User_View_Companies"
        component={Super_User_View_Companies}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: 'Companies', // Text color of the header
        }}
      />
      <Stack.Screen
        name="Super_User_View_Users"
        component={Super_User_View_Users}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: 'Student Reps', // Text color of the header
        }}
      />

      <Stack.Screen
        name="Super_User_View_Super_Users"
        component={Super_User_View_Super_Users}
        options={{
          headerStyle: {
            backgroundColor: '#202020', // Background color of the header
          },
          headerTintColor: '#B9B9B9',
          headerTitle: 'Super Users', // Text color of the header
        }}
      />
    </Stack.Navigator>
  );
};

export default App;
