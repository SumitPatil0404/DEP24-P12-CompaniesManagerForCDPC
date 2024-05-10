import React from 'react';
import {View, Text, TouchableOpacity, Platform, StyleSheet} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {Alert} from 'react-native';

import {decryptStringToJSON} from '../../Tools/DataSecurity';

const CompanyPDF = ({companies}) => {
  const generatePDF = async () => {
    try {
      const companiesPerPage = 20;
      const numPages = Math.ceil(companies.length / companiesPerPage);

      for (let page = 0; page < numPages; page++) {
        let htmlContent = `
              <div style="text-align: center;">
                <h1 style="color: black; font-size: 20px; margin-bottom: 20px;">Companies Details</h1>
              </div>
            `;

        const startIndex = page * companiesPerPage;
        const endIndex = Math.min(
          (page + 1) * companiesPerPage,
          companies.length,
        );

        for (let i = startIndex; i < endIndex; i++) {
          const company = companies[i];
          const details = decryptStringToJSON(company.details); // Assuming details is an array of HRs
          const companyDetails = decryptStringToJSON(company.company_details);

          htmlContent += `
                  <div style="margin-bottom: 10px; border: 1px solid #ccc; border-radius: 8px; padding: 5px;">
                    <p style="color: blue; font-size: 10px; margin-bottom: 2px;"><strong>Name:</strong> <span style="color: black;">${
                      company.name
                    }</span></p>
                    <p style="color: blue; font-size: 10px; margin-bottom: 2px;"><strong>Status:</strong> <span style="color: black;">${
                      company.status
                    }</span></p>
                    <p style="color: blue; font-size: 10px; margin-bottom: 2px;"><strong>Company Details:</strong> <span style="color: black;">${JSON.stringify(
                      companyDetails,
                    )}</span></p>
                    `;

          if (companyDetails == {}) {
            htmlContent += `
                          <div style="padding-left: 10px;">
                            <p style="color: red; font-size: 10px; margin-bottom: 2px;">No company details available</p>
                          </div>
                        `;
          } else {
            const categoriesText =
              companyDetails.categories && companyDetails.categories.length > 0
                ? companyDetails.categories.join(', ')
                : 'No categories available';
            const degreesText =
              companyDetails.eligibleDegrees &&
              companyDetails.eligibleDegrees.length > 0
                ? companyDetails.eligibleDegrees.join(', ')
                : 'No eligible degrees available';

            htmlContent += `
  <div style="padding-left: 10px;">
    <p style="color: blue; font-size: 10px; margin-bottom: 2px;"><strong>CTC:</strong> <span style="color: black;">${companyDetails.ctc}</span></p>
    <p style="color: blue; font-size: 10px; margin-bottom: 2px;"><strong>Stipend:</strong> <span style="color: black;">${companyDetails.stipend}</span></p>
    <p style="color: blue; font-size: 10px; margin-bottom: 2px;"><strong>Job Location:</strong> <span style="color: black;">${companyDetails.jobLocation}</span></p>
    <p style="color: blue; font-size: 10px; margin-bottom: 2px;"><strong>Categories:</strong> <span style="color: black;">${categoriesText}</span></p>
    <p style="color: blue; font-size: 10px; margin-bottom: 2px;"><strong>Eligible Degrees:</strong> <span style="color: black;">${degreesText}</span></p>
  </div>
`;
          }

          htmlContent += `  
                    <p style="color: blue; font-size: 10px; margin-bottom: 2px;"><strong>HR Details:</strong></p>`;

          // Check if details array is empty
          if (details.length === 0) {
            htmlContent += `
                    <div style="padding-left: 10px;">
                      <p style="color: red; font-size: 10px; margin-bottom: 2px;">No HR details available</p>
                    </div>
                  `;
          } else {
            // Iterate over HR details
            details.forEach(hr => {
              const emailsText =
                hr.emails && hr.emails.length > 0
                  ? hr.emails.join(', ')
                  : 'No emails available';
              const phoneNumbersText =
                hr.phoneNumbers && hr.phoneNumbers.length > 0
                  ? hr.phoneNumbers.join(', ')
                  : 'No phone numbers available';

              htmlContent += `
              <div style="margin-bottom: 10px; border: 1px solid #ccc; border-radius: 8px; padding: 5px;">
                <p style="color: blue; font-size: 10px; margin-bottom: 2px;"><strong>Name:</strong> <span style="color: black;">${
                  hr.hrName
                }</span></p>
                <p style="color: blue; font-size: 10px; margin-bottom: 2px;"><strong>Emails:</strong> <span style="color: black;">${emailsText}</span></p>
                <p style="color: blue; font-size: 10px; margin-bottom: 2px;"><strong>Phone Numbers:</strong> <span style="color: black;">${phoneNumbersText}</span></p>
                <p style="color: blue; font-size: 10px; margin-bottom: 2px;"><strong>LinkedIn:</strong> <span style="color: black;">${
                  hr.linkedinProfile !== ''
                    ? hr.linkedinProfile
                    : 'No LinkedIn Profile available'
                }</span></p>
              </div>
            `;
            });
          }

          htmlContent += `</div>`;
        }

        const options = {
          html: htmlContent,
          fileName: `Companies_${page + 1}`,
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
    <View style={styles.container}>
      <TouchableOpacity onPress={generatePDF} style={styles.button}>
        <Text style={styles.buttonText}>Export PDF</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'right',
    marginLeft: 140,
    marginTop: -10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'green',
    padding: 4,
    borderRadius: 8,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CompanyPDF;
