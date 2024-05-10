import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {MultipleSelectList} from 'react-native-dropdown-select-list';

const Company_Details = ({
  companydetails,
  handleCTCChange,
  handleStipendChange,
  handleJobLocationChange,
  handleCategoryChange,
  handleBatchChange,
  remove,
}) => {
  const [selectedcategory, setSelectedCategory] = useState([]);
  const [selecteddegree, setSelectedDegree] = useState([]);
  const data = [
    {key: '1', value: 'SDE'},
    {key: '2', value: 'Data Science'},
    {key: '3', value: 'AI/ML'},
    {key: '4', value: 'Quant'},
    {key: '5', value: 'Business Analyst'},
    {key: '6', value: 'Product Analyst'},
    {key: '7', value: 'EE Core'},
    {key: '8', value: 'Mech Core'},
    {key: '9', value: 'Meta Core'},
    {key: '10', value: 'Chem Core'},
    {key: '11', value: 'Civil Core'},
    {key: '12', value: 'Teaching Roles'},
  ];
  const data1 = [
    {key: '1', value: 'B.Tech'},
    {key: '2', value: 'M.Tech'},
    {key: '3', value: 'MSc'},
    {key: '4', value: 'PhD'},
  ];

  return (
    <FlatList
      data={[{key: 'companyDetails'}]} // FlatList expects an array of data
      renderItem={() => (
        <View style={styles.companyContainer}>
          <TouchableOpacity style={styles.removeButton} onPress={remove}>
            <Text style={styles.removeButtonText}>✖</Text>
          </TouchableOpacity>

          {/* CTC */}

          <TextInput
            style={styles.input}
            placeholder="Enter CTC"
            placeholderTextColor={'#fff'}
            value={companydetails.ctc}
            onChangeText={handleCTCChange}
          />

          {/* Stipend */}

          <TextInput
            style={styles.input}
            placeholder="Enter Stipend"
            placeholderTextColor={'#fff'}
            value={companydetails.stipend}
            onChangeText={handleStipendChange}
          />

          {/* Job Location */}

          <TextInput
            style={styles.input}
            placeholder="Enter Job Location"
            placeholderTextColor={'#fff'}
            value={companydetails.jobLocation}
            onChangeText={handleJobLocationChange}
          />

          {/* Category */}

          <MultipleSelectList
            setSelected={val =>
              setSelectedCategory(val)
            }
            data={data}
            save="value"
            label="Category"
            onSelect={() => {
              handleCategoryChange(selectedcategory);
            }}
            searchPlaceholder="Search Category"
            placeholder="Select Category"
            notFoundText="No Data Found"
            maxHeight={350}
            boxStyles={{
              borderWidth: 1,
              borderColor: '#fff',
              backgroundColor: '#fff',
            }} // Set white background
            inputStyles={{color: '#000'}} // Set text color to black
            dropdownStyles={{backgroundColor: '#fff', borderColor: '#000'}} // Additional styles for dropdown scrollview
            dropdownItemStyles={{backgroundColor: '#fff', borderColor: '#000'}} // Additional styles for dropdown single list item
            dropdownTextStyles={{color: '#000'}} // Additional styles for dropdown list items text
           
          />

          <MultipleSelectList
            setSelected={val => {
              setSelectedDegree(val);
            }}
            data={data1}
            save="value"
            onSelect={() => {
              handleBatchChange(selecteddegree);
            }}

            maxHeight={200}
            label="Eligible Degree"
            searchPlaceholder="Search Degree"
            placeholder="Select Degree"
            notFoundText="No Data Found"
            boxStyles={{
              borderWidth: 1,
              borderColor: '#fff',
              backgroundColor: '#fff',
            }} // Set white background
            inputStyles={{color: '#000'}} // Set text color to black
            dropdownStyles={{backgroundColor: '#fff', borderColor: '#000'}} // Additional styles for dropdown scrollview
            dropdownItemStyles={{backgroundColor: '#fff', borderColor: '#000'}} // Additional styles for dropdown single list item
            dropdownTextStyles={{color: '#000'}} // Additional styles for dropdown list items text
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  companyContainer: {
    marginBottom: 20,
    backgroundColor: '#202020',
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffff',
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
  companyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#3498db',
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ffff',
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 10,
    color: '#fff',
  },
});

export default Company_Details;
