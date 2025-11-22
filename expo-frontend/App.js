import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:8080';
const { width } = Dimensions.get('window');

export default function App() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const loadItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/items`);
      setItems(response.data);
    } catch (error) {
      console.error('API Error:', error);
      // Load placeholder data if backend unavailable
      setItems([
        { id: 1, name: 'Latte', category: 'Drinks', price: 3.50 },
        { id: 2, name: 'Cappuccino', category: 'Drinks', price: 3.75 },
        { id: 3, name: 'Chocolate Cake', category: 'Desserts', price: 4.50 },
        { id: 4, name: 'Cheesecake', category: 'Desserts', price: 5.00 },
        { id: 5, name: 'Club Sandwich', category: 'Sandwiches', price: 6.50 },
        { id: 6, name: 'BLT', category: 'Sandwiches', price: 5.75 },
        { id: 7, name: 'Crisps', category: 'Snacks', price: 1.50 },
        { id: 8, name: 'Muffin', category: 'Snacks', price: 2.50 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const categories = ['Drinks', 'Desserts', 'Sandwiches', 'Snacks'];

  const getItemsByCategory = (category) => {
    return items.filter(item => item.category === category);
  };

  const filteredCategories = categories.filter(cat => 
    cat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>Logo here</Text>
          </View>
          <Text style={styles.brandName}>NeatoFood</Text>
        </View>

        <TouchableOpacity style={styles.btnLight}>
          <Text style={styles.btnText}>Areas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.areaLink}>
          <Text style={styles.areaLinkText}>University of Leicester</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.areaLink}>
          <Text style={styles.areaLinkText}>Leicester City Centre</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btnLight, styles.mt20]}>
          <Text style={styles.btnText}>About Us</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.btnLight}>
          <Text style={styles.btnText}>Map</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Top Navigation */}
        <View style={styles.topNav}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="search for a cafe or an item"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          
          <View style={styles.authButtons}>
            <TouchableOpacity style={styles.btnOutline}>
              <Text style={styles.btnOutlineText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnOutline}>
              <Text style={styles.btnOutlineText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories Grid */}
        <ScrollView style={styles.scrollContent}>
          <View style={styles.categoriesGrid}>
            {filteredCategories.map((category) => (
              <View key={category} style={styles.categoryCard}>
                <Text style={styles.categoryTitle}>{category}</Text>
                <View style={styles.categoryContent}>
                  {getItemsByCategory(category).map((item) => (
                    <View key={item.id} style={styles.itemCard}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemPrice}>£{item.price.toFixed(2)}</Text>
                    </View>
                  ))}
                  {getItemsByCategory(category).length === 0 && (
                    <Text style={styles.emptyText}>No items available</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

// Bootstrap-inspired StyleSheet
const styles = StyleSheet.create({
  // Container with Bootstrap row/col layout
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#d3d3d3',
  },
  
  // Sidebar (Bootstrap col-md-3 equivalent)
  sidebar: {
    width: 250,
    backgroundColor: '#c89797',
    padding: 20,
    paddingTop: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoPlaceholder: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  logoText: {
    fontWeight: '600',
    color: '#333',
  },
  brandName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  
  // Bootstrap btn-light class
  btnLight: {
    backgroundColor: '#e8e8e8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  btnText: {
    fontWeight: '600',
    color: '#333',
    fontSize: 15,
  },
  areaLink: {
    padding: 10,
    marginBottom: 8,
    alignItems: 'center',
  },
  areaLinkText: {
    color: '#333',
    fontSize: 14,
  },
  mt20: {
    marginTop: 20,
  },
  
  // Main Content (Bootstrap col-md-9 equivalent)
  mainContent: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  
  // Top Navigation Bar
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  
  // Bootstrap form-control search
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginRight: 20,
    maxWidth: 500,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchIcon: {
    marginRight: 10,
    fontSize: 18,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 15,
  },
  
  // Auth buttons container
  authButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  
  // Bootstrap btn-outline class
  btnOutline: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  btnOutlineText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 14,
  },
  
  // Categories Grid (Bootstrap row with cols)
  scrollContent: {
    flex: 1,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  
  // Bootstrap card class
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    minHeight: 300,
    width: width > 768 ? (width - 290 - 60) / 2 : width - 290 - 40,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  categoryContent: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 10,
  },
  
  // Item cards within categories
  itemCard: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2a9d8f',
  },
  emptyText: {
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});
