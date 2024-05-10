import CryptoJS from 'react-native-crypto-js';





const secretKey = 'hiii';

// Encrypt JSON to string
const encryptJSONToString = (jsonObject) => {
  const jsonString = JSON.stringify(jsonObject);
  const encrypted = CryptoJS.AES.encrypt(jsonString, secretKey).toString();
  return encrypted;
};

// Decrypt string to JSON
const decryptStringToJSON = (encryptedString) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedString, secretKey).toString(CryptoJS.enc.Utf8);
  const decryptedJson = JSON.parse(decrypted);
  return decryptedJson;
};

export {encryptJSONToString,decryptStringToJSON}
