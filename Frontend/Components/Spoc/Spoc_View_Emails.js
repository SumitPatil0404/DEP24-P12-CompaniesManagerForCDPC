import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {BASE_URL} from '../../api';
import fetchAPI from '../../Tools/FetchAPI';
import {
  encryptJSONToString,
  decryptStringToJSON,
} from '../../Tools/DataSecurity';
import LoadingScreen from '../Common/LoadingScreen'; // Import your loading screen component here

const secretKey = "Kartik's Secret Key";

const Spoc_View_Emails = ({route}) => {
  const [loading, setLoading] = useState(true); // Add loading state
  const [companies, setCompanies] = useState([]);
  const [expandedCompanies, setExpandedCompanies] = useState([]);
  const [expandedCompaniesDetails, setExpandedCompaniesDetils] = useState([]);
  const [expandedCompaniesHrDetails, setExpandedCompaniesHrDetails] = useState(
    [],
  );

  const {email,cycle} = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigation = useNavigation();
  const [cachedCompanyData, setCachedCompanyData] = useState({});
  const [cachedCompanyEmail, setCachedCompanyEmail] = useState({});
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );

  const fetchData = async () => {
    try {
      let t = {email: email,cycle_id:cycle.cycle_id};
      let response1 = await fetchAPI(`${BASE_URL}/user/superuser`, t, 'POST', false);
      let k = response1.data[0].user_id;
      t = {user_id: k,cycle_id:cycle.cycle_id};
      let response = await fetchAPI(
        `${BASE_URL}/user/assigned_company`,
        t,
        'POST',
        false,
      );

      if (response.ok) {
        setCompanies(response.data);
      }
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error('Error fetching company data:', error);
      setLoading(false); // Set loading to false if there's an error
    }
  };



  const toggleDetails = company => {
    if (expandedCompanies.includes(company.company_id)) {
      setExpandedCompanies(
        expandedCompanies.filter(id => id !== company.company_id),
      );
    } else {
      setExpandedCompanies([...expandedCompanies, company.company_id]);
    }
  };

 

  const toggleHrDetails = company => {
    if (expandedCompaniesHrDetails.includes(company.company_id)) {
      setExpandedCompaniesHrDetails(
        expandedCompaniesHrDetails.filter(id => id !== company.company_id),
      );
    } else {
      setExpandedCompaniesHrDetails([
        ...expandedCompaniesHrDetails,
        company.company_id,
      ]);
    }
  };

 

  const filteredAndSortedCompanies = companies
    .filter(company =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (sortOrder === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

  // Render loading screen if loading
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.sortContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by company name"
          placeholderTextColor="#000"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)} // Pass the text input value to setSearchQuery
        />

        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          <Text style={styles.sortButtonText}>
            {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
          </Text>
        </TouchableOpacity>
      </View>
      {filteredAndSortedCompanies.map((company, index) => (
        <TouchableWithoutFeedback key={index}>
          <View style={styles.companyContainer}>
            <View style={styles.companyHeader}>
              <Text style={styles.companyName}>{company.name}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => {
                    toggleDetails(company);
                    toggleHrDetails(company);
                    if (
                      !expandedCompanies.includes(company.company_id) &&
                      company.user_id !== null
                    ) {
                      console.log(cachedCompanyData[company.company_id]);
                      //   handleViewDetails(company);
                    }
                  }}>
                  <Text style={styles.buttonText}>
                    {expandedCompanies.includes(company.company_id)
                      ? 'Hide'
                      : 'View'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {expandedCompanies.includes(company.company_id) &&
              expandedCompaniesHrDetails.includes(company.company_id) && (
                <>
                  {decryptStringToJSON(company.details)?.length > 0 ? (
                    <>
                     
                      <Text style={styles.companyName1}>HR's Details</Text>
                      {decryptStringToJSON(company.details)?.map(
                        (hr, hrIndex) => (
                           
                          <View key={hrIndex} style={styles.hrContainer}>
                            <Text style={styles.hrName}>{hr.hrName}</Text>
                            <View style={styles.companyHeader}>
                            <Text style={styles.hrInfo}>
                              <Text style={styles.label}>Email Id's :</Text>{' '}
                              {JSON.stringify(hr.emails) !== JSON.stringify([])
                                ? hr.emails.join(', ')
                                : 'No emails available'}
                            </Text>
                            <TouchableOpacity
                              style={styles.viewButton}
                              onPress={() => {
                                navigation.navigate('EmailList', {
                                  email: hr.emails,
                                });
                              }}>
                              <Text style={styles.buttonText}>
                                View Emails
                              </Text>
                            </TouchableOpacity>
                            </View>

                            <View style={styles.horizontalLine} />
                          </View>
                        ),
                      )}
                    </>
                  ) : (
                    <Text style={styles.noDetailsText}>
                      No HR Details available
                    </Text>
                  )}
                </>
              )}
          </View>
        </TouchableWithoutFeedback>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#202020',
  },
  companyDetailsButton: {
    backgroundColor: '#657e8c',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    width: 200,

    flex: 1,
    marginRight: 10, // Position on the left side
  },
  noDetailsText: {
    color: 'red', // Set the text color to red
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,

    // Optionally, you can include other text styling properties here
  },
  // Update the styles for the "View HR Details" button
  HrDetailsButton: {
    backgroundColor: '#657e8c',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    flex: 1,
    // Position on the right side
  },
  contentContainer: {
    paddingBottom: 20,
  },
  companyContainer: {
    marginBottom: 10,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  companyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderRadius: 10,
    // borderWidth: 1,
    // width: '70%',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#128C7E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
  },
  viewButton: {
    backgroundColor: '#657e8c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  companyName: {
    fontSize: 18,

    color: '#fff',
    width: '60%',
    // borderColor: '#e1e1e1',
    // borderWidth: 1,
  },
  companyName1: {
    fontSize: 18, // Adjust the font size as needed
    fontWeight: 'bold', // Apply bold font weight
    color: 'lightyellow', // Apply your desired text color

    marginTop: 10,
  },
  companyName2: {
    fontSize: 18, // Adjust the font size as needed
    fontWeight: 'bold', // Apply bold font weight
    color: 'lightyellow', // Apply your desired text color

    marginTop: 10,
    marginBottom: 10,
  },
  hrContainer: {
    marginBottom: 0,
    marginTop: 10,
  },
  hrContainer1: {
    marginBottom: 0,
    marginTop: 10,
    flexDirection: 'row',
  },
  hrName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2ecc71',
  },
  hrInfo: {
    fontSize: 18,
    color: '#b8d8d8',
    marginBottom: 8,
    width: '60%',
  },
  label: {
    color: '#3498db',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
  },
  companyUpdates: {
    fontSize: 18,
    color: '#b8d8d8',
    marginBottom: 8,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#e1e1e1',
    marginVertical: 8,
  },
  searchInput: {
    backgroundColor: '#fff',
    marginRight: 10,
    borderRadius: 8,
    padding: 9,
    flex: 0.9,
    color: '#000',
    fontSize: 16, // Take 90% of the available width
  },
  sortContainer: {
    flexDirection: 'row', // Adjusted to row direction
    alignItems: 'center', // Center items vertically
    justifyContent: 'flex', // Align items to the right
    marginBottom: 20,

    // Take 10% of the available width
  },
  sortButton: {
    backgroundColor: '#3498db',
    padding: 12,

    borderRadius: 8,
    flex: 0.1,
  },
  sortButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Spoc_View_Emails;
