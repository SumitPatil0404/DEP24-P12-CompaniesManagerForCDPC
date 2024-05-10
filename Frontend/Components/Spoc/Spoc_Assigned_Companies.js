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
import Assign_Companies from '../SuperUser/Super_User_Assign_Companies';

const secretKey = "Kartik's Secret Key";

const Spoc_Assigned_Companies = ({route}) => {
  const {email,cycle} = route.params;
  const [loading, setLoading] = useState(true); // Add loading state
  const [companies, setCompanies] = useState([]);
  const [expandedCompanies, setExpandedCompanies] = useState([]);
  const [expandedCompaniesDetails, setExpandedCompaniesDetils] = useState([]);
  const [expandedCompaniesHrDetails, setExpandedCompaniesHrDetails] = useState(
    [],
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigation = useNavigation();
  const [cachedCompanyData, setCachedCompanyData] = useState({});
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

  const handleEditCompany = company => {
    let k = {company: company, company_id: company.company_id,cycle:cycle};
    navigation.navigate('Spoc_Edit_Company', k);
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

  const handleInfLinkPress = company => {
    navigation.navigate('Super_User_View_Pdf', {
      jsonData: decryptStringToJSON(company.inf),
    });
  };


  const handleJafLinkPress = company => {
    navigation.navigate('Super_User_View_Pdf', {
      jsonData: decryptStringToJSON(company.jaf),
    });
  };
  const toggleCompanyDetails = company => {
    if (expandedCompaniesDetails.includes(company.company_id)) {
      setExpandedCompaniesDetils(
        expandedCompaniesDetails.filter(id => id !== company.company_id),
      );
    } else {
      setExpandedCompaniesDetils([
        ...expandedCompaniesDetails,
        company.company_id,
      ]);
    }
  };

  const handleUpdatesNavigation = (company) => {
    let k={
      company_id:company.company_id,
      company_name:company.name,
      cycle: cycle,
      email:email

    }

    navigation.navigate('Spoc_Updates',k);
  };

  const editStatus = async (company) => {
    navigation.navigate('Spoc_Edit_Company_Status', {company,cycle});
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

  if (companies.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
        }}>
        <Text style={{color: '#fff', fontSize: 20, backgroundColor: '#000'}}>
          No Companies Assigned
        </Text>
      </View>
    );
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
                    if (
                      !expandedCompanies.includes(company.company_id) &&
                      company.user_id !== null
                    ) {
                      console.log(cachedCompanyData[company.company_id]);
                    }
                  }}>
                  <Text style={styles.buttonText}>
                    {expandedCompanies.includes(company.company_id)
                      ? 'Hide'
                      : 'View'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEditCompany(company)}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>

            {expandedCompanies.includes(company.company_id) && (
              <>
                <View style={styles.hrContainer}>
                <View style={styles.horizontalLine} />
                  <View style={{borderColor: '#e1e1e1',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={styles.hrInfo}>
                      <Text style={styles.label}>Status :</Text>{' '}
                      {company.status}
                    </Text>
                    <TouchableOpacity onPress={() => editStatus(company)}>
                      <Text style={{color:"#3498db",fontSize:15}}>Edit Status</Text>
                    </TouchableOpacity>
                  </View>
                  {/* <Text style={styles.hrInfo}>
                    <Text style={styles.label}>Updates :</Text>{' '}
                    {company.updates}
                  </Text> */}
                  <Text style={styles.hrInfo}>
                      <Text style={styles.label}>Updates :</Text>{' '}
                  <TouchableOpacity onPress={()=>handleUpdatesNavigation(company)}>
                      <Text style={styles.linkText}>View /Add</Text>
                  </TouchableOpacity>
                    </Text>

                  <Text style={styles.hrInfo}>
                    <Text style={styles.label}>INF : </Text>{' '}
                    {company.inf===null || decryptStringToJSON(company.inf) == null ? (
                      'Not Available'
                    ) : (
                      <TouchableOpacity
                      style={{ marginTop: 18 }}
                        onPress={() => handleInfLinkPress(company)}>
                        <Text
                          style={{
                            color: '#3498db',
                            textDecorationLine: 'underline',
                            fontSize: 18,
                           
                          }}>
                          View
                        </Text>
                      </TouchableOpacity>
                    )}
                  </Text>
                  <Text style={styles.hrInfo}>
                    <Text style={styles.label}>JAF : </Text>{' '}
                    {company.jaf==null || decryptStringToJSON(company.jaf) == null ? (
                      'Not Available'
                    ) : (
                      <TouchableOpacity
                      style={{ marginTop: 18 }}
                        onPress={() => handleJafLinkPress(company)}>
                        <Text
                          style={{
                            color: '#3498db',
                            textDecorationLine: 'underline',
                            fontSize: 18,
                           
                          }}>
                          View
                        </Text>
                      </TouchableOpacity>
                    )}
                  </Text>
                </View>
                <View style={styles.hrContainer1}>
                  <TouchableOpacity
                    style={styles.companyDetailsButton}
                    onPress={() => {toggleCompanyDetails(company)
                    if(
                      expandedCompaniesHrDetails.includes(company.company_id)
                    )
                    {
                      toggleHrDetails(company)
                    }
                    
                    }
                  }>
                    <Text style={styles.buttonText}>
                      {expandedCompaniesDetails.includes(company.company_id)
                        ? 'Hide Company Details'
                        : 'View Company Details'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.HrDetailsButton}
                    onPress={() => {toggleHrDetails(company)
                      if(
                        expandedCompaniesDetails.includes(company.company_id)
                      )
                      {
                        toggleCompanyDetails(company)
                      }
                    }}>
                    <Text style={styles.buttonText}>
                      {expandedCompaniesHrDetails.includes(company.company_id)
                        ? 'Hide HR Details'
                        : 'View HR Details'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {expandedCompanies.includes(company.company_id) &&
              expandedCompaniesDetails.includes(company.company_id) && (
                <>
                  {Object.keys(decryptStringToJSON(company.company_details))
                    .length > 0 ? (
                    <View style={styles.hrContainer}>
                      <Text style={styles.companyName1}>Company Details</Text>
                      <Text style={styles.hrInfo}>
                        <Text style={styles.label}>CTC : </Text>{' '}
                        {decryptStringToJSON(company.company_details).ctc}
                      </Text>
                      <Text style={styles.hrInfo}>
                        <Text style={styles.label}>Stipend :</Text>{' '}
                        {decryptStringToJSON(company.company_details).stipend}
                      </Text>
                      <Text style={styles.hrInfo}>
                        <Text style={styles.label}>Job Location :</Text>{' '}
                        {
                          decryptStringToJSON(company.company_details)
                            .jobLocation
                        }
                      </Text>
                      <Text style={styles.hrInfo}>
                        <Text style={styles.label}>Categories :</Text>{' '}
                        {decryptStringToJSON(company.company_details)
                          .categories !== undefined
                          ? decryptStringToJSON(
                              company.company_details,
                            ).categories.join(', ')
                          : 'No categories available'}
                      </Text>

                      <Text style={styles.hrInfo}>
                        <Text style={styles.label}>Eligible Degrees :</Text>{' '}
                        {decryptStringToJSON(company.company_details)
                          .eligibleBatches !== undefined
                          ? decryptStringToJSON(
                              company.company_details,
                            ).eligibleBatches.join(', ')
                          : 'No eligible Degree available'}
                      </Text>
                      <View style={styles.horizontalLine} />
                    </View>
                  ) : (
                    <Text style={styles.noDetailsText}>
                      No Company Details available
                    </Text>
                  )}
                </>
              )}

            {expandedCompanies.includes(company.company_id) &&
              expandedCompaniesHrDetails.includes(company.company_id) && (
                <>
                  {decryptStringToJSON(company.details)?.length > 0 ? (
                    <>
                      <Text style={styles.companyName1}>HR Details</Text>
                      {decryptStringToJSON(company.details)?.map(
                        (hr, hrIndex) => (
                          <View key={hrIndex} style={styles.hrContainer}>
                            <Text style={styles.hrName}>{hr.hrName}</Text>
                            <Text style={styles.hrInfo}>
                              <Text style={styles.label}>Emails :</Text>{' '}
                              {JSON.stringify(hr.emails) !== JSON.stringify([])
                                ? hr.emails.join(', ')
                                : 'No emails available'}
                            </Text>
                            <Text style={styles.hrInfo}>
                              <Text style={styles.label}>Phone Numbers :</Text>{' '}
                              {JSON.stringify(hr.phoneNumbers) !==
                              JSON.stringify([])
                                ? hr.phoneNumbers.join(', ')
                                : 'No phone numbers available'}
                            </Text>
                            <Text style={styles.hrInfo}>
                              <Text style={styles.label}>LinkedIn :</Text>{' '}
                              {hr.linkedinProfile !== ''
                                ? hr.linkedinProfile
                                : 'No LinkedIn Profile available'}
                            </Text>
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
  linkText: {
    color: '#3498db', // Change the color to match your theme
    textDecorationLine: 'underline',
    fontSize:16,
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
    width: '50%',
  },
  companyName1: {
    fontSize: 18, // Adjust the font size as needed
    fontWeight: 'bold', // Apply bold font weight
    color: 'lightyellow', // Apply your desired text color
    marginBottom: 10,
    marginTop: 15,
  },
  hrContainer: {
    marginBottom: 0,
    // marginTop: 10,
  },
  hrContainer1: {
    marginBottom: 0,
    marginTop: 20,
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

export default Spoc_Assigned_Companies;
