import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const HR_Component = ({
  hr,
  index,
  handleHrNameChange,
  handleEmailChange,
  addEmail,
  handlePhoneChange,
  addPhoneNumber,
  handleLinkedinChange,
  removeHR,
  removeEmail,
  removePhoneNumber,
}) => {
  return (
    <View style={styles.hrContainer}>
      <TouchableOpacity style={styles.removeButton} onPress={() => removeHR(index)}>
        <Text style={styles.removeButtonText}>✖</Text>
      </TouchableOpacity>
      <Text style={styles.hrTitle}>#{index + 1}</Text>

      {/* HR Name */}
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaa" // Placeholder color
        placeholder="HR Name"
        value={hr.hrName}
        onChangeText={(text) => handleHrNameChange(index, text)}
      />

      {/* Email Addresses */}
      {hr.emails.map((email, emailIndex) => (
        <View key={emailIndex} style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaa" // Placeholder color
            placeholder={`Email #${emailIndex + 1}`}
            value={email}
            onChangeText={(text) => handleEmailChange(index, emailIndex, text)}
          />
          <TouchableOpacity style={styles.removeButton} onPress={() => removeEmail(index, emailIndex)}>
            <Text style={styles.removeButtonText}>✖</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity onPress={() => addEmail(index)}>
        <Text style={styles.addText}>Add Email</Text>
      </TouchableOpacity>

      {/* Phone Numbers */}
      {hr.phoneNumbers.map((phone, phoneIndex) => (
        <View key={phoneIndex} style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaa" // Placeholder color
            placeholder={`Phone #${phoneIndex + 1}`}
            value={phone}
            onChangeText={(text) => handlePhoneChange(index, phoneIndex, text)}
          />
          <TouchableOpacity style={styles.removeButton} onPress={() => removePhoneNumber(index, phoneIndex)}>
            <Text style={styles.removeButtonText}>✖</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity onPress={() => addPhoneNumber(index)}>
        <Text style={styles.addText}>Add Phone Number</Text>
      </TouchableOpacity>

      {/* LinkedIn Profile */}
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaa" // Placeholder color
        placeholder="LinkedIn Profile"
        value={hr.linkedinProfile}
        onChangeText={(text) => handleLinkedinChange(index, text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  hrContainer: {
    marginBottom: 20,
    backgroundColor: '#202020', // Background color similar to WhatsApp's dark theme
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffff', // Green border color
    position: 'relative', // Ensure proper positioning of remove button
  },
  hrTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#3498db', // Green text color
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ffff', // Green border color
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 10,
    color: '#FFF', // White text color
  },
  inputContainer: {
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addText: {
    color: '#3498db',
    marginTop: -10,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    position: 'absolute',
    top: 7,
    right: 5,
    backgroundColor: '#202020', // Green background color
    borderRadius: 15, // Circular shape
    width: 20, // Adjust size as needed
    height: 20, // Adjust size as needed
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  removeButtonText: {
    color: '#FFF', // White text color
    fontSize: 14, // Decrease the font size
  },
});

export default HR_Component;
