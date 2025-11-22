import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:8080';

export default function ComparisonScreen({ route, navigation }) {
  const { category } = route.params;
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlaces();
  }, [category]);

  const loadPlaces = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/items`);
      const filteredItems = response.data.filter(
        item => item.category?.toLowerCase() === category.toLowerCase()
      );
      
      const placeMap = {};
      filteredItems.forEach(item => {
        const placeName = item.place || 'Campus Cafe';
        if (!placeMap[placeName] || item.price < placeMap[placeName].price) {
          placeMap[placeName] = item;
        }
      });
      
      const placesArray = Object.values(placeMap).sort((a, b) => a.price - b.price);
      setPlaces(placesArray);
    } catch (error) {
      console.error('Error loading places:', error);
      loadPlaceholderData();
    } finally {
      setLoading(false);
    }
  };

  const loadPlaceholderData = () => {
    const placeholderData = {
      drinks: [
        { id: 1, place: 'Campus Coffee Shop', item: 'Latte', price: 3.50, rating: 4.5, reviewCount: 120, address: '123 University Road, Leicester LE1 7RH' },
        { id: 2, place: 'Student Union Cafe', item: 'Cappuccino', price: 3.20, rating: 4.3, reviewCount: 95, address: 'Percy Gee Building, Leicester LE1 7RH' },
        { id: 3, place: 'Library Café', item: 'Americano', price: 2.80, rating: 4.2, reviewCount: 78, address: 'David Wilson Library, Leicester LE1 7RH' },
        { id: 4, place: 'Engineering Building Cafe', item: 'Filter Coffee', price: 2.50, rating: 4.0, reviewCount: 45, address: 'Engineering Building, Leicester LE1 7RH' },
      ],
      desserts: [
        { id: 5, place: 'Sweet Treats Bakery', item: 'Chocolate Cake', price: 4.50, rating: 4.7, reviewCount: 150, address: '45 High Street, Leicester LE1 5YN' },
        { id: 6, place: 'Campus Coffee Shop', item: 'Cheesecake', price: 4.20, rating: 4.5, reviewCount: 89, address: '123 University Road, Leicester LE1 7RH' },
        { id: 7, place: 'Patisserie Le Bon', item: 'Brownie', price: 3.80, rating: 4.6, reviewCount: 112, address: '78 Market Place, Leicester LE1 5GF' },
        { id: 8, place: 'Student Union Cafe', item: 'Muffin', price: 2.50, rating: 4.1, reviewCount: 67, address: 'Percy Gee Building, Leicester LE1 7RH' },
      ],
      sandwiches: [
        { id: 9, place: 'Fresh Bites Deli', item: 'Club Sandwich', price: 6.50, rating: 4.6, reviewCount: 134, address: '23 Gallowtree Gate, Leicester LE1 1DA' },
        { id: 10, place: 'Campus Grill', item: 'BLT', price: 5.75, rating: 4.4, reviewCount: 98, address: '123 University Road, Leicester LE1 7RH' },
        { id: 11, place: 'Subway University', item: 'Veggie Delite', price: 5.50, rating: 4.2, reviewCount: 156, address: '56 London Road, Leicester LE2 0QD' },
        { id: 12, place: 'Pret A Manger', item: 'Tuna Baguette', price: 5.25, rating: 4.3, reviewCount: 203, address: '12 Market Street, Leicester LE1 6DN' },
      ],
      snacks: [
        { id: 13, place: 'Campus Shop', item: 'Crisps', price: 1.50, rating: 4.0, reviewCount: 45, address: '123 University Road, Leicester LE1 7RH' },
        { id: 14, place: 'Vending Machine Hub', item: 'Chocolate Bar', price: 1.20, rating: 3.8, reviewCount: 67, address: 'Attenborough Building, Leicester LE1 7RH' },
        { id: 15, place: 'Student Union Shop', item: 'Protein Bar', price: 2.50, rating: 4.2, reviewCount: 89, address: 'Percy Gee Building, Leicester LE1 7RH' },
        { id: 16, place: 'Library Café', item: 'Granola Bar', price: 2.00, rating: 4.1, reviewCount: 34, address: 'David Wilson Library, Leicester LE1 7RH' },
      ],
    };
    setPlaces(placeholderData[category] || []);
  };

  const getCategoryLabel = () => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('✨');
    }
    return stars.join('');
  };

  if (Platform.OS === 'web') {
    return (
      <div style={webStyles.container}>
        <div style={webStyles.sidebar}>
          <div style={webStyles.logoContainer}>
            <div style={webStyles.logoPlaceholder}>
              <span>Logo here</span>
            </div>
            <h2 style={webStyles.brandName}>NeatoFood</h2>
          </div>
          <button style={webStyles.btnLight} onClick={() => navigation.navigate('Home')}>← Back to Home</button>
          <button style={webStyles.btnLight} onClick={() => navigation.navigate('Areas')}>Areas</button>
          <button style={webStyles.btnLight} onClick={() => navigation.navigate('AboutUs')}>About Us</button>
          <button style={webStyles.btnLight} onClick={() => navigation.navigate('Map')}>Map</button>
        </div>
        <div style={webStyles.mainContent}>
          <div style={webStyles.contentCard}>
            <h1 style={webStyles.pageTitle}>Cheapest Places for {getCategoryLabel()}</h1>
            {loading ? (
              <p>Loading...</p>
            ) : places.length === 0 ? (
              <p>No places found for this category</p>
            ) : (
              <table style={webStyles.table}>
                <thead>
                  <tr style={webStyles.tableHeader}>
                    <th style={webStyles.th}>Place Name</th>
                    <th style={webStyles.th}>Item</th>
                    <th style={webStyles.th}>Price</th>
                    <th style={webStyles.th}>Rating</th>
                    <th style={webStyles.th}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {places.map((place, index) => (
                    <tr key={index} style={webStyles.tableRow}>
                      <td style={webStyles.td}>{place.place}</td>
                      <td style={webStyles.td}>{place.item}</td>
                      <td style={webStyles.td}>£{place.price.toFixed(2)}</td>
                      <td style={webStyles.td}>{renderStars(place.rating)} {place.rating}</td>
                      <td style={webStyles.td}>
                        <button style={webStyles.detailsBtn} onClick={() => navigation.navigate('PlaceDetails', { place })}>
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
  }
  return null;
}

const webStyles = {
  container: { display: 'flex', flexDirection: 'row', height: '100vh', overflow: 'hidden', backgroundColor: '#d3d3d3' },
  sidebar: { width: '250px', backgroundColor: '#c89797', padding: '40px 20px', overflowY: 'auto' },
  logoContainer: { textAlign: 'center', marginBottom: '30px' },
  logoPlaceholder: { backgroundColor: 'rgba(255,255,255,0.7)', padding: '30px 10px', borderRadius: '8px' },
  brandName: { fontSize: '24px', fontWeight: 'bold', color: '#333', marginTop: '10px' },
  btnLight: { backgroundColor: '#e8e8e8', borderRadius: '8px', padding: '12px', marginBottom: '10px', border: 'none', cursor: 'pointer', fontWeight: '600', color: '#333', fontSize: '15px', width: '100%' },
  mainContent: { flex: 1, overflow: 'auto', padding: '40px' },
  contentCard: { backgroundColor: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  pageTitle: { fontSize: '36px', fontWeight: 'bold', color: '#333', marginBottom: '30px' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { backgroundColor: '#2a9d8f', color: 'white' },
  th: { padding: '15px', textAlign: 'left', fontWeight: 'bold' },
  tableRow: { borderBottom: '1px solid #e8e8e8' },
  td: { padding: '15px', color: '#555' },
  detailsBtn: { backgroundColor: '#2a9d8f', color: 'white', padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: '600' },
};
