import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TextInput,
  FlatList,
  ImageBackground,
} from 'react-native';
import React, { useState } from 'react';

export default function CountriesList() {
  const [newCountry, setNewCountry] = useState('');
  const [countriesList, setCountriesList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  const addCountry = () => {
    if (newCountry.trim() === '') {
      Alert.alert('Counry is required');
      setNewCountry('');

      return;
    }
    setCountriesList((currentList) => [
      ...currentList,
      { id: Math.random().toString(), cName: newCountry },
    ]);
    setNewCountry('');
  };

  const handleSearch = () => {
    const filtered = countriesList.filter((country) =>
      country.cName.includes(searchText)
    );
    setFilteredCountries(filtered);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.img}
        source={{
          uri: 'https://i.etsystatic.com/13925266/r/il/d7c835/2010673190/il_1588xN.2010673190_d5q7.jpg',
        }}
      >
        <Text style={styles.header}>Countries List App</Text>
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <TextInput
            style={styles.input}
            placeholder="Enter a new country"
            value={newCountry}
            onChangeText={(txt) => setNewCountry(txt)}
          />
          <Button title="Add" onPress={addCountry} />
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <TextInput
            style={styles.input}
            placeholder="Search country"
            value={searchText}
            onChangeText={(txt) => setSearchText(txt)}
          />
          <Button title="Calculate" onPress={handleSearch} />
        </View>
        <FlatList
          data={
            filteredCountries.length > 0 ? filteredCountries : countriesList
          }
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Button
                title={item.cName}
                onPress={() => Alert.alert(item.cName)}
                color="red"
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    borderColor: 'black',
    borderBottomWidth: 1,
    width: '60%',
    marginRight: 10,
  },
  listItem: {
    backgroundColor: 'whitesmoke',
    borderRadius: 15,
    minHeight: 50,
    minWidth: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },
  img: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
