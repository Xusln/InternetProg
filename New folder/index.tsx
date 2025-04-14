import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const books = [
  { id: '1', title: 'Book One', author: 'Author One', image: 'https://via.placeholder.com/100' },
  { id: '2', title: 'Book Two', author: 'Author Two', image: 'https://via.placeholder.com/100' },
  { id: '3', title: 'Book Three', author: 'Author Three', image: 'https://via.placeholder.com/100' },
];

const BookList = () => {
  const [search, setSearch] = useState('');

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBox}
        placeholder="Search books..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredBooks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.author}>{item.author}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="For You" component={BookList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  searchBox: { padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 10 },
  card: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#ddd' },
  image: { width: 50, height: 50, borderRadius: 8 },
  details: { marginLeft: 10 },
  title: { fontSize: 16, fontWeight: 'bold' },
  author: { fontSize: 14, color: '#555' },
});
