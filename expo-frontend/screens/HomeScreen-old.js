import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    { id: 'drinks', label: 'Drinks', icon: '☕' },
    { id: 'desserts', label: 'Desserts', icon: '🍰' },
    { id: 'sandwiches', label: 'Sandwiches', icon: '🥪' },
    { id: 'snacks', label: 'Snacks', icon: '🍿' }
  ];

  const handleCompare = () => {
    if (selectedCategory) {
      navigation.navigate('Comparison', { category: selectedCategory });
    }
  };

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

        <TouchableOpacity 
          style={styles.btnLight}
          onPress={() => navigation.navigate('Areas')}
        >
          <Text style={styles.btnText}>Areas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.areaLink}
          onPress={() => navigation.navigate('Areas')}
        >
          <Text style={styles.areaLinkText}>University of Leicester</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.areaLink}
          onPress={() => navigation.navigate('Areas')}
        >
          <Text style={styles.areaLinkText}>Leicester City Centre</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.btnLight, styles.mt20]}
          onPress={() => navigation.navigate('AboutUs')}
        >
          <Text style={styles.btnText}>About Us</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.btnLight}
          onPress={() => navigation.navigate('Map')}
        >
          <Text style={styles.btnText}>Map</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.centerContent}>
            <Text style={styles.pageTitle}>Find the Best Deals</Text>
            <Text style={styles.pageSubtitle}>Select a category to compare prices</Text>

            {/* Category Selector */}
            <View style={styles.categorySelector}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category.id && styles.categoryButtonSelected
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text style={[
                    styles.categoryButtonText,
                    selectedCategory === category.id && styles.categoryButtonTextSelected
                  ]}>
                    {category.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Compare Prices Button */}
            <TouchableOpacity
              style={[
                styles.compareButton,
                !selectedCategory && styles.compareButtonDisabled
              ]}
              onPress={handleCompare}
              disabled={!selectedCategory}
            >
              <Text style={styles.compareButtonText}>Compare Prices</Text>
            </TouchableOpacity>

            {!selectedCategory && (
              <Text style={styles.helpText}>Please select a category above</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#d3d3d3',
    height: '100vh',
  },
  
  // Sidebar styles
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
  
  // Main content styles
  mainContent: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 40,
    alignItems: 'center',
  },
  centerContent: {
    maxWidth: 600,
    width: '100%',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  pageSubtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  
  // Category selector styles
  categorySelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 40,
    width: '100%',
  },
  categoryButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: 140,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryButtonSelected: {
    borderColor: '#2a9d8f',
    backgroundColor: '#e8f5f3',
  },
  categoryIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  categoryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  categoryButtonTextSelected: {
    color: '#2a9d8f',
  },
  
  // Compare button styles
  compareButton: {
    backgroundColor: '#2a9d8f',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  compareButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0.05,
  },
  compareButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  helpText: {
    marginTop: 20,
    color: '#999',
    fontSize: 14,
  },
});
