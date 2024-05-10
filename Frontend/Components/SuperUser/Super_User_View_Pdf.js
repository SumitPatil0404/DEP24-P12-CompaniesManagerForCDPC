import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  keyText: {
    fontWeight: 'bold',
    color: '#007bff', // Blue color for keys
    fontSize: 16,
    marginBottom: 5,
  },
  valueText: {
    marginLeft: 20, // Indentation for nested values
    fontSize: 16,
    marginBottom: 5,
  },
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

const RenderJSON = ({ data }) => {
  if (Array.isArray(data)) {
    return (
      <View style={styles.container}>
        {data.map((item, index) => (
          <RenderJSON key={index} data={item} />
        ))}
      </View>
    );
  } else if (typeof data === 'object' && data !== null) {
    return (
      <View style={styles.container}>
        {Object.entries(data).map(([key, value], index) => (
          <View key={index}>
            {typeof value !== 'object' || value === null ? (
            <Text style={styles.keyText}>{key +" : "}
             <Text style={[styles.valueText,{color:"#202020"}]}>{value}</Text>
             </Text>
             
            ) : (
              <>
              <Text style={styles.keyText}>{key + " : "}</Text>
              <RenderJSON data={value} />
              </>
            )}
          </View>
        ))}
      </View>
    );
  } else {
    return <Text style={styles.valueText}>{data}</Text>;
  }
};

const Super_User_View_Pdf = ({ route }) => {
  const { jsonData } = route.params;

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <RenderJSON data={jsonData} />
    </ScrollView>
  );
};

export default Super_User_View_Pdf;
