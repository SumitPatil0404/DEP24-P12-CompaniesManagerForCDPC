import React, {useState} from 'react';
import {View, Text, Button, Alert} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import fetchAPI from '../../Tools/FetchAPI';
import {BASE_URL} from '../../api';

const FilePicker = () => {
  // const [pdfBuffer, setPdfBuffer] = useState(null);

 

  const handleSendToBackend = async () => {
    if (!pdfBuffer) {
      Alert.alert('Error', 'No PDF uploaded');
      return;
    }

    try {
      // Make a POST request to your backend endpoint
      const response = await fetch('YOUR_BACKEND_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/pdf',
        },
        body: pdfBuffer,
      });

      // Handle the response from the backend
      // For example, you can check if the upload was successful
      if (response.ok) {
        Alert.alert('Success', 'PDF uploaded successfully');
      } else {
        Alert.alert('Error', 'Failed to upload PDF');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An error occurred while uploading PDF');
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Upload PDF" onPress={handleUploadPdf} />
      <Button title="Send to Backend" onPress={handleSendToBackend} />
      {pdfText !== '' && (
        <View style={{marginTop: 20}}>
          <Text>Extracted Text:</Text>
          <Text>{pdfText}</Text>
        </View>
      )}
    </View>
  );
};

export default FilePicker;
