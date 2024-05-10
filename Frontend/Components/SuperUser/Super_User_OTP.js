import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { BASE_URL } from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

let sendOTP = async (email, otp) => {
  try {
    const response = await fetch(`${BASE_URL}/sendotp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        otp,
      }),
    });

    const result = await response.json();
    console.log('Login response:', result);

    let t = result["OTP"];
    return t;
  } catch (error) {
    console.error('Error during login:', error);
  }
}

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


const Super_User_OTP = ({ route }) => {
  const [otp, setOTP] = useState('');
  const [OTP, setOTP1] = useState(0);
  const [isOtpExpired, setIsOtpExpired] = useState(false);
  const [isResendVisible, setIsResendVisible] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const { email,cycle } = route.params;
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    let timer;
  
    if (isFocused) {
      const otpExpirationTimer = setTimeout(() => {
        setIsOtpExpired(true);
        setIsResendVisible(true); // Set resend button visible when OTP expires
        Alert.alert('Alert', 'OTP has expired. Please request a new OTP.');
      }, 5 * 60 * 1000);
  
      timer = setTimeout(() => {
        setIsResendVisible(true); // Set resend button visible after 5 seconds
      }, 62 * 1000);
  
      return () => {
        clearTimeout(timer);
        clearTimeout(otpExpirationTimer);
      };
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused && resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer(prevTimer => prevTimer - 1);
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isFocused, resendTimer]);

  useEffect(() => {
    if (isFocused && resendTimer === 0) {
      setIsResendVisible(true);
    }
  }, [isFocused, resendTimer]);

  useEffect(() => {
    if (isFocused) {
      const k = generateOTP();
      sendOTP(email, k).then((t) => {
        console.log(k);
        setOTP1(k);
        setResendTimer(60);
      });
    }
  }, [isFocused]);

  const handleVerifyOTP =async () => {
    console.log('Verifying OTP:', otp, OTP);

    if (isOtpExpired) {
      Alert.alert('Error', 'OTP has expired. Please request a new OTP.');
      setOTP1("000000");
    } else if (OTP === otp) {
      let type="superuser";
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('user', type);
    
      const date = new Date();
      // let cycle = getCycleNumber(date);

      
      navigation.navigate('Super_User_Home_Page', { email ,cycle})
    } else {
      Alert.alert('Alert', 'Wrong OTP');
    }
  };

  const handleResendOTP = () => {
    setIsOtpExpired(false);
    const k = generateOTP();
    sendOTP(email, k).then((t) => {
      console.log(k);
      setOTP1(k);
      setIsResendVisible(false); // Hide the resend button after clicking
      setResendTimer(60); // Reset the timer
    });
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        placeholderTextColor="#555"
        keyboardType="numeric"
        value={otp}
        onChangeText={(text) => setOTP(text)}
      />

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOTP}>
        <Text style={styles.verifyButtonText}>Verify OTP</Text>
      </TouchableOpacity>
      
      {isResendVisible && (
        <TouchableOpacity style={styles.resendButton} onPress={handleResendOTP}>
          <Text style={styles.resendButtonText}>Resend OTP</Text>
        </TouchableOpacity>
      )}
      
      {resendTimer > 0 && (
        <Text style={styles.resendTimerText}>Resend in {resendTimer} seconds</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    color: '#fff',
    height: 40,
    width: '70%',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  verifyButton: {
    backgroundColor: '#128C7E',
    padding: 12,
    borderRadius: 45,
    alignItems: 'center',
    width: '60%',
    marginBottom: 10,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendButton: {
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 45,
    alignItems: 'center',
    width: '60%',
  },
  resendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendTimerText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
  },
});

export default Super_User_OTP;
