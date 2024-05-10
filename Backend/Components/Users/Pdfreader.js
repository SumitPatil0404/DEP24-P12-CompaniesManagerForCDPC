// liscenceKey="40277740-1170-40dd-8721-f8c35b5b2c44"
liscenceKey="d8b1b710-5151-4e5a-8832-48950575f3b7"


const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function sendPdfBufferToSelectPdf(pdfBuffer) {
    try {
        // Create a FormData object
        const formData = new FormData();
        
        // Append the license key and PDF buffer to the FormData object
        formData.append('key', liscenceKey);
        formData.append('file', pdfBuffer, 'pdfFileName.pdf');

        // Make a POST request to the SelectPdf API endpoint
        const response = await axios.post('https://selectpdf.com/api2/pdftotext/', formData, {
            headers: {
                ...formData.getHeaders(), // Include multipart/form-data headers
            },
        });

        // Log the response data
        // console.log('API response:', response.data);

        // Return the API response data
        return response.data;
    } catch (error) {
        console.error('Error sending PDF buffer to SelectPdf API:', error);
        throw error;
    }
}

// Usage example
module.exports={sendPdfBufferToSelectPdf}