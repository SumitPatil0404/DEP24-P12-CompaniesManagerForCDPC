import React from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Alert } from 'react-native';

const UserPDF = ({ users }) => {
  const generatePDF = async () => {
    try {
      const usersPerPage = 20;
      const numPages = Math.ceil(users.length / usersPerPage);
  
      for (let page = 0; page < numPages; page++) {
        let htmlContent = `
          <div style="text-align: center;">
            <h1 style="color: black; font-size: 20px; margin-bottom: 20px;">Users Details</h1>
          </div>
        `;
  
        const startIndex = page * usersPerPage;
        const endIndex = Math.min((page + 1) * usersPerPage, users.length);
  
        for (let i = startIndex; i < endIndex; i++) {
          const user = users[i];
          htmlContent += `
            <div style="margin-bottom: 10px; border: 1px solid #ccc; border-radius: 8px; padding: 5px;">
              <p style="color: blue; font-size: 10px; margin-bottom: 2px;"><strong>Name:</strong> <span style="color: black;">${user.name}</span></p>
              <p style="color: blue; font-size: 10px; margin-bottom: 2px;"><strong>Position:</strong> <span style="color: black;">${user.position}</span></p>
              <p style="color: blue; font-size: 10px; margin-bottom: 2px;"><strong>Department:</strong> <span style="color: black;">${user.department}</span></p>
              <p style="color: blue; font-size: 10px; margin-bottom: 2px;"><strong>Email:</strong> <span style="color: black;">${user.email}</span></p>
              <p style="color: blue; font-size: 10px; margin-bottom: 2px;"><strong>Phone:</strong> <span style="color: black;">${user.phone || 'N/A'}</span></p>
            </div>
          `;
        }
  
        // Generate PDF for this page
        const options = {
          html: htmlContent,
          fileName: `Users_${page + 1}`, // Add page number to file name
          directory: Platform.OS === 'ios' ? 'Documents' : 'Downloads',
        };
        const pdf = await RNHTMLtoPDF.convert(options);
        console.log(`PDF for page ${page + 1} generated:`, pdf.filePath);
      }
  
      Alert.alert('PDFs saved to Downloads folder');
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'Failed to generate PDF');
    }
  };
  return (
    <View style={styles.container5}>
      <TouchableOpacity onPress={generatePDF} style={styles.button3}>
        <Text style={styles.buttonText3}>Export PDF</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  container5: {
   
    
   alignItems:"right",
   marginLeft:140,
   
    marginTop:-10,
    marginBottom:10
  },
  button3: {
    backgroundColor: 'green',
    padding: 4,
    borderRadius: 8,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText3: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default UserPDF;
