# Frontend

# Company_Details Component

The `Company_Details` component is designed for managing company details within a React Native application. It includes features such as handling CTC (Cost to Company), stipend, job location, category selection, and eligible degree selection.

## Props

- `companydetails`: Object containing company details such as CTC, stipend, and job location.
- `handleCTCChange`: Function to handle changes in the CTC input.
- `handleStipendChange`: Function to handle changes in the stipend input.
- `handleJobLocationChange`: Function to handle changes in the job location input.
- `handleCategoryChange`: Function to handle changes in the selected category.
- `handleBatchChange`: Function to handle changes in the selected degree.
- `remove`: Function to remove the component.

## Usage

```jsx
<Company_Details
  companydetails={/* Object with company details */}
  handleCTCChange={/* Function to handle CTC change */}
  handleStipendChange={/* Function to handle stipend change */}
  handleJobLocationChange={/* Function to handle job location change */}
  handleCategoryChange={/* Function to handle category change */}
  handleBatchChange={/* Function to handle batch change */}
  remove={/* Function to remove the component */}
/>
```



# HR_Component

The `HR_Component` is a React Native component designed for managing HR details within an application. It includes features such as handling HR name, email addresses, phone numbers, LinkedIn profiles, and dynamic addition/removal of email addresses and phone numbers.

## Props

- `hr`: Object containing HR details including name, emails, phone numbers, and LinkedIn profile.
- `index`: Index of the HR component.
- `handleHrNameChange`: Function to handle changes in the HR name.
- `handleEmailChange`: Function to handle changes in email addresses.
- `addEmail`: Function to add a new email address.
- `handlePhoneChange`: Function to handle changes in phone numbers.
- `addPhoneNumber`: Function to add a new phone number.
- `handleLinkedinChange`: Function to handle changes in the LinkedIn profile URL.
- `removeHR`: Function to remove the HR component.
- `removeEmail`: Function to remove an email address.
- `removePhoneNumber`: Function to remove a phone number.

## Usage

```jsx
<HR_Component
  hr={/* Object with HR details */}
  index={/* Index of the HR component */}
  handleHrNameChange={/* Function to handle HR name change */}
  handleEmailChange={/* Function to handle email change */}
  addEmail={/* Function to add an email address */}
  handlePhoneChange={/* Function to handle phone number change */}
  addPhoneNumber={/* Function to add a phone number */}
  handleLinkedinChange={/* Function to handle LinkedIn profile change */}
  removeHR={/* Function to remove the HR component */}
  removeEmail={/* Function to remove an email address */}
  removePhoneNumber={/* Function to remove a phone number */}
/>

```

# Welcome_Page Component

The `Welcome_Page` component is a React Native screen that displays a welcome message and options for different user types to login.

## Usage

To use the `Welcome_Page` component, import it into your React Native application and render it within your navigation stack.

```jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from './LoadingScreen';

const Welcome_Page = () => {
  // Component implementation
};

export default Welcome_Page;
```

# CompanyPDF Component

The `CompanyPDF` component in React Native generates a PDF document containing details of companies and their HR information.

## Usage

To use the `CompanyPDF` component, import it into your React Native application and render it within your desired screen or component.

```jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Alert } from 'react-native';

const CompanyPDF = ({ companies }) => {
  // Component implementation
};

export default CompanyPDF;

```

# Spoc_Add_Companies Component

The `Spoc_Add_Companies` component in React Native allows a Student Point of Contact (SPOC) to add details of companies and their HR information for recruitment purposes.

## Usage

To use the `Spoc_Add_Companies` component, import it into your React Native application and render it within your desired screen or component.

```jsx
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import HR_Component from '../Common/HR_Component';
import Company_Details from '../Common/Company_Details';
import { encryptJSONToString } from '../../Tools/DataSecurity';
import fetchAPI from '../../Tools/FetchAPI';
import { BASE_URL } from '../../api';
import LoadingScreen from '../Common/LoadingScreen';

const Spoc_Add_Companies = ({ route }) => {
  // Component implementation
};

export default Spoc_Add_Companies;
```

# Spoc_Assigned_Companies Component

This React Native component displays a list of assigned companies for a specific user with various functionalities like viewing company details, HR details, editing company status, and more.

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.

## Usage

Import the `Spoc_Assigned_Companies` component in your React Native project and use it as follows:

```jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Spoc_Assigned_Companies from './path/to/Spoc_Assigned_Companies';

const App = () => {
  return (
    <View style={styles.container}>
      <Spoc_Assigned_Companies />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
```

# Spoc_Edit_Company_Status Component

This React Native component allows users to edit the status of a company and save changes.

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.

## Usage

Import the `Spoc_Edit_Company_Status` component in your React Native project and use it as follows:

```jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Spoc_Edit_Company_Status from './path/to/Spoc_Edit_Company_Status';

const App = () => {
  return (
    <View style={styles.container}>
      <Spoc_Edit_Company_Status />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
```

# Spoc_Edit_Company Component

## Description

The `Spoc_Edit_Company` component is designed for editing company details, including HR information, company updates, and document uploads.

## Installation

1. Clone the repository to your local machine.
2. Navigate to the directory containing the `Spoc_Edit_Company` component.
3. Install the necessary dependencies using npm or yarn.

```bash
npm install
# or
yarn install

```

# Spoc_Edit_Profile Component

The `Spoc_Edit_Profile` component is used for editing user profiles in a React Native application.

## Usage

1. Import the component:

   ```javascript
   import Spoc_Edit_Profile from './path/to/Spoc_Edit_Profile';
    <Spoc_Edit_Profile route={route} navigation={navigation} />
  
# Spoc_Home_Page Component Documentation

The `Spoc_Home_Page` component is a React Native component designed for the home page of your application. It includes various features such as navigation, fetching data from APIs, displaying user information, and providing options for managing companies and emails.

## Usage

To use the `Spoc_Home_Page` component, follow these steps:

1. Import the necessary modules and components:
   ```javascript
   import React, { useEffect, useState } from 'react';
   import { View, Text, StyleSheet, BackHandler, TouchableOpacity, Alert, ScrollView } from 'react-native';
   import { useNavigation, useFocusEffect } from '@react-navigation/native';
   import fetchAPI from '../../Tools/FetchAPI';
   import { BASE_URL } from '../../api';
   import { Image } from 'react-native-elements';

# Spoc_Login Component Documentation

The `Spoc_Login` component is a React Native component designed for user login functionality, specifically for student representatives. It includes email validation, role selection, API calls for login, and navigation to OTP verification.

## Usage

To use the `Spoc_Login` component, follow these steps:

1. Import the necessary modules and components:
   ```javascript
   import React, { useState } from 'react';
   import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
   import { useNavigation } from '@react-navigation/native';
   import { Input } from 'react-native-elements';
   import { Picker } from '@react-native-picker/picker';
   import fetchAPI from '../../Tools/FetchAPI';
   import { BASE_URL } from '../../api';
   import AsyncStorage from '@react-native-async-storage/async-storage'; 
   import LoadingScreen from '../Common/LoadingScreen';


# Spoc_Notifications Component Documentation

The `Spoc_Notifications` component is a React Native component designed to display notifications grouped by date for a specific user.

## Usage

To use the `Spoc_Notifications` component, follow these steps:

1. Import the necessary modules and components:
   ```javascript
   import React, { useState, useEffect } from 'react';
   import { View, Text, FlatList, StyleSheet } from 'react-native';
   import fetchAPI from '../../Tools/FetchAPI';
   import { BASE_URL } from '../../api';
   import LoadingScreen from '../Common/LoadingScreen';
# Spoc_OTP Component

The `Spoc_OTP` component is used for OTP (One-Time Password) verification in React Native applications.

## Props

- `route`: Contains parameters passed from the previous screen, including `email` and `cycle`.

## State

- `otp`: Holds the user-entered OTP.
- `OTP`: Stores the generated OTP.
- `isOtpExpired`: Tracks whether the OTP has expired.
- `isResendVisible`: Controls the visibility of the "Resend OTP" button.
- `resendTimer`: Displays the countdown for OTP resend.

## Methods

- `generateOTP()`: Generates a random OTP.
- `sendOTP(email, otp)`: Sends the OTP to the user's email.
- `handleVerifyOTP()`: Handles OTP verification and navigation to the home page upon successful verification.
- `handleResendOTP()`: Resends the OTP to the user's email.

## Usage

```jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { BASE_URL } from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to generate OTP and send it via API
function generateOTP() { ... }
let sendOTP = async (email, otp) => { ... }

const Spoc_OTP = ({ route }) => {
  const [otp, setOTP] = useState('');
  const [OTP, setOTP1] = useState(0);
  const [isOtpExpired, setIsOtpExpired] = useState(false);
  const [isResendVisible, setIsResendVisible] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const { email, cycle } = route.params;
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // useEffect and event handlers...

  return (
    <View style={styles.container}>
      {/* JSX elements for OTP input, verification, and resend */}
    </View>
  );
};

const styles = StyleSheet.create({
  // Styles for component elements
});

export default Spoc_OTP;
```
# Spoc_Profile Component

The `Spoc_Profile` component displays user profile information and provides options to edit the profile and logout.

## Props

