import React, { useState } from 'react';
import { Platform } from 'react-native';

export default function AreasScreen({ navigation }) {
  const [selectedArea, setSelectedArea] = useState('university');

  const areaData = {
    university: {
      name: 'University of Leicester',
      description: 'Campus locations offering affordable food and drinks for students and staff.',
      places: [
        { name: 'Campus Coffee Shop', category: 'Café', specialties: 'Coffee, Pastries, Sandwiches', hours: 'Mon-Fri: 8am-6pm, Sat-Sun: 9am-4pm', building: 'Main Campus Building' },
        { name: 'Student Union Cafe', category: 'Café & Bar', specialties: 'Drinks, Snacks, Hot Food', hours: 'Mon-Fri: 8am-8pm, Sat-Sun: 10am-6pm', building: 'Percy Gee Building' },
        { name: 'Library Café', category: 'Café', specialties: 'Coffee, Study Snacks, Sandwiches', hours: 'Mon-Sun: 7:30am-10pm', building: 'David Wilson Library' },
        { name: 'Engineering Building Cafe', category: 'Café', specialties: 'Quick Bites, Coffee, Lunch Deals', hours: 'Mon-Fri: 8am-5pm', building: 'Engineering Building' },
        { name: 'Campus Shop', category: 'Convenience Store', specialties: 'Snacks, Drinks, Essentials', hours: 'Mon-Fri: 8am-7pm, Sat-Sun: 10am-5pm', building: 'Main Campus' },
      ],
    },
    citycentre: {
      name: 'Leicester City Centre',
      description: 'Popular spots in the heart of Leicester for shopping and dining.',
      places: [
        { name: 'Sweet Treats Bakery', category: 'Bakery', specialties: 'Cakes, Pastries, Coffee', hours: 'Mon-Sat: 8am-6pm, Sun: 9am-5pm', building: '45 High Street' },
        { name: 'Fresh Bites Deli', category: 'Deli', specialties: 'Sandwiches, Salads, Fresh Juice', hours: 'Mon-Sat: 7am-7pm, Sun: 9am-4pm', building: '23 Gallowtree Gate' },
        { name: 'Patisserie Le Bon', category: 'Patisserie', specialties: 'French Pastries, Coffee', hours: 'Mon-Sat: 8am-6pm, Closed Sun', building: '78 Market Place' },
        { name: 'Subway University', category: 'Fast Food', specialties: 'Subs, Wraps, Cookies', hours: 'Mon-Sun: 7am-10pm', building: '56 London Road' },
        { name: 'Pret A Manger', category: 'Café', specialties: 'Sandwiches, Coffee, Snacks', hours: 'Mon-Fri: 6:30am-8pm, Sat-Sun: 8am-6pm', building: '12 Market Street' },
      ],
    },
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
          <button style={webStyles.btnLight} onClick={() => navigation.navigate('Home')}>🏠 Home</button>
          <button style={{...webStyles.btnLight, ...webStyles.btnActive}}>Areas</button>
          <button style={webStyles.btnLight} onClick={() => navigation.navigate('AboutUs')}>About Us</button>
          <button style={webStyles.btnLight} onClick={() => navigation.navigate('Map')}>Map</button>
        </div>
        <div style={webStyles.mainContent}>
          <div style={webStyles.contentCard}>
            <h1 style={webStyles.pageTitle}>Browse by Area</h1>
            
            <div style={webStyles.toggleContainer}>
              <button 
                style={{...webStyles.toggleBtn, ...(selectedArea === 'university' ? webStyles.toggleBtnActive : {})}}
                onClick={() => setSelectedArea('university')}
              >
                🎓 University of Leicester
              </button>
              <button 
                style={{...webStyles.toggleBtn, ...(selectedArea === 'citycentre' ? webStyles.toggleBtnActive : {})}}
                onClick={() => setSelectedArea('citycentre')}
              >
                🏙️ Leicester City Centre
              </button>
            </div>
            
            <div style={webStyles.areaInfo}>
              <h2 style={webStyles.areaName}>{areaData[selectedArea].name}</h2>
              <p style={webStyles.areaDescription}>{areaData[selectedArea].description}</p>
            </div>
            
            <div style={webStyles.placesGrid}>
              {areaData[selectedArea].places.map((place, index) => (
                <div key={index} style={webStyles.placeCard}>
                  <div style={webStyles.placeHeader}>
                    <h3 style={webStyles.placeName}>{place.name}</h3>
                    <span style={webStyles.categoryBadge}>{place.category}</span>
                  </div>
                  <p style={webStyles.placeDetail}><strong>🍴 Specialties:</strong> {place.specialties}</p>
                  <p style={webStyles.placeDetail}><strong>🕐 Hours:</strong> {place.hours}</p>
                  <p style={webStyles.placeDetail}><strong>📍 Location:</strong> {place.building}</p>
                </div>
              ))}
            </div>
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
  btnActive: { backgroundColor: '#2a9d8f', color: 'white' },
  mainContent: { flex: 1, overflow: 'auto', padding: '40px' },
  contentCard: { backgroundColor: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  pageTitle: { fontSize: '36px', fontWeight: 'bold', color: '#333', marginBottom: '30px', marginTop: 0 },
  toggleContainer: { display: 'flex', gap: '15px', marginBottom: '30px' },
  toggleBtn: { flex: 1, padding: '15px', borderRadius: '10px', border: '2px solid #e8e8e8', backgroundColor: 'white', fontSize: '16px', fontWeight: '600', cursor: 'pointer', color: '#333' },
  toggleBtnActive: { backgroundColor: '#2a9d8f', borderColor: '#2a9d8f', color: 'white' },
  areaInfo: { marginBottom: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '12px' },
  areaName: { fontSize: '24px', fontWeight: 'bold', color: '#2a9d8f', margin: '0 0 10px 0' },
  areaDescription: { fontSize: '16px', color: '#666', margin: 0 },
  placesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' },
  placeCard: { backgroundColor: '#fff', border: '1px solid #e8e8e8', borderRadius: '12px', padding: '20px' },
  placeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' },
  placeName: { fontSize: '20px', fontWeight: 'bold', color: '#333', margin: 0, flex: 1 },
  categoryBadge: { backgroundColor: '#2a9d8f', color: 'white', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' },
  placeDetail: { fontSize: '14px', color: '#555', marginBottom: '8px' },
};
