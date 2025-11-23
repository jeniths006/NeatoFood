import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/places'; // change host if needed

export default function ComparisonScreen({ route, navigation }) {
  const { category, item } = route.params;
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPlaces();
  }, [category, item]);

  const loadPlaces = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(API_URL, {
        params: { category, item },
      });

      const sorted = [...response.data].sort((a, b) => a.price - b.price);
      setPlaces(sorted);
    } catch (err) {
      console.error('Error loading places:', err);
      setError('Could not load data from backend, using placeholder data.');
      loadPlaceholderData();
    } finally {
      setLoading(false);
    }
  };

  // fallback demo data with same shape as backend
  const loadPlaceholderData = () => {
    const placeholder = [
      {
        id: 1,
        name: 'Campus Coffee Shop',
        baseItem: item,
        price: 3.5,
        rating: 4.5,
        address: '123 University Road, Leicester LE1 7RH',
        reviewSummary:
            'Popular with students, good quality drinks and fair prices.',
      },
      {
        id: 2,
        name: 'Student Union Cafe',
        baseItem: item,
        price: 3.2,
        rating: 4.2,
        address: 'Percy Gee Building, Leicester LE1 7RH',
        reviewSummary:
            'Great vibes and convenient location, sometimes busy at lunch.',
      },
    ];
    setPlaces(placeholder);
  };

  const getCategoryLabel = () =>
      category.charAt(0).toUpperCase() + category.slice(1);

  const renderStars = (rating) => {
    if (rating == null) return 'N/A';
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) stars.push('⭐');
    if (hasHalfStar) stars.push('✨');
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
            <button
                style={webStyles.btnLight}
                onClick={() => navigation.navigate('Home')}
            >
              ← Back to Home
            </button>
            <button
                style={webStyles.btnLight}
                onClick={() => navigation.navigate('Areas')}
            >
              Areas
            </button>
            <button
                style={webStyles.btnLight}
                onClick={() => navigation.navigate('AboutUs')}
            >
              About Us
            </button>
            <button
                style={webStyles.btnLight}
                onClick={() => navigation.navigate('Map')}
            >
              Map
            </button>
          </div>
          <div style={webStyles.mainContent}>
            <div style={webStyles.contentCard}>
              <h1 style={webStyles.pageTitle}>
                Cheapest Places for {item} ({getCategoryLabel()})
              </h1>
              {loading ? (
                  <p>Loading...</p>
              ) : places.length === 0 ? (
                  <p>No places found for this category + item</p>
              ) : (
                  <table style={webStyles.table}>
                    <thead>
                    <tr style={webStyles.tableHeader}>
                      <th style={webStyles.th}>Place Name</th>
                      <th style={webStyles.th}>Item</th>
                      <th style={webStyles.th}>Price</th>
                      <th style={webStyles.th}>Rating</th>
                      <th style={webStyles.th}>AI Summary</th>
                      <th style={webStyles.th}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {places.map((place) => (
                        <tr key={place.id} style={webStyles.tableRow}>
                          <td style={webStyles.td}>{place.name}</td>
                          <td style={webStyles.td}>{place.baseItem}</td>
                          <td style={webStyles.td}>
                            £{place.price?.toFixed(2)}
                          </td>
                          <td style={webStyles.td}>
                            {renderStars(place.rating)}{' '}
                            {place.rating != null
                                ? place.rating.toFixed(1)
                                : 'N/A'}
                          </td>
                          <td style={webStyles.td}>
                            {place.reviewSummary || 'No summary yet'}
                          </td>
                          <td style={webStyles.td}>
                            <button
                                style={webStyles.detailsBtn}
                                onClick={() =>
                                    navigation.navigate('PlaceDetails', { place })
                                }
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
              )}
              {error && (
                  <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>
              )}
            </div>
          </div>
        </div>
    );
  }
  return null;
}

const webStyles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: '#d3d3d3',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#c89797',
    padding: '40px 20px',
    overflowY: 'auto',
  },
  logoContainer: { textAlign: 'center', marginBottom: '30px' },
  logoPlaceholder: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: '30px 10px',
    borderRadius: '8px',
  },
  brandName: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginTop: '10px',
  },
  btnLight: {
    backgroundColor: '#e8e8e8',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '10px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    color: '#333',
    fontSize: '15px',
    width: '100%',
  },
  mainContent: { flex: 1, overflow: 'auto', padding: '40px' },
  contentCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  pageTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '30px',
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { backgroundColor: '#2a9d8f', color: 'white' },
  th: { padding: '15px', textAlign: 'left', fontWeight: 'bold' },
  tableRow: { borderBottom: '1px solid #e8e8e8' },
  td: { padding: '15px', color: '#555' },
  detailsBtn: {
    backgroundColor: '#2a9d8f',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
  },
};