- `route`: Contains parameters passed from the previous screen, including `email` and `cycle`.

## State

- `userData`: Stores user profile data fetched from the API.
- `loading`: Controls the visibility of the loading screen.

## Methods

- `handleLogout()`: Handles logout functionality by removing user data from AsyncStorage and navigating to the welcome page.
- `handleEditProfile()`: Navigates to the edit profile screen.

## Usage

```jsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import fetchAPI from '../../Tools/FetchAPI';
import { BASE_URL } from '../../api';
import LoadingScreen from '../Common/LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Spoc_Profile = ({ route }) => {
  const navigation = useNavigation();
  const { email, cycle } = route.params;
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);

  // useEffect and event handlers...

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingScreen />
      ) : (
        userData && (
          <View style={styles.card}>
            {/* Profile data display */}
            <Image style={styles.avatar} source={require('../../image/ben-sweet-2LowviVHZ-E-unsplash.jpg')} />
            {/* Additional user information */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Name:</Text>
              <Text style={styles.fieldValue}>{userData.name || 'N/A'}</Text>
            </View>
            {/* Other profile fields */}
            {/* Edit Profile and Logout buttons */}
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
  // Component styles
});

export default Spoc_Profile;
```

# Spoc_Updates Component

The `Spoc_Updates` component displays updates related to a specific company and allows users to add new updates.

## Props

- `navigation`: Navigation object from React Navigation.
- `route`: Contains parameters passed from the previous screen, including `company_id`, `company_name`, `cycle`, and `email`.

## State

- `updates`: Array containing the updates fetched from the API.
- `newUpdateText`: Text input for adding a new update.
- `user`: Object containing user data.
- `loading`: Controls the visibility of the loading screen.

## Methods

- `fetchUser()`: Fetches user data based on the email and cycle ID.
- `fetchUpdates()`: Fetches updates for the specified company and cycle.
- `handleAddUpdate()`: Handles adding a new update to the company's updates list.

## Usage

```jsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { BASE_URL } from '../../api';
import fetchAPI from '../../Tools/FetchAPI';
import LoadingScreen from '../Common/LoadingScreen';

const Spoc_Updates = ({ navigation, route }) => {
  // Component logic and state management

  return (
    <View style={styles.container}>
      {/* Render updates and add update input */}
    </View>
  );
};

const styles = StyleSheet.create({
  // Component styles
});

export default Spoc_Updates;
```

# Spoc_View_Companies Component

The `Spoc_View_Companies` component displays a list of companies and allows viewing details, toggling company information, and searching/sorting companies.

## Props

- `route`: Contains parameters passed from the previous screen, including `cycle`.

## State

- `loading`: Indicates whether data is being fetched.
- `companies`: Array containing company data.
- `expandedCompanies`: Array of expanded company IDs.
- `expandedCompaniesDetails`: Array of expanded company details IDs.
- `expandedCompaniesHrDetails`: Array of expanded HR details IDs.
- `searchQuery`: Stores the search query for filtering companies.
- `sortOrder`: Indicates the sorting order ('asc' or 'desc').
- `cachedCompanyData`: Object caching company data.
- `cachedCompanyEmail`: Object caching company emails.

## Hooks

- `useNavigation`: Hook from React Navigation for accessing navigation props.
- `useFocusEffect`: Hook for handling screen focus effects.

## Methods

- `fetchData()`: Fetches company data from the API.
- `handleEditCompany(company)`: Navigates to the company editing screen.
- `toggleDetails(company)`: Toggles expanded details for a company.
- `toggleCompanyDetails(company)`: Toggles expanded company details.
- `toggleHrDetails(company)`: Toggles expanded HR details.
- `handleViewDetails(company)`: Fetches and caches user data for a company.
- `filteredAndSortedCompanies`: Filters and sorts the companies based on search query and sort order.

## Usage

```jsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { BASE_URL } from '../../api';
import fetchAPI from '../../Tools/FetchAPI';
import { encryptJSONToString, decryptStringToJSON } from '../../Tools/DataSecurity';
import LoadingScreen from '../Common/LoadingScreen'; // Import your loading screen component here

const secretKey = "Kartik's Secret Key";

const Spoc_View_Companies = ({ route }) => {
  // Component logic and state management

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Render companies list */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Component styles
});

export default Spoc_View_Companies;

```
# Spoc_View_Emails Component Documentation

The `Spoc_View_Emails` component is designed to allow users to view emails related to assigned companies. It includes functionalities such as searching for companies by name, sorting companies alphabetically, and viewing HR details and email lists.

## Installation

To use the `Spoc_View_Emails` component in your React Native project, follow these steps:

1. Copy the `Spoc_View_Emails.js` file to your project directory.

2. Import the component in your React Native file:
   ```javascript
   import Spoc_View_Emails from './path/to/Spoc_View_Emails';

# UserPDF Component Documentation

The `UserPDF` component is designed to generate a PDF document containing user details and allow exporting the PDF.

## Installation

To use the `UserPDF` component in your React Native project, follow these steps:

1. Copy the `UserPDF.js` file to your project directory.

2. Import the component in your React Native file:
   ```javascript
   import UserPDF from './path/to/UserPDF';
# EmailList Component Documentation

The `EmailList` component is designed to display a list of emails fetched from a backend API and show a loading screen while fetching data.

## Installation

To use the `EmailList` component in your React Native project, follow these steps:

1. Copy the code below and save it as `EmailList.js` in your project directory.

2. Import the component in your React Native file:
   ```javascript
   import EmailList from './path/to/EmailList';
# FilePicker Component Documentation

The `FilePicker` component is designed to allow users to upload a PDF file, send it to a backend server, and display extracted text from the PDF.

## Installation

To use the `FilePicker` component in your React Native project, follow these steps:

1. Copy the code below and save it as `FilePicker.js` in your project directory.

2. Import the component in your React Native file:
   ```javascript
   import FilePicker from './path/to/FilePicker';


# Super_User_Add_Companies Component Documentation

The `Super_User_Add_Companies` component is designed for super users to add new companies with HR details and company-specific information.

## Installation

To use the `Super_User_Add_Companies` component in your React Native project, follow these steps:

1. Copy the code below and save it as `Super_User_Add_Companies.js` in your project directory.

2. Import the component in your React Native file:
   ```javascript
   import Super_User_Add_Companies from './path/to/Super_User_Add_Companies';
# Super_User_Add_Companies Component Documentation

The `Super_User_Add_Companies` component is designed for super users to add new companies with HR details and company-specific information.

## Installation

To use the `Super_User_Add_Companies` component in your React Native project, follow these steps:

1. Copy the code below and save it as `Super_User_Add_Companies.js` in your project directory.

2. Import the component in your React Native file:
   ```javascript
   import Super_User_Add_Companies from './path/to/Super_User_Add_Companies';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Input} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import fetchAPI from '../../Tools/FetchAPI';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL} from '../../api';
import LoadingScreen from '../Common/LoadingScreen';

const handleEmailValidation = email => {
  email = email.trim();
  const emailRegex = /@iitrpr\.ac\.in$/;
  return emailRegex.test(email);
};

const handleNameValidation = name => {
  // Trim leading and trailing spaces from the name
  name = name.trim();

  const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
  return nameRegex.test(name);
};

