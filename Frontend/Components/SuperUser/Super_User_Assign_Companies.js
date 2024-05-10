import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {BASE_URL} from '../../api';
import {Ionicons} from '@expo/vector-icons'; // Import Ionicons for icons
import LoadingScreen from '../Common/LoadingScreen';
import fetchAPI from '../../Tools/FetchAPI';

const Super_User_Assign_Companies = ({route}) => {
  const [companies, setCompanies] = useState([]);
  // const [selectedCompany, setSelectedCompany] = useState(null);
  const [spocModalVisible, setSpocModalVisible] = useState(false);
  const [spocs, setSpocs] = useState([]);
  const [selectedSpoc, setSelectedSpoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const {email, cycle} = route.params;
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  //   const [loadingCompanies, setLoadingCompanies] = useState(true);
  // const [loadingSpocs, setLoadingSpocs] = useState(true);
  let navigation = useNavigation();

  const [spocSortOrder, setSpocSortOrder] = useState('asc');

  // Fetch companies
  useFocusEffect(
    React.useCallback(() => {
      const fetchCompanies = async () => {
        setLoading(true);
        try {
          let t = {cycle_id: cycle.cycle_id};
          let response = await fetchAPI(
            `${BASE_URL}/company/toassign`,
            t,
            'POST',
            false,
          );

          if (response.ok) {
            // Sort the companies based on the initial sort order
            const sortedCompanies = response.data.sort((a, b) => {
              const nameA = (a.name || '').toUpperCase(); // Ensure name is not null
              const nameB = (b.name || '').toUpperCase(); // Ensure name is not null
              if (sortOrder === 'asc') {
                return nameA.localeCompare(nameB);
              } else {
                return nameB.localeCompare(nameA);
              }
            });
            setCompanies(sortedCompanies);
          }
        } catch (error) {
          console.error('Error fetching companies:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchCompanies();
    }, [sortOrder]), // Add sortOrder as a dependency
  );

  // Fetch SPOCs
  useEffect(() => {
    const fetchSpocs = async () => {
      setLoading(true);
      try {
        let t = {cycle_id: cycle.cycle_id};
        let response = await fetchAPI(
          `${BASE_URL}/user/superuser/all`,
          t,
          'POST',
          false,
        );

        if (response.ok) {
          setSpocs(response.data);
        }
      } catch (error) {
        console.error('Error fetching SPOCs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpocs();
  }, []);

  const handleAssignPress = () => {
    if (selectedCompanies.length === 0) {
      // Alert the user to select a company before assigning
      Alert.alert('Alert', 'Please select a company.');
      return; // Return early to prevent further execution
    }
    setSpocModalVisible(true);
  };

  const toggleCompanySelection = company => {
    const index = selectedCompanies.findIndex(
      selected => selected.company_id === company.company_id,
    );
    if (index === -1) {
      // If company is not selected, add it to selectedCompanies
      setSelectedCompanies(prevSelected => [...prevSelected, company]);
    } else {
      // If company is already selected, remove it from selectedCompanies
      setSelectedCompanies(prevSelected =>
        prevSelected.filter(
          selected => selected.company_id !== company.company_id,
        ),
      );
    }
  };

  // Modify handleAssignPress function to toggle the selection state of a company
  const handleSelectPress = company => {
    toggleCompanySelection(company);
  };

  const handleSpocSelect = spoc => {
    setSelectedSpoc(spoc);
  };

  const handleAssignConfirm = async () => {
    // Add logic to send the assignment to the server
    if (!selectedSpoc) {
      // Alert the user to select a SPOC before assigning
      Alert.alert('Alert', 'Please select a User.');
      return; // Return early to prevent further execution
    }
    try {
      setLoading(true);
      await Promise.all(
        selectedCompanies.map(async selectedCompany => {
          let t = {
            company_id: selectedCompany.company_id,
            user_id: selectedSpoc.user_id,
            cycle_id: cycle.cycle_id,
          };
          return fetchAPI(`${BASE_URL}/company/assigntospoc`, t, 'POST', false);
        }),
      );

      // let response;
      // selectedCompanies.map(async selectedCompany => {
      //   let t = {
      //     company_id: selectedCompany.company_id,
      //     user_id: selectedSpoc.user_id,
      //     cycle_id: cycle.cycle_id,
      //   };
      //   response = await fetchAPI(
      //     `${BASE_URL}/company/assigntospoc`,
      //     t,
      //     'POST',
      //     false,
      //   );
      // });

      // if (response.ok) {

      t = {cycle_id: cycle.cycle_id};
      // If assignment is successful, fetch updated list of companies

      const updatedResponse = await fetchAPI(
        `${BASE_URL}/company/toassign`,
        t,
        'POST',
        false,
      );

      setLoading(false);
      if (updatedResponse.ok) {
        // Sort the companies based on the initial sort order
        const sortedCompanies = updatedResponse.data.sort((a, b) => {
          const nameA = (a.name || '').toUpperCase(); // Ensure name is not null
          const nameB = (b.name || '').toUpperCase(); // Ensure name is not null
          if (sortOrder === 'asc') {
            return nameA.localeCompare(nameB);
          } else {
            return nameB.localeCompare(nameA);
          }
        });
        setCompanies(sortedCompanies);
      }
      // } else {
      //   console.error('Error assigning SPOC:', response.error);
      // }
    } catch (error) {
      console.error('Error assigning SPOC:', error);
    }

    // try {
    //   let t = {
    //     sender_email: email,
    //     receiver_email: selectedSpoc.email,
    //     message: `You have been assigned to ${selectedCompany.name} company`,
    //   };
    //   let response = await fetchAPI(
    //     `${BASE_URL}/notification/superuser/user`,
    //     t,
    //     'POST',
    //     false,
    //   );

    //   if (response.ok) {
    //     console.log('Notification sent successfully');
    //   } else {
    //     console.error('Error sending notification:', response.error);
    //   }
    // } catch (error) {
    //   console.error('Error sending notification:', error);
    // }

    Alert.alert('Success', `Companies assigned`);
    setSelectedSpoc(null);
    // console.log(`Assigning ${selectedCompany.name} to ${selectedSpoc.name}`);
    setSpocModalVisible(false);
  };
  // Handle sorting
  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Handle search
  const handleSearch = query => {
    setSearchQuery(query);
  };
  const handleSpocSearch = query => {
    setSearchQuery(query);
  };

  const handleSpocSort = () => {
    setSpocSortOrder(spocSortOrder === 'asc' ? 'desc' : 'asc');
  };
  // Filter SPOCs based on search query
  const filteredSpocs = spocs.filter(spoc =>
    (spoc.name || '').toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const sortedSpocs = [...filteredSpocs].sort((a, b) => {
    const nameA = (a.name || '').toUpperCase();
    const nameB = (b.name || '').toUpperCase();
    return spocSortOrder === 'asc'
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });

  // Filter companies based on search query
  const filteredCompanies = companies.filter(
    company =>
      (company.name || '').toLowerCase().includes(searchQuery.toLowerCase()), // Ensure name is not null
  );

  // Sort companies based on sortOrder
  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    const nameA = (a.name || '').toUpperCase(); // Ensure name is not null
    const nameB = (b.name || '').toUpperCase(); // Ensure name is not null
    if (sortOrder === 'asc') {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        {/* Search Input */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search by company name"
          placeholderTextColor="#000"
          value={searchQuery}
          onChangeText={handleSearch}
        />

        {/* Sort Button */}
        <TouchableOpacity style={styles.sortButton} onPress={handleSort}>
          <Text style={styles.sortButtonText}>
            {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
          </Text>
        </TouchableOpacity>
      </View>
      {/* List of Companies */}

      {/* Display a message if there are no companies */}
      {sortedCompanies.length === 0 ? (
        <Text style={{color: '#fff', fontSize: 16, textAlign: 'center',height:'80%'}}>
          No companies to assign
        </Text>
      ) : (
        <FlatList
          data={sortedCompanies}
          keyExtractor={item => item.company_id.toString()}
          renderItem={({item}) => (
            <View style={styles.companyContainer}>
              <Text style={styles.companyText}>{item.name}</Text>
              <TouchableOpacity
                style={[
                  styles.assignButton,
                  selectedCompanies.some(
                    selected => selected.company_id === item.company_id,
                  ) && styles.selectedAssignButton, // Apply selected style
                ]}
                onPress={() => handleSelectPress(item)}>
                <Text style={styles.assignbuttonText}>
                  {selectedCompanies.some(
                    selected => selected.company_id === item.company_id,
                  )
                    ? 'Selected'
                    : 'Select'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      {/* <View>
        <TouchableOpacity
          style={styles.assignButton}
          onPress={() => handleAssignPress(item)}>
          <Text style={styles.assignbuttonText}>Assign</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.assignButton}
          onPress={() => handleAssignPress(item)}>
          <Text style={styles.assignbuttonText}>Assign</Text>
        </TouchableOpacity>
      </View> */}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => {
            handleAssignPress();
          }}>
          <Text style={styles.buttonText}>Assign</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleCancel()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={spocModalVisible}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select User</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name"
              placeholderTextColor="#000"
              value={searchQuery}
              onChangeText={handleSpocSearch}
            />

            <TouchableOpacity
              style={styles.sortButton}
              onPress={handleSpocSort}>
              <Text style={styles.sortButtonText}>
                {spocSortOrder === 'asc' ? 'A-Z' : 'Z-A'}
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={sortedSpocs}
            keyExtractor={item => item.email.toString()}
            style={styles.FlatList}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.spocItem,
                  selectedSpoc?.email === item.email && styles.selectedSpocItem,
                ]}
                onPress={() => handleSpocSelect(item)}>
                <Text style={styles.spocText}>{item.name}</Text>
                <Text style={styles.spocText}>{item.email}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.modalButton}
            onPress={handleAssignConfirm}>
            <Text style={styles.modalButtonText}>Assign</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setSpocModalVisible(false)}>
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#202020',
  },
  selectedAssignButton: {
    backgroundColor: '#2ecc71', // Selected background color
  },

  searchInput: {
    flex: 0.9,
    backgroundColor: '#fff',
    marginRight: 10,
    borderRadius: 8,
    padding: 10,
    color: '#000',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',

    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    flex: 1,
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // width: '40%',
  },
  viewButton: {
    flex: 1,
    backgroundColor: '#128C7E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  companyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#333', // Dark background color
    borderRadius: 8,
  },
  companyText: {
    fontSize: 18,
    color: '#fff',
    width: '70%',
  },
  FlatList: {
    width: '100%',
  },
  assignButton: {
    backgroundColor: '#128C7E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
  },
  assignbuttonText: {
    color: '#fff',
    fontSize: 13,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a', // Dark background color
    padding: 15,
  },
  modalTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // White text color

    paddingTop: 40,
  },
  spocItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    backgroundColor: '#1f1f1f', // Darker background color
  },
  selectedSpocItem: {
    backgroundColor: '#2c3e50', // Selected background color
  },
  spocText: {
    color: '#fff',
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#128C7E', // Button background color
    paddingVertical: 10,
    width: '60%',
    borderRadius: 15,
    marginTop: 20,
    justifyContent: 'center',

    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#e74c3c', // Button background color
    paddingVertical: 10,
    width: '60%',
    borderRadius: 15,
    marginTop: 20,
    justifyContent: 'center',

    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff', // White text color
    fontSize: 18,
    fontWeight: 'bold',
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

export default Super_User_Assign_Companies;