const Super_User_Add_User = ({route}) => {
  const [name, setName] = useState(''); // Remove this line
  const [email, setEmail] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('sde');
  const [isLoading, setIsLoading] = useState(false);
  const email1 = route.params.email;
  const cycle = route.params.cycle;
  const navigation = useNavigation();

  const handleAddUser = async () => {
    try {
      setIsLoading(true);
      // Validation: Check if the email is not empty
      const isValidName = handleNameValidation(name);
      if (!isValidName) {
        Alert.alert('Invalid Name', 'Please enter a valid name.');
        setIsLoading(false);
        return;
      }
      const isValidEmail = handleEmailValidation(email);

      if (!isValidEmail) {
        Alert.alert(
          'Invalid Email',
          'Please enter a valid IIT Ropar email address.',
        );
        setIsLoading(false);
        return;
      }

      let t = {
        name: name,
        email: email,
        position: 'Representative',
        department: selectedDepartment,
        cycle_id: cycle.cycle_id,
      };
      let response = await fetchAPI(
        `${BASE_URL}/superuser/adduser`,
        t,
        'POST',
        false,
      );

      console.log('API Response:', response);

      if (response.result.isUserAlreadyAdded) {
        Alert.alert('Alert', 'User Already exists');
      } else {
        console.log(
          'Adding user with email:',
          email,
          'and Department:',
          selectedDepartment,
        );
          
        try{
        let t = {
          sender_email: email1,
          receiver_email: email,
          message: 'You have been added as a Student Representative.',
        };
        let response = await fetchAPI(
          `${BASE_URL}/notification/superuser/user`,
          t,
          'POST',
          false,
        );
        console.log(response);
        if (response.ok) {
          console.log('Notification sent successfully');
        } else {
          console.log('Notification not sent');

        }
      } catch (error) {
        console.error('Error sending notification:', error);
        // Alert.alert('Error', 'Failed to send notification');
      }

        // Display success message
        Alert.alert('Success', 'Added successfully');
      }

      // Clear input fields
      setName('');
      setEmail('');
    
      setSelectedDepartment('sde');
    } catch (error) {
      console.error('Error:', error);
      // Handle error if needed
      Alert.alert('Error', 'Failed to add user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name :</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
        placeholder="Enter Name"
        placeholderTextColor="#aaa" // Placeholder color
      />

      <Text style={styles.label}>Email :</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="Enter email"
        keyboardType="email-address"
        placeholderTextColor="#aaa" // Placeholder color
      />

      {/* <Text style={styles.label}>Select Position:</Text>
      <Picker
        selectedValue={selectedPosition}
        onValueChange={itemValue => setSelectedPosition(itemValue)}
        style={styles.picker}
        itemStyle={{color: '#fff'}}>
        <Picker.Item label="HPC" value="hpc" />
        <Picker.Item label="APC" value="apc" />
        <Picker.Item label="DPC" value="dpc" />
        <Picker.Item label="IC" value="ic" />
        <Picker.Item label="DIC" value="dic" />
        <Picker.Item label="Representative" value="representative" />
      </Picker> */}

      <Text style={styles.label}>Select Department :</Text>
      <Picker
        selectedValue={selectedDepartment}
        onValueChange={itemValue => setSelectedDepartment(itemValue)}
        style={styles.picker}
        itemStyle={{color: '#fff'}}>
    
        <Picker.Item label="SDE" value="SDE" />
        <Picker.Item label="Non-Core" value="Non-Core" />
        <Picker.Item label="Electrical" value="Electrical" />
        <Picker.Item label="Mechanical" value="Mechanical" />
        <Picker.Item label="Chemical" value="Chemical" />
        <Picker.Item label="Civil" value="Civil" />
        <Picker.Item label="Metallurgy" value="Metallurgy" />
      </Picker>

      <TouchableOpacity
        style={styles.button}
        onPress={handleAddUser}
        disabled={isLoading}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>

      {isLoading && <LoadingScreen />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#202020', // Background color
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#fff', // Text color
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#fff', // Border color
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    color: '#fff', // Text color
  },
  picker: {
    width: '80%',
    height: 40,
    marginTop: -8,
    marginBottom: 10,
    color: '#fff',
    backgroundColor: '#202020',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2ecc71',
  },
  button: {
    backgroundColor: '#128C7E', // Button color
    padding: 15,
    borderRadius: 20,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Super_User_Add_User;

# Super User Assign Companies Component

This component allows super users to assign companies to SPOCs (Single Point of Contacts) in a React Native application.

## Description

The `Super_User_Assign_Companies` component fetches companies and SPOCs from the server and allows the user to assign selected companies to a chosen SPOC. It includes features such as sorting, searching, and modal interactions for assigning companies.

## Prerequisites

- Node.js and npm installed
- React Native development environment set up
- API server running with endpoints for fetching companies and SPOCs

## Installation

1. Clone the repository or download the component file.
2. Navigate to the project directory in your terminal.
3. Install dependencies using `npm install`.

## Usage

1. Import the `Super_User_Assign_Companies` component in your React Native application.
2. Include the component in your application's navigation or screens as needed.

```javascript
import Super_User_Assign_Companies from './path/to/Super_User_Assign_Companies';



# Super User Edit Profile Component

This component allows super users to edit their profile information, including name and phone number.

## Usage

1. Install necessary dependencies:
   ```bash
   npm install @react-navigation/native
   npm install axios

   ```

# Super_User_Edit_Super_User Component Documentation

## Description
This component is used for editing Super User details including name, position, and department. It allows users to update Super User information and delete Super Users.

## Dependencies
- React Native
- @react-native-picker/picker
- FetchAPI
- LoadingScreen Component

## Props
- `route`: React Navigation route object containing parameters like `email`, `user_email`, and `cycle`.
- `navigation`: React Navigation navigation prop for navigation actions.

## State
- `loading`: Boolean state to manage loading screen visibility.
- `editedUser`: Object state containing edited user details (`name`, `position`, `department`).

## Functions
- `fetchUserDetails`: Fetches Super User details from the API.
- `handleNameChange`: Updates the `name` in `editedUser` state.
- `handlePositionChange`: Updates the `position` in `editedUser` state.
- `handleDepartmentChange`: Updates the `department` in `editedUser` state.
- `handleSubmit`: Submits edited Super User details to the API for updating.
- `handleDeleteUser`: Handles the deletion of the Super User.

## Usage
1. Import the necessary dependencies and components.
2. Define the component `Super_User_Edit_Super_User` with props `route` and `navigation`.
3. Initialize state variables `loading` and `editedUser`.
4. Implement functions to fetch user details, handle input changes, submit changes, and delete the user.
5. Render UI components including input fields for name, position, department, and buttons for submission and deletion.

## Code Snippet
```jsx
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import fetchAPI from '../../Tools/FetchAPI';
import {Picker} from '@react-native-picker/picker';
import {BASE_URL} from '../../api';
import LoadingScreen from '../Common/LoadingScreen';

const Super_User_Edit_Super_User = ({route, navigation}) => {
  // State
  const {email, user_email, cycle} = route.params;
  const [loading, setLoading] = useState(true);
  const [editedUser, setEditedUser] = useState({
    name: '',
    position: '',
    department: '',
  });

  // useEffect to fetch user details on component mount
  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Function to fetch user details
  const fetchUserDetails = async () => {
    try {
      let t = {email: user_email, cycle_id: cycle.cycle_id};
      let response = await fetchAPI(
        `${BASE_URL}/superuser/profile`,
        t,
        'POST',
        false,
      );
      if (response.ok) {
        const {name, position, department} = response.data;
        setEditedUser({name: name, position: 'Select', department: 'Select'});
      } else {
        Alert.alert('Error', 'Failed to fetch Super User details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      Alert.alert('Error', 'Failed to fetch Super User details');
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleNameChange = text => {
    setEditedUser({...editedUser, name: text});
  };
  const handlePositionChange = text => {
    setEditedUser({...editedUser, position: text});
  };
  const handleDepartmentChange = text => {
    setEditedUser({...editedUser, department: text});
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);

    // Validation
    if (editedUser.name.trim() === '') {
      Alert.alert('Alert', 'Please enter a name');
      setLoading(false);
      return;
    }
    if (editedUser.position === 'Select') {
      Alert.alert('Alert', 'Please select a position');
      setLoading(false);
      return;
    }
    if (editedUser.department === 'Select') {
      Alert.alert('Alert', 'Please select a department');
      setLoading(false);
      return;
    }

    // Submit edited user details
    try {
      let t = {
        email: user_email,
        name: editedUser.name,
        position: editedUser.position,
        department: editedUser.department,
        cycle_id: cycle.cycle_id,
      };
      let response = await fetchAPI(
        `${BASE_URL}/superuser/edituser`,
        t,
        'POST',
        false,
      );
      if (response.ok) {
        Alert.alert('Success', 'Super User edited successfully');
        navigation.goBack();
      } else {
        Alert.alert('Alert', response.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to edit Super User');
    } finally {
      setLoading(false);
    }

    // Send notification
    try {
      let t = {
        sender_email: email,
        receiver_email: user_email,
        message: `Your name and department has been changed by the superuser. Now you are ${editedUser.name} of ${editedUser.department} department`,
      };
      let response = await fetchAPI(
        `${BASE_URL}/notification/superuser/user`,
        t,
        'POST',
        false,
      );
      if (response.ok) {
        console.log('Notification sent successfully');
      } else {
        console.log('Notification not sent');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  // Handle user deletion
  const handleDeleteUser = () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to delete this Super User?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => setLoading(false),
        },
        {
          text: 'Delete',
          onPress: async () => {
            setLoading(true);
            try {
              let t = {email: user_email, cycle_id: cycle.cycle_id};
              let response1 = await fetchAPI(
                `${BASE_URL}/user/superuser`,
                t,
                'POST',
                false,
              );
              response1 = response1.data[0].user_id;
              t = {user_id: response1, cycle_id: cycle.cycle_id};
              let response = await fetchAPI(
                `${BASE_URL}/superuser/deletesuperuser`,
                t,
                'POST',
                false,
              );
              console.log(response);
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting Super User:', error);
              Alert.alert('Error', 'Failed to delete Super User');
            } finally {
              setLoading(false);
            }
          },
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  // Render UI
  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {/* Input fields */}
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={editedUser.name}
            onChangeText={text => handleNameChange(text)}
            placeholder="Enter name"
            placeholderTextColor="#aaa"
          />
          <Text style={styles.label}>Select Position :</Text>
          <Picker
            selectedValue={editedUser.position}
            onValueChange={itemValue => handlePositionChange(itemValue)}
            style={styles.picker}
            itemStyle={{color: '#fff'}}>
            {/* Picker items */}
          </Picker>
          <Text style={styles.label}>Select Department:</Text>
          {/* Department Picker based on position */}
          {/* Submit and delete buttons */}
        </>
      )}
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  // Styles for various UI components
});

export default Super_User_Edit_Super_User;
```


# Super_User_Edit_User Component

This component allows a super user to edit user details including name and department. It provides options to save changes or delete the user.

## Usage

1. Install dependencies:
   ```bash
   npm install @react-native-picker/picker


# Super_User_Home_Page Component Documentation

The `Super_User_Home_Page` component is designed for the home page of the super user in your React Native application. It includes various functionalities and UI elements for managing companies, users, notifications, and more.

## Component Overview

The `Super_User_Home_Page` component consists of the following sections:

1. Header
2. Greeting Message
3. Add Section (if previous cycle)
4. View Section
5. Companies Section (if previous cycle)
6. Manage Section

## Component Structure

### Header

The header contains icons for notifications, messages, and user profile. It provides quick access to essential functionalities.

### Greeting Message

Displays a personalized greeting message for the super user, welcoming them by their name.

### Add Section

This section allows the super user to add companies, student representatives, and other super users if it's the previous cycle.

### View Section

Provides options to view companies, student representatives, super users, assigned companies, and emails.

### Companies Section

Available only in the previous cycle, this section allows the super user to assign or reassign companies.

### Manage Section

Offers management options for the placement cycle.

## Functionality Highlights

- Dynamically determines the current cycle based on the current date.
- Fetches the super user's name and displays a personalized greeting.
- Handles navigation to various screens based on user interactions.
- Includes hardware back press handling to confirm app exit.
- Utilizes React Navigation for navigation between screens.

## Code Structure

The component is structured using functional components and React hooks like `useState`, `useEffect`, `useNavigation`, `useFocusEffect`, and `useRoute`. It fetches data from APIs using `fetchAPI` and `BASE_URL` constants.

## Styling

The component is styled using StyleSheet from React Native, including custom styles for containers, headers, icons, images, and text elements. Colors, margins, padding, and border radius are used for visual aesthetics.

## Usage

To use the `Super_User_Home_Page` component:

1. Import it into your React Native project.
2. Ensure proper navigation setup using React Navigation.
3. Pass required props like email and cycle to the component.

```javascript
import Super_User_Home_Page from './path/to/Super_User_Home_Page';

// Inside your screen/component render method
<Super_User_Home_Page email="user@example.com" cycle={1} />
```
# Super_User_Login Component

The `Super_User_Login` component is designed for the login screen of super users in your React Native application.

## Overview

This component allows super users to log in using their email addresses. It performs email validation for IIT Ropar email domains (@iitrpr.ac.in) and navigates to the OTP verification screen upon successful validation.

## Functionality

- Validates email addresses using a regular expression for IIT Ropar domain.
- Retrieves the current cycle number based on the current date for backend interaction.
- Sends a login request to the backend API and handles responses accordingly.
- Navigates to the OTP screen if the user is a valid super user; otherwise, displays an error alert.

## Usage

1. Import the `Super_User_Login` component into your React Native project.
2. Ensure proper navigation setup using React Navigation.
3. Integrate the component within your navigation stack to serve as a login screen for super users.

```javascript
import Super_User_Login from './path/to/Super_User_Login';

// Inside your navigation stack
<Stack.Navigator>
  <Stack.Screen name="Super_User_Login" component={Super_User_Login} />
  {/* Other screens */}
</Stack.Navigator>

```

# Super_User_Notifications Component

The `Super_User_Notifications` component is designed to display notifications for super users in your React Native application.

## Overview

This component fetches notifications from the backend API and displays them in a grouped and sorted format based on their creation date. Notifications are grouped by date, and each group shows notifications with the same date.

## Functionality

- Fetches notifications for the logged-in super user from the backend API.
- Groups notifications by date to display them in a sorted order.
- Provides a user-friendly interface to view notifications with sender information and message content.

## Usage

1. Import the `Super_User_Notifications` component into your React Native project.
2. Ensure proper navigation setup using React Navigation.
3. Integrate the component within your navigation stack to serve as a notifications screen for super users.

```javascript
import Super_User_Notifications from './path/to/Super_User_Notifications';

// Inside your navigation stack
<Stack.Navigator>
  <Stack.Screen name="Super_User_Notifications" component={Super_User_Notifications} />
  {/* Other screens */}
</Stack.Navigator>
```

# Super_User_OTP Component

The `Super_User_OTP` component handles OTP verification for super users in your React Native application.

## Overview

This component is responsible for verifying the OTP sent to the user's email address and allowing access to the super user's home page upon successful verification. It includes functionalities for generating OTP, sending OTP to the user's email, verifying OTP input, and handling OTP expiration.

## Functionality

- Generates a random OTP and sends it to the user's email address.
- Handles OTP verification and expiration.
- Allows users to resend OTP if needed.

## Usage

1. Import the `Super_User_OTP` component into your React Native project.
2. Ensure proper navigation setup using React Navigation.
3. Integrate the component within your navigation stack for OTP verification.

```javascript
import Super_User_OTP from './path/to/Super_User_OTP';

// Inside your navigation stack
<Stack.Navigator>
  <Stack.Screen name="Super_User_OTP" component={Super_User_OTP} />
  {/* Other screens */}
</Stack.Navigator>
```

# Super_User_Placement_Cycle Component

The `Super_User_Placement_Cycle` component allows super users to select or create placement cycles in your React Native application.

## Overview

This component provides functionality for super users to manage placement cycles, including selecting an existing cycle or creating a new one. It fetches cycle data from the API and handles user interactions for cycle selection and creation.

## Usage

1. Import the `Super_User_Placement_Cycle` component into your React Native project.
2. Ensure proper navigation setup using React Navigation.
3. Integrate the component within your navigation stack for managing placement cycles.

```javascript
import Super_User_Placement_Cycle from './path/to/Super_User_Placement_Cycle';

// Inside your navigation stack
<Stack.Navigator>
  <Stack.Screen name="Super_User_Placement_Cycle" component={Super_User_Placement_Cycle} />
  {/* Other screens */}
</Stack.Navigator>
```

# Super User Profile Component

The Super User Profile component is designed for managing user profiles in a React Native mobile application. It allows super users to view their profile details, edit their profile, and logout from the application.

## Installation

Ensure you have React Native set up in your project before using this component.

## Usage

1. Import the `Super_User_Profile` component into your React Native project.
2. Render the component within your navigation stack, passing the necessary props such as `route` with user data.

```jsx
import React from 'react';
import { View } from 'react-native';
import Super_User_Profile from './path/to/Super_User_Profile';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Other components and navigation setup */}
      <Super_User_Profile route={/* pass route with user data */} />
    </View>
  );
};

export default App;
```

# Super User Reassign Companies Component

The Super User Reassign Companies component is a React Native screen that allows super users to reassign companies to SPOCs (Single Points of Contact) within a mobile application.

## Features

- View a list of companies assigned to SPOCs
- Search for companies by name
- Sort companies alphabetically (A-Z or Z-A)
- Reassign a company to a selected SPOC

## Installation

Ensure you have React Native and the necessary dependencies set up in your development environment. Then, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies by running:
   ```bash
   npm install

   ```
# Super_User_View_Companies Component

## Overview
This component is used in your React Native application to display a list of companies for a super user. It includes features such as searching for companies, sorting them, viewing details, editing company information, and navigating to related screens.

## Features
- Display a list of companies
- Search companies by name
- Sort companies alphabetically
- View company details and HR details
- Edit company information and status
- Navigate to related screens for updates and PDF viewing

## Installation
No specific installation steps are required for this component as it's part of your React Native application.

## Usage
1. Ensure you have the necessary navigation dependencies installed (`@react-navigation/native` and others used in this component).
2. Import the `Super_User_View_Companies` component into your desired screen.
3. Pass the required props such as `email` and `cycle` to the component.
4. Render the component within your screen's JSX.

## Props
- `route.params.email`: Email of the super user.
- `route.params.cycle`: Cycle information.

## Dependencies
- React Native
- @react-navigation/native
- FetchAPI
- DataSecurity
- LoadingScreen (imported from another component)

## How to Run
Ensure your React Native environment is set up and all necessary dependencies are installed. Then, run your React Native application using the appropriate command for your development environment (e.g., `npm start` or `yarn android`).

## Additional Notes
- Make sure to handle any API endpoints (`BASE_URL` and others) and encryption/decryption keys (`secretKey`) as per your application's setup.
- Customize styles and UI elements as needed to match your application's design.

# Super_User_View_Emails Component

The `Super_User_View_Emails` component is designed for viewing emails related to assigned companies in your application.

## Description

This component fetches and displays emails associated with companies in a user-friendly interface, allowing easy navigation and interaction with HR details.

## Installation

No specific installation steps are required for this component as it is a part of your existing React Native application.

## Usage

To use this component:

1. Make sure you have set up navigation using React Navigation in your application.

2. Import the `Super_User_View_Emails` component into your desired screen or component.

3. Render the `Super_User_View_Emails` component within your screen or component.

4. Ensure proper props are passed as required by the component.

## Props

The `Super_User_View_Emails` component accepts the following props:

- `route`: Object containing route parameters required for component functionality.

## Example Usage

```jsx
import React from 'react';
import { View } from 'react-native';
import Super_User_View_Emails from './path/to/Super_User_View_Emails';

const YourScreen = ({ route }) => {
  return (
    <View>
      <Super_User_View_Emails route={route} />
    </View>
  );
};

export default YourScreen;
```


# Super_User_View_Pdf Component

This component renders JSON data in a structured format.

## Usage

### Installation

Ensure you have React Native installed in your project.

```bash
npm install react-native --save
```

# Super User View Super Users Component

This component displays a list of super users and allows users to view details, edit super users, and view assigned companies.

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.

## Usage

```javascript
import Super_User_View_Super_Users from './path/to/Super_User_View_Super_Users';

// Inside your component
<Super_User_View_Super_Users route={route} />
```





# Backend


# CheckUser Function Documentation

The `CheckUser` function is an asynchronous function that checks if a user with a given email and cycle ID exists in the database and is not a "Representative".

## Parameters

- `email`: Email of the user to check
- `cycle_id`: Cycle ID for the user

## Functionality

1. Constructs a SQL query to select user data based on the email, excluding users with the position "Representative" for a specific cycle.
2. Executes the SQL query using `DB.runQuery` and awaits the result.
3. Checks if the query execution had any errors. If not, returns an object with user data (if found).
4. If an error occurs during query execution, returns an error object.

## Usage

```javascript
const CheckUser = async (email, cycle_id) => {
  let query = `select * from users where email='${email}' and position != 'Representative' and cycle_id=${cycle_id}`;
  let result = await DB.runQuery(query);

  if (!result.error) {
    return {
      error: false,
      data: result.result[0],
    };
  }

  return {
    error: true,
  };
};
```

# Superuser Login Endpoint Documentation

This endpoint handles the login process for superusers.

## Endpoint

```
POST /superuser/login
```

## Request Body

- `email`: Superuser email
- `cycle_id`: Cycle ID for authentication

## Response

- `ok`: Boolean indicating success or failure
- `isUserPresent`: Boolean indicating if the user is present
- `userData`: Superuser data if present

## Functionality

1. Extracts email and cycle ID from the request body.
2. Calls the `CheckUser` function to check if the user exists.
3. If the user is present, responds with a success message along with user data.
4. If the user is not present or an error occurs, responds with a failure message.

## Usage

```javascript
router.post("/superuser/login", async (req, resp) => {
  let email = req.body.email;
  let cycle_id = req.body.cycle_id;
  let result = await CheckUser(email, cycle_id);

  if (result.error) {
    resp.send({
      ok: false,
    });
  } else {
    if (result.data == undefined) {
      resp.send({
        ok: true,
        isUserPresent: false,
      });
    } else {
      resp.send({
        ok: true,
        isUserPresent: true,
        userData: result.data,
      });
    }
  }
});
```


# Documentation: Deleting User Endpoint

## Description
This endpoint is responsible for deleting a user from the system. It performs two main actions:
1. Sets the `user_id` field to NULL in the `companies` table where the user is associated.
2. Deletes the user from the `users` table.

## Endpoint
`POST /superuser/deleteuser`

## Request Body Parameters
- `user_id`: The unique identifier of the user to be deleted.
- `cycle_id`: The identifier of the cycle associated with the user.

## Response
The endpoint responds with a JSON object containing the following fields:
- `ok`: A boolean indicating whether the operation was successful.
- `result`: Information about the operation result.

### Successful Response Example
```json
{
  "ok": true,
  "result": "<result_info>"
}
```

### Error Response Example
```json
{
  "ok": false
}
```

## Error Handling
If an error occurs during the deletion process, the endpoint returns a `500 Internal Server Error` status code along with an error message in the response body.

## Example Usage
```javascript
fetch('/superuser/deleteuser', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "user_id": "<user_id>",
    "cycle_id": "<cycle_id>"
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

```markdown
# Documentation: Deleting Superuser Endpoint

## Description
This endpoint is responsible for deleting a superuser from the system. It performs two main actions:
1. Sets the `user_id` field to NULL in the `companies` table where the superuser is associated.
2. Deletes the superuser from the `users` table.

## Endpoint
`POST /superuser/deletesuperuser`

## Request Body Parameters
- `user_id`: The unique identifier of the superuser to be deleted.
- `cycle_id`: The identifier of the cycle associated with the superuser.

## Response
The endpoint responds with a JSON object containing the following fields:
- `ok`: A boolean indicating whether the operation was successful.
- `result`: Information about the operation result.

### Successful Response Example
```json
{
  "ok": true,
  "result": "<result_info>"
}
```

### Error Response Example
```json
{
  "ok": false
}
```

## Error Handling
If an error occurs during the deletion process, the endpoint returns a `500 Internal Server Error` status code along with an error message in the response body.

## Example Usage
```javascript
fetch('/superuser/deletesuperuser', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "user_id": "<user_id>",
    "cycle_id": "<cycle_id>"
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## Security Considerations
Ensure that proper authentication and authorization mechanisms are in place to restrict access to this endpoint only to authorized superusers.

## Dependencies
This endpoint relies on a database connection (`DB`) for executing SQL queries.

```

```markdown
# Documentation: Fetching All Superusers Endpoint

## Description
This endpoint is responsible for retrieving all superusers from the system based on the provided cycle ID. It excludes users with the position 'Representative'.

## Endpoint
`POST /superuser/all`

## Request Body Parameters
- `cycle_id`: The identifier of the cycle for which superusers are being fetched.

## Response
The endpoint responds with a JSON object containing the following fields:
- `ok`: A boolean indicating whether the operation was successful.
- `data`: An array containing information about the fetched superusers.

### Successful Response Example
```json
{
  "ok": true,
  "data": [
    {
      "user_id": "<user_id>",
      "username": "<username>",
      "position": "<position>",
      // other user fields
    },
    // additional superusers
  ]
}
```

### Error Response Example
```json
{
  "ok": false
}
```

## Error Handling
If an error occurs during the fetching process, the endpoint returns a `500 Internal Server Error` status code along with an error message in the response body.

## Example Usage
```javascript
fetch('/superuser/all', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "cycle_id": "<cycle_id>"
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## Security Considerations
Ensure that proper authentication and authorization mechanisms are in place to restrict access to this endpoint only to authorized superusers.

## Dependencies
This endpoint relies on a database connection (`DB`) for executing SQL queries.

```

```markdown
# Documentation: Adding User Endpoint

## Description
This endpoint is responsible for adding a new user to the system with the provided details.

## Endpoint
`POST /superuser/adduser`

## Request Body Parameters
- `name`: The name of the user.
- `email`: The email address of the user.
- `position`: The position of the user.
- `department`: The department to which the user belongs.
- `cycle_id`: The identifier of the cycle to which the user is being added.

## Response
The endpoint responds with a JSON object containing the following fields:
- `ok`: A boolean indicating whether the operation was successful.
- `result`: Information about the operation result.

### Successful Response Example
```json
{
  "ok": true,
  "result": "<result_info>"
}
```

### Error Response Example
```json
{
  "ok": false
}
```

## Error Handling
If an error occurs during the user addition process, the endpoint returns a `500 Internal Server Error` status code along with an error message in the response body.

## Example Usage
```javascript
fetch('/superuser/adduser', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "name": "<user_name>",
    "email": "<user_email>",
    "position": "<user_position>",
    "department": "<user_department>",
    "cycle_id": "<cycle_id>"
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## Security Considerations
Ensure that proper authentication and authorization mechanisms are in place to restrict access to this endpoint only to authorized superusers.

## Dependencies
This endpoint relies on an `addUser` function to add the user to the system.

```


```markdown
# Documentation: Superuser Profile Endpoint

## Description
This endpoint is responsible for retrieving the profile of a superuser based on the provided email and cycle ID.

## Endpoint
`POST /superuser/profile`

## Request Body Parameters
- `email`: The email address of the superuser.
- `cycle_id`: The identifier of the cycle associated with the superuser.

## Response
The endpoint responds with a JSON object containing the following fields:
- `ok`: A boolean indicating whether the operation was successful.
- `data`: Information about the superuser's profile.

### Successful Response Example
```json
{
  "ok": true,
  "data": {
    "user_id": "<user_id>",
    "name": "<user_name>",
    "email": "<user_email>",
    "position": "<user_position>",
    "department": "<user_department>",
    // other user profile fields
  }
}
```

### Error Response Example
```json
{
  "ok": false
}
```

## Error Handling
If an error occurs during the profile retrieval process, the endpoint returns a `500 Internal Server Error` status code along with an error message in the response body.

## Example Usage
```javascript
fetch('/superuser/profile', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "email": "<user_email>",
    "cycle_id": "<cycle_id>"
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## Security Considerations
Ensure that proper authentication and authorization mechanisms are in place to restrict access to this endpoint only to authorized superusers.

## Dependencies
This endpoint relies on a `CheckUser` function to retrieve the superuser's profile.

```
```markdown
# Documentation: Adding Superuser Endpoint

## Description
This endpoint is responsible for adding a new superuser to the system with the provided details. It performs additional checks to prevent duplicate entries and ensure unique position and department combinations for a given cycle.

## Endpoint
`POST /superuser/addsuperuser`

## Request Body Parameters
- `email`: The email address of the superuser.
- `name`: The name of the superuser.
- `department`: The department to which the superuser belongs.
- `position`: The position of the superuser.
- `cycle_id`: The identifier of the cycle to which the superuser is being added.

## Response
The endpoint responds with a JSON object containing the following fields:
- `ok`: A boolean indicating whether the operation was successful.
- `result`: Information about the operation result.

### Successful Response Example
```json
{
  "ok": true,
  "result": {
    "isUserAlreadyAdded": false,
    "isUserAdded": true,
    "isDuplicatePositionDepartment": false
  }
}
```

### Error Response Example
```json
{
  "ok": false
}
```

## Error Handling
If an error occurs during the superuser addition process, the endpoint returns a `500 Internal Server Error` status code along with an error message in the response body.

## Example Usage
```javascript
fetch('/superuser/addsuperuser', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "email": "<superuser_email>",
    "name": "<superuser_name>",
    "department": "<superuser_department>",
    "position": "<superuser_position>",
    "cycle_id": "<cycle_id>"
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## Security Considerations
Ensure that proper authentication and authorization mechanisms are in place to restrict access to this endpoint only to authorized superusers.

## Dependencies
This endpoint relies on the `addSuperUser` function to add the superuser to the system.

---

# Documentation: Editing Superuser Profile Endpoint

## Description
This endpoint is responsible for editing the profile of a superuser in the system.

## Endpoint
`POST /superuser/editprofile`

## Request Body Parameters
- `email`: The email address of the superuser.
- `name`: The new name of the superuser.
- `phone`: The new phone number of the superuser.
- `cycle_id`: The identifier of the cycle associated with the superuser.

## Response
The endpoint responds with a JSON object containing the following fields:
- `ok`: A boolean indicating whether the operation was successful.
- `result`: Information about the operation result.

### Successful Response Example
```json
{
  "ok": true,
  "result": "<result_info>"
}
```

### Error Response Example
```json
{
  "ok": false
}
```

## Error Handling
If an error occurs during the profile editing process, the endpoint returns a `500 Internal Server Error` status code along with an error message in the response body.

## Example Usage
```javascript
fetch('/superuser/editprofile', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "email": "<superuser_email>",
    "name": "<new_name>",
    "phone": "<new_phone>",
    "cycle_id": "<cycle_id>"
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## Security Considerations
Ensure that proper authentication and authorization mechanisms are in place to restrict access to this endpoint only to authorized superusers.

## Dependencies
This endpoint relies on the `editSuperUserProfile` function to update the superuser's profile.
```
```markdown
# Documentation: Adding Company Endpoint

## Description
This endpoint is responsible for adding a new company to the system with the provided details.

## Endpoint
`POST /superuser/addcompany`

## Request Body Parameters
- `name`: The name of the company.
- `details`: An array of HR details associated with the company.
- `updates`: Updates about the company.
- `company_details`: Details about the company.
- `cycle_id`: The identifier of the cycle to which the company is being added.

## Response
The endpoint responds with a JSON object containing the following fields:
- `ok`: A boolean indicating whether the operation was successful.
- `message`: Information about the operation result.

### Successful Response Example
```json
{
  "ok": true,
  "message": "Company added successfully"
}
```

### Error Response Example
```json
{
  "ok": false,
  "message": "<error_message>"
}
```

## Error Handling
If an error occurs during the company addition process, the endpoint returns a `500 Internal Server Error` status code along with an error message in the response body.

## Example Usage
```javascript
fetch('/superuser/addcompany', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "name": "<company_name>",
    "details": [<hr_details_array>],
    "updates": "<company_updates>",
    "company_details": "<company_details>",
    "cycle_id": "<cycle_id>"
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## Security Considerations
Ensure that proper authentication and authorization mechanisms are in place to restrict access to this endpoint only to authorized superusers.

---

# Documentation: Fetching All Companies Endpoint

## Description
This endpoint is responsible for retrieving all companies associated with a specific cycle.

## Endpoint
`POST /company/all`

## Request Body Parameters
- `cycle_id`: The identifier of the cycle for which companies are being fetched.

## Response
The endpoint responds with a JSON object containing the following fields:
- `ok`: A boolean indicating whether the operation was successful.
- `data`: An array containing information about the fetched companies.

### Successful Response Example
```json
{
  "ok": true,
  "data": [
    {
      "company_id": "<company_id>",
      "name": "<company_name>",
      "details": "<company_details>",
      "updates": "<company_updates>",
      "status": "<company_status>",
      // other company fields
    },
    // additional companies
  ]
}
```

### Error Response Example
```json
{
  "ok": false
}
```

## Error Handling
If an error occurs during the fetching process, the endpoint returns a `500 Internal Server Error` status code along with an error message in the response body.

## Example Usage
```javascript
fetch('/company/all', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "cycle_id": "<cycle_id>"
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## Security Considerations
Ensure that proper authentication and authorization mechanisms are in place to restrict access to this endpoint only to authorized users.

---

# Documentation: Editing Company Endpoint

## Description
This endpoint is responsible for editing the details of a company in the system.

## Endpoint
`POST /company/edit`

## Request Body Parameters
- `company_id`: The identifier of the company.
- `name`: The new name of the company.
- `details`: The new details of the company.
- `updates`: The new updates about the company.
- `company_details`: The new details about the company.
- `cycle_id`: The identifier of the cycle associated with the company.
- `jaf`: The new JAF of the company.
- `inf`: The new INF of the company.

## Response
The endpoint responds with a JSON object containing the following fields:
- `ok`: A boolean indicating whether the operation was successful.
- `message`: Information about the operation result.

### Successful Response Example
```json
{
  "ok": true,
  "message": "Company updated successfully"
}
```

### Error Response Example
```json
{
  "ok": false,
  "message": "<error_message>"
}
```

## Error Handling
If an error occurs during the company editing process, the endpoint returns a `500 Internal Server Error` status code along with an error message in the response body.

## Example Usage
```javascript
fetch('/company/edit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "company_id": "<company_id>",
    "name": "<new_company_name>",
    "details": "<new_company_details>",
    "updates": "<new_company_updates>",
    "company_details": "<new_company_details>",
    "cycle_id": "<cycle_id>",
    "jaf": "<new_jaf>",
    "inf": "<new_inf>"
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## Security Considerations
Ensure that proper authentication and authorization mechanisms are in place to restrict access to this endpoint only to authorized users.

---

# Documentation: Editing Company Status Endpoint

## Description
This endpoint is responsible for editing the status of a company in the system.

## Endpoint
`POST /company/editstatus`

## Request Body Parameters
- `company_id`: The identifier of the company.
- `status`: The new status of the company.
- `updates`: The new updates about the company.
- `cycle_id`: The identifier of the cycle associated with the company.

## Response
The endpoint responds with a JSON object containing the following fields:
- `ok`: A boolean indicating whether the operation was successful.
- `message`: Information about the operation result.

### Successful Response Example
```json
{
  "ok": true,
  "message": "Company updated successfully"
}
```

### Error Response Example
```json
{
  "ok": false,
  "message": "<error_message>"
}
```

## Error Handling
If an error occurs during the company status editing process, the endpoint returns a `500 Internal Server Error` status code along with an error message in the response body.

## Example Usage
```javascript
fetch('/company/editstatus', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "company_id": "<company_id>",
    "status": "<new_company_status>",
    "updates": "<new_company_updates>",
    "cycle_id": "<cycle_id>"
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## Security Considerations
Ensure that proper authentication and authorization mechanisms are in place to restrict access to this endpoint only to authorized users.
```


```markdown
# Documentation: Deleting Company Endpoint

## Description
This endpoint is responsible for deleting a company from the system.

## Endpoint
`POST /company/delete`

## Request Body Parameters
- `company_id`: The identifier of the company to be deleted.
- `cycle_id`: The identifier of the cycle associated with the company.

## Response
The endpoint responds with a JSON object containing the following fields:
- `ok`: A boolean indicating whether the operation was successful.
- `message`: Information about the operation result.

### Successful Response Example
```json
{
  "ok": true,
  "message": "Company deleted successfully"
}
```

### Error Response Example
```json
{
  "ok": false,
  "message": "<error_message>"
}
```

## Error Handling
If an error occurs during the company deletion process, the endpoint returns a `500 Internal Server Error` status code along with an error message in the response body.

## Example Usage
```javascript
fetch('/company/delete', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "company_id": "<company_id>",
    "cycle_id": "<cycle_id>"
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## Security Considerations
Ensure that proper authentication and authorization mechanisms are in place to restrict access to this endpoint only to authorized users.

---

# Documentation: Fetching Companies to Assign Endpoint

## Description
This endpoint is responsible for retrieving companies that are not yet assigned to any user for a specific cycle.

## Endpoint
`POST /company/toassign`

## Request Body Parameters
- `cycle_id`: The identifier of the cycle for which unassigned companies are being fetched.

## Response
The endpoint responds with a JSON object containing the following fields:
- `ok`: A boolean indicating whether the operation was successful.
- `data`: An array containing information about the unassigned companies.

### Successful Response Example
```json
{
  "ok": true,
  "data": [
    {
      "company_id": "<company_id>",
      "name": "<company_name>",
      // other company fields
    },
    // additional unassigned companies
  ]
}
```

### Error Response Example
```json
{
  "ok": false
}
```

## Error Handling
If an error occurs during the fetching process, the endpoint returns a `500 Internal Server Error` status code along with an error message in the response body.

## Example Usage
```javascript
fetch('/company/toassign', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "cycle_id": "<cycle_id>"
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## Security Considerations
Ensure that proper authentication and authorization mechanisms are in place to restrict access to this endpoint only to authorized users.

---

# Documentation: Fetching Assigned Companies Endpoint

## Description
This endpoint is responsible for retrieving companies that are already assigned to users for a specific cycle.

## Endpoint
`POST /company/assigned`

## Request Body Parameters
- `cycle_id`: The identifier of the cycle for which assigned companies are being fetched.

## Response
The endpoint responds with a JSON object containing the following fields:
- `ok`: A boolean indicating whether the operation was successful.
- `data`: An array containing information about the assigned companies.

### Successful Response Example
```json
{
  "ok": true,
  "data": [
    {
      "company_id": "<company_id>",
      "name": "<company_name>",
      // other company fields
    },
    // additional assigned companies
  ]
}
```

### Error Response Example
```json
{
  "ok": false
}
```

## Error Handling
If an error occurs during the fetching process, the endpoint returns a `500 Internal Server Error` status code along with an error message in the response body.

## Example Usage
```javascript
fetch('/company/assigned', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "cycle_id": "<cycle_id>"
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## Security Considerations
Ensure that proper authentication and authorization mechanisms are in place to restrict access to this endpoint only to authorized users.

---

# Documentation: Assigning Company to SPOC Endpoint

## Description
This endpoint is responsible for assigning a company to a SPOC (Single Point of Contact) for a specific cycle.

## Endpoint
`POST /company/assigntospoc`

## Request Body Parameters
- `company_id`: The identifier of the company to be assigned.
- `user_id`: The identifier of the user (SPOC) to whom the company is being assigned.
- `cycle_id`: The identifier of the cycle for which the assignment is being made.

## Response
The endpoint responds with a JSON object containing the following fields:
- `ok`: A boolean indicating whether the operation was successful.
- `message`: Information about the operation result.

### Successful Response Example
```json
{
  "ok": true,
  "message": "Company assigned successfully"
}
```

### Error Response Example
```json
{
  "ok": false,
  "message": "<error_message>"
}
```

## Error Handling
If an error occurs during the assignment process, the endpoint returns a `500 Internal Server Error` status code along with an error message in the response body.

## Example Usage
```javascript
fetch('/company/assigntospoc', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "company_id": "<company_id>",
    "user_id": "<user_id>",
    "cycle_id": "<cycle_id>"
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

```




# Code Documentation

## Purpose
This code snippet appears to be part of a backend service, specifically for user authentication and authorization. It includes functions to check if a user exists in the database based on their email, position, and cycle ID, and a router post method to handle user login requests.

## Functions

### `CheckUser(email, cycle_id)`
- **Purpose:** Checks if a user with the provided email and cycle ID exists in the database and holds the position of "Representative".
- **Parameters:** 
  - `email` (string): The email of the user.
  - `cycle_id` (string): The cycle ID associated with the user.
- **Returns:** An object containing the error status and user data if found.

### `CheckUser1(email, cycle_id)`
- **Purpose:** Similar to `CheckUser`, but the SQL query construction is slightly different.
- **Parameters:** Same as `CheckUser`.
- **Returns:** An object containing the error status and user data if found.

### `CheckUser2(user_id, cycle_id)`
- **Purpose:** Checks if a user with the provided user ID and cycle ID exists in the database.
- **Parameters:** 
  - `user_id` (string): The unique ID of the user.
  - `cycle_id` (string): The cycle ID associated with the user.
- **Returns:** An object containing the error status and user data if found.

### `/user/login` POST Route
- **Purpose:** Handles user login requests.
- **Endpoint:** `/user/login`
- **Method:** POST
- **Request Body Parameters:**
  - `email` (string): The email of the user.
  - `cycle_id` (string): The cycle ID associated with the user.
- **Response:** 
  - If the user exists, returns an object with `ok: true`, `isUserPresent: true`, and the user data.
  - If the user doesn't exist, returns an object with `ok: true` and `isUserPresent: false`.
  - If an error occurs, returns an object with `ok: false`.

## Notes
- The code appears to use an asynchronous database querying method (`DB.runQuery`), suggesting it's part of a Node.js application using a database, possibly SQL-based.
- There are multiple functions for checking user existence based on different criteria (`CheckUser`, `CheckUser1`, `CheckUser2`), which might indicate variations in the database schema or requirements.
- The code doesn't handle potential SQL injection vulnerabilities. It's recommended to use parameterized queries or an ORM to mitigate this risk.
- Logging statements (`console.log`) are present for debugging purposes, which should ideally be removed or disabled in production.


# Additional Functions Documentation

## Purpose
These functions are used to interact with the Gmail API to perform actions such as downloading attachments, fetching message details, and listing messages from a specific sender.

## Functions

### `downloadAttachment(userId, messageId, attachmentId, attachmentName)`
- **Purpose:** Downloads an attachment from a specific Gmail message.
- **Parameters:**
  - `userId` (string): The user ID or 'me' to indicate the authenticated user.
  - `messageId` (string): The ID of the Gmail message containing the attachment.
  - `attachmentId` (string): The ID of the attachment to be downloaded.
  - `attachmentName` (string): The name to be given to the downloaded attachment file.
- **Returns:** None
- **Notes:**
  - Requires pre-authorized user credentials with appropriate permissions.
  - Writes the attachment data to a file using synchronous file write.

### `getMessage(userId, messageId)`
- **Purpose:** Fetches details of a specific Gmail message.
- **Parameters:**
  - `userId` (string): The user ID or 'me' to indicate the authenticated user.
  - `messageId` (string): The ID of the Gmail message to fetch.
- **Returns:** An object containing details of the specified message.
- **Notes:**
  - Requires pre-authorized user credentials with appropriate permissions.
  - Returns the entire message body in full format.

### `fetchMessageDetails(userId, messageIds)`
- **Purpose:** Fetches details of multiple Gmail messages.
- **Parameters:**
  - `userId` (string): The user ID or 'me' to indicate the authenticated user.
  - `messageIds` (array): An array of message IDs for which details are to be fetched.
- **Returns:** An array of objects containing details (subject, body, attachments) of each message.
- **Notes:**
  - Utilizes `getMessage` function to fetch details of individual messages.
  - Extracts subject, body, and attachments from each message.

### `listMessagesFromSender(userId, senderEmail)`
- **Purpose:** Lists Gmail messages received from a specific sender.
- **Parameters:**
  - `userId` (string): The user ID or 'me' to indicate the authenticated user.
  - `senderEmail` (string): The email address of the sender whose messages are to be listed.
- **Returns:** An array of message IDs received from the specified sender.
- **Notes:**
  - Requires pre-authorized user credentials with appropriate permissions.
  - Uses Gmail API's `messages.list` method with a query parameter to filter messages from the sender.

## Notes
- All functions require pre-authorized user credentials with appropriate permissions to access the Gmail API.
- Error handling is implemented using try-catch blocks to handle exceptions thrown during API requests.
- Logging statements (`console.log`) are present for debugging purposes, which should ideally be removed or disabled in production.

# Additional Router Endpoints and Functions Documentation

## Purpose
These router endpoints and functions handle various user-related operations such as fetching emails, sending PDF buffers, retrieving user profiles, and editing user profiles.

## Router Endpoints

### `/user/emails` POST Route
- **Purpose:** Fetches emails from a specific sender and returns their details.
- **Endpoint:** `/user/emails`
- **Method:** POST
- **Request Body Parameters:**
  - `email` (string): The email address of the sender.
- **Response:**
  - If successful, returns an object with `ok: true` and the fetched email details (`data`).
  - If an error occurs, returns an object with `ok: false`.

### `/file/buffer` POST Route
- **Purpose:** Sends a PDF buffer to a specific service (`sendPdfBufferToSelectPdf`) and returns the result.
- **Endpoint:** `/file/buffer`
- **Method:** POST
- **Request Body Parameters:**
  - `buffer` (string): The base64 encoded PDF buffer.
- **Response:**
  - If successful, returns an object with `ok: true` and the result of the service (`text`).
  - If an error occurs, returns an object with `ok: false`.

### `/user/profile` POST Route
- **Purpose:** Retrieves user profile based on email or user ID.
- **Endpoint:** `/user/profile`
- **Method:** POST
- **Request Body Parameters:**
  - `email` (string): The email address of the user.
  - `cycle_id` (string): The cycle ID associated with the user.
  - `user_id` (string): The unique ID of the user (if `email` is `"0"`).
- **Response:**
  - If successful, returns an object with `ok: true`, `isUserPresent` indicating if the user exists, and `userData` containing user details.
  - If an error occurs, returns an object with `ok: false`.

### `/user/editprofile` POST Route
- **Purpose:** Allows users to edit their profile details.
- **Endpoint:** `/user/editprofile`
- **Method:** POST
- **Request Body Parameters:**
  - `email` (string): The email address of the user.
  - `name` (string): The new name of the user.
  - `phone` (string): The new phone number of the user.
  - `cycle_id` (string): The cycle ID associated with the user.
- **Response:**
  - If successful, returns an object with `ok: true` and the result of the profile update operation.
  - If an error occurs, returns an object with `ok: false`.

## Functions

### `editUserProfile(email, newName, newPhone, cycle_id)`
- **Purpose:** Edits user profile details in the database.
- **Parameters:**
  - `email` (string): The email address of the user.
  - `newName` (string): The new name of the user.
  - `newPhone` (string): The new phone number of the user.
  - `cycle_id` (string): The cycle ID associated with the user.
- **Returns:** The result of the profile update operation.

## Notes
- These router endpoints and functions interact with external services (such as Gmail API and `sendPdfBufferToSelectPdf` service).
- Error handling is implemented using try-catch blocks to handle exceptions thrown during operations.
- Logging statements (`console.log`) are present for debugging purposes, which should ideally be removed or disabled in production.


# Additional Router Endpoints Documentation

## Purpose
These router endpoints handle various operations related to user management and company management.

## Router Endpoints

### `/user/addcompany` POST Route
- **Purpose:** Adds a new company to the database if it doesn't already exist.
- **Endpoint:** `/user/addcompany`
- **Method:** POST
- **Request Body Parameters:**
  - `name` (string): The name of the company.
  - `details` (string): Details of the company (assuming it's an array of HR details).
  - `updates` (string): Updates related to the company.
  - `company_details` (string): Additional details of the company.
  - `cycle_id` (string): The cycle ID associated with the company.
- **Response:**
  - If successful, returns an object with `ok: true` and a success message.
  - If the company name already exists, returns an object with `ok: false` and an appropriate message.
  - If an error occurs during the operation, returns an object with `ok: false`.

### `/user/all` POST Route
- **Purpose:** Fetches all users with the position 'Representative' for a specific cycle.
- **Endpoint:** `/user/all`
- **Method:** POST
- **Request Body Parameters:**
  - `cycle_id` (string): The cycle ID associated with the users.
- **Response:**
  - If successful, returns an object with `ok: true` and the data containing user details.
  - If an error occurs during the operation, returns an object with `ok: false`.

### `/user/superuser/all` POST Route
- **Purpose:** Fetches all users for a specific cycle.
- **Endpoint:** `/user/superuser/all`
- **Method:** POST
- **Request Body Parameters:**
  - `cycle_id` (string): The cycle ID associated with the users.
- **Response:**
  - If successful, returns an object with `ok: true` and the data containing user details.
  - If an error occurs during the operation, returns an object with `ok: false`.

### `/user/superuser` POST Route
- **Purpose:** Fetches a specific user's details for a specific cycle.
- **Endpoint:** `/user/superuser`
- **Method:** POST
- **Request Body Parameters:**
  - `cycle_id` (string): The cycle ID associated with the user.
  - `email` (string): The email address of the user.
- **Response:**
  - If successful, returns an object with `ok: true` and the data containing user details.
  - If an error occurs during the operation, returns an object with `ok: false`.

### `/user/assigned_company` POST Route
- **Purpose:** Fetches companies assigned to a specific user for a specific cycle.
- **Endpoint:** `/user/assigned_company`
- **Method:** POST
- **Request Body Parameters:**
  - `user_id` (string): The ID of the user.
  - `cycle_id` (string): The cycle ID associated with the user.
- **Response:**
  - If successful, returns an object with `ok: true` and the data containing assigned companies.
  - If an error occurs during the operation, returns an object with `ok: false`.

## Notes
- These router endpoints interact with the database to perform various user and company-related operations.
- Error handling is implemented using try-catch blocks to handle exceptions thrown during database queries.
- Logging statements (`console.error`) are present for debugging purposes, which should ideally be removed or disabled in production.


# Additional Router Endpoints Documentation

## Purpose
These router endpoints handle operations related to placement cycles, such as fetching existing cycles, creating new cycles, and selecting a specific cycle.

## Router Endpoints

### `/placement/cycles` POST Route
- **Purpose:** Fetches all placement cycles.
- **Endpoint:** `/placement/cycles`
- **Method:** POST
- **Request Body Parameters:** None
- **Response:**
  - If successful, returns an object with `ok: true` and the data containing placement cycles.
  - If an error occurs during the operation, returns an object with `ok: false`.

### `/placement/createcycle` POST Route
- **Purpose:** Creates a new placement cycle.
- **Endpoint:** `/placement/createcycle`
- **Method:** POST
- **Request Body Parameters:**
  - `cycle` (string): The name or identifier of the new placement cycle.
- **Response:**
  - If successful, returns an object with `ok: true` and the data containing the result of the operation.
  - If an error occurs during the operation, returns an object with `ok: false`.

### `/placement/selectcycle` POST Route
- **Purpose:** Selects a specific placement cycle.
- **Endpoint:** `/placement/selectcycle`
- **Method:** POST
- **Request Body Parameters:**
  - `cycle` (string): The name or identifier of the selected placement cycle.
- **Response:**
  - If successful, returns an object with `ok: true` and the data containing the selected placement cycle.
  - If the specified cycle does not exist, returns an object with `ok: false`.
  - If an error occurs during the operation, returns an object with `ok: false`.

## Notes
- These router endpoints interact with the database to perform operations related to placement cycles.
- Error handling is implemented using try-catch blocks to handle exceptions thrown during database queries.
- Logging statements (`console.error`) are present for debugging purposes, which should ideally be removed or disabled in production.




# Additional Router Endpoints Documentation

## Purpose
These router endpoints handle various operations related to messages, updates, user-company associations, sending messages, and notifications.

## Router Endpoints

### `/messages` POST Route
- **Purpose:** Fetches messages between two users.
- **Endpoint:** `/messages`
- **Method:** POST
- **Request Body Parameters:**
  - `sender_id` (string): The ID of the sender user.
  - `receiver_id` (string): The ID of the receiver user.
- **Response:**
  - If successful, returns an object with `ok: true` and the messages exchanged between the two users.
  - If an error occurs during the operation, returns an object with `ok: false`.

### `/company/updates` POST Route
- **Purpose:** Fetches updates related to a specific company and cycle.
- **Endpoint:** `/company/updates`
- **Method:** POST
- **Request Body Parameters:**
  - `company_id` (string): The ID of the company.
  - `cycle_id` (string): The ID of the cycle.
- **Response:**
  - If successful, returns an object with `ok: true` and the updates related to the specified company and cycle.
  - If an error occurs during the operation, returns an object with `ok: false`.

### `/company/addupdate` POST Route
- **Purpose:** Adds an update related to a specific company and cycle.
- **Endpoint:** `/company/addupdate`
- **Method:** POST
- **Request Body Parameters:**
  - `company_id` (string): The ID of the company.
  - `cycle_id` (string): The ID of the cycle.
  - `text` (string): The text of the update.
  - `user_id` (string): The ID of the user adding the update.
- **Response:**
  - If successful, returns an object with `ok: true` and a success message.
  - If an error occurs during the operation, returns an object with `ok: false`.

### `/company/user` POST Route
- **Purpose:** Fetches user data based on email and cycle ID.
- **Endpoint:** `/company/user`
- **Method:** POST
- **Request Body Parameters:**
  - `email` (string): The email of the user.
  - `cycle_id` (string): The ID of the cycle.
- **Response:**
  - If successful, returns an object with `ok: true` and the data containing user details.
  - If an error occurs during the operation, returns an object with `ok: false`.

### `/send/message` POST Route
- **Purpose:** Sends a message from one user to another.
- **Endpoint:** `/send/message`
- **Method:** POST
- **Request Body Parameters:**
  - `user_id` (string): The ID of the sending user.
  - `message` (string): The message text.
  - `receiver_id` (string): The ID of the receiving user.
  - `sent_at` (string): The timestamp when the message was sent.
- **Response:**
  - If successful, returns an object with `message: 'Message sent successfully'`.
  - If an error occurs during the operation, returns an object with `error: 'Error sending message'`.

### `/notification/superuser/user` POST Route
- **Purpose:** Sends a notification from a superuser to a user.
- **Endpoint:** `/notification/superuser/user`
- **Method:** POST
- **Request Body Parameters:**
  - `sender_email` (string): The email of the sender (superuser).
  - `receiver_email` (string): The email of the receiver (user).
  - `message` (string): The notification message.
- **Response:**
  - If successful, returns an object with `ok: true` and a success message.
  - If an error occurs during the operation, returns an object with `ok: false`.

### `/notification/user` POST Route
- **Purpose:** Fetches notifications for a specific user.
- **Endpoint:** `/notification/user`
- **Method:** POST
- **Request Body Parameters:**
  - `email` (string): The email of the user.
- **Response:**
  - If successful, returns an object with `ok: true` and the notifications for the user.
  - If an error occurs during the operation, returns an object with `ok: false`.

### `/notification/user/superuser` POST Route
- **Purpose:** Sends a notification from a user to a superuser.
- **Endpoint:** `/notification/user/superuser`
- **Method:** POST
- **Request Body Parameters:**
  - `sender_email` (string): The email of the sender (user).
  - `receiver_email` (string): The email of the receiver (superuser).
  - `message` (string): The notification message.
- **Response:**
  - If successful, returns an object with `ok: true` and a success message.
  - If an error occurs during the operation, returns an object with `ok: false`.

## Notes
- These router endpoints interact with the database to perform various message, update, and notification-related operations.
- Error handling is implemented using try-catch blocks to handle exceptions thrown during database queries.
- Logging statements (`console.error`) are present for debugging purposes, which should ideally be removed or disabled in production.
```








