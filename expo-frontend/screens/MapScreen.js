import React, { useState } from 'react';
import { Platform } from 'react-native';

export default function MapScreen({ navigation }) {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const places = [
    { id: 1, name: 'Campus Coffee Shop', address: '123 University Road, Leicester LE1 7RH', category: 'Café', rating: 4.5, priceRange: '£2-£5', coordinates: { lat: 52.6210, lng: -1.1244 }, specialties: 'Coffee, Pastries, Sandwiches' },
    { id: 2, name: 'Student Union Cafe', address: 'Percy Gee Building, Leicester LE1 7RH', category: 'Café & Bar', rating: 4.3, priceRange: '£3-£7', coordinates: { lat: 52.6205, lng: -1.1250 }, specialties: 'Drinks, Snacks, Hot Food' },
    { id: 3, name: 'Library Café', address: 'David Wilson Library, Leicester LE1 7RH', category: 'Café', rating: 4.2, priceRange: '£2-£6', coordinates: { lat: 52.6215, lng: -1.1238 }, specialties: 'Coffee, Study Snacks' },
    { id: 4, name: 'Sweet Treats Bakery', address: '45 High Street, Leicester LE1 5YN', category: 'Bakery', rating: 4.7, priceRange: '£3-£6', coordinates: { lat: 52.6343, lng: -1.1314 }, specialties: 'Cakes, Pastries' },
    { id: 5, name: 'Fresh Bites Deli', address: '23 Gallowtree Gate, Leicester LE1 1DA', category: 'Deli', rating: 4.6, priceRange: '£5-£8', coordinates: { lat: 52.6351, lng: -1.1345 }, specialties: 'Sandwiches, Salads' },
    { id: 6, name: 'Patisserie Le Bon', address: '78 Market Place, Leicester LE1 5GF', category: 'Patisserie', rating: 4.8, priceRange: '£3-£7', coordinates: { lat: 52.6362, lng: -1.1372 }, specialties: 'French Pastries' },
  ];

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
          <button style={webStyles.btnLight} onClick={() => navigation.navigate('Home')}>🏠 Home</button>
          <button style={webStyles.btnLight} onClick={() => navigation.navigate('Areas')}>Areas</button>
          <button style={webStyles.btnLight} onClick={() => navigation.navigate('AboutUs')}>About Us</button>
          <button style={{...webStyles.btnLight, ...webStyles.btnActive}}>Map</button>
        </div>
        
        <div style={webStyles.mainContent}>
          <div style={webStyles.splitContainer}>
            {/* Map Section */}
            <div style={webStyles.mapSection}>
              <h2 style={webStyles.mapTitle}>Leicester Food Map</h2>
              <div style={webStyles.mapContainer}>
                <div style={webStyles.mapPlaceholder}>
                  <div style={webStyles.mapOverlay}>
                    <p style={webStyles.mapText}>🗺️ Interactive Map</p>
                    <p style={webStyles.mapSubtext}>University of Leicester & City Centre</p>
                  </div>
                  
                  {/* University Area Pins */}
                  <div style={{...webStyles.mapArea, top: '25%', left: '30%'}}>
                    <h4 style={webStyles.areaLabel}>University Campus</h4>
                    {places.slice(0, 3).map((place, index) => (
                      <button 
                        key={place.id}
                        style={{
                          ...webStyles.mapPin,
                          top: `${index * 40}px`,
                          left: `${index * 30}px`,
                          ...(selectedPlace?.id === place.id ? webStyles.mapPinActive : {})
                        }}
                        onClick={() => setSelectedPlace(place)}
                      >
                        📍
                      </button>
                    ))}
                  </div>
                  
                  {/* City Centre Pins */}
                  <div style={{...webStyles.mapArea, top: '60%', left: '55%'}}>
                    <h4 style={webStyles.areaLabel}>City Centre</h4>
                    {places.slice(3, 6).map((place, index) => (
                      <button 
                        key={place.id}
                        style={{
                          ...webStyles.mapPin,
                          top: `${index * 35}px`,
                          left: `${index * 25}px`,
                          ...(selectedPlace?.id === place.id ? webStyles.mapPinActive : {})
                        }}
                        onClick={() => setSelectedPlace(place)}
                      >
                        📍
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Places List Section */}
            <div style={webStyles.listSection}>
              <h2 style={webStyles.listTitle}>All Places ({places.length})</h2>
              <div style={webStyles.placesList}>
                {places.map((place) => (
                  <div 
                    key={place.id}
                    style={{
                      ...webStyles.placeCard,
                      ...(selectedPlace?.id === place.id ? webStyles.placeCardActive : {})
                    }}
                    onClick={() => setSelectedPlace(place)}
                  >
                    <div style={webStyles.placeCardHeader}>
                      <h3 style={webStyles.placeCardName}>{place.name}</h3>
                      <span style={webStyles.categoryBadge}>{place.category}</span>
                    </div>
                    <div style={webStyles.placeCardRating}>
                      <span>{renderStars(place.rating)}</span>
                      <span style={webStyles.ratingText}>{place.rating}</span>
                    </div>
                    <p style={webStyles.placeCardDetail}>💰 {place.priceRange}</p>
                    <p style={webStyles.placeCardDetail}>🍴 {place.specialties}</p>
                    <p style={webStyles.placeCardDetail}>📍 {place.address}</p>
                  </div>
                ))}
              </div>
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
  mainContent: { flex: 1, overflow: 'hidden' },
  splitContainer: { display: 'flex', height: '100%' },
  mapSection: { flex: 1, padding: '30px', overflow: 'hidden' },
  mapTitle: { fontSize: '28px', fontWeight: 'bold', color: '#333', marginBottom: '20px', marginTop: 0 },
  mapContainer: { height: 'calc(100% - 60px)', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden' },
  mapPlaceholder: { width: '100%', height: '100%', backgroundColor: '#e8f4f3', position: 'relative', backgroundImage: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px' },
  mapOverlay: { position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(255,255,255,0.95)', padding: '15px 30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center' },
  mapText: { fontSize: '20px', fontWeight: 'bold', color: '#2a9d8f', margin: '0 0 5px 0' },
  mapSubtext: { fontSize: '14px', color: '#666', margin: 0 },
  mapArea: { position: 'absolute' },
  areaLabel: { fontSize: '14px', fontWeight: 'bold', color: '#2a9d8f', backgroundColor: 'white', padding: '8px 12px', borderRadius: '8px', margin: '0 0 10px 0', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', whiteSpace: 'nowrap' },
  mapPin: { position: 'absolute', fontSize: '32px', background: 'none', border: 'none', cursor: 'pointer', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))', transition: 'transform 0.2s', padding: 0 },
  mapPinActive: { transform: 'scale(1.3)', filter: 'drop-shadow(0 4px 8px rgba(42,157,143,0.5))' },
  listSection: { width: '400px', backgroundColor: 'white', padding: '30px', borderLeft: '1px solid #e8e8e8', display: 'flex', flexDirection: 'column' },
  listTitle: { fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '20px', marginTop: 0 },
  placesList: { flex: 1, overflowY: 'auto', paddingRight: '10px' },
  placeCard: { backgroundColor: '#f8f9fa', borderRadius: '12px', padding: '20px', marginBottom: '15px', cursor: 'pointer', border: '2px solid transparent', transition: 'all 0.2s' },
  placeCardActive: { backgroundColor: '#e8f4f3', borderColor: '#2a9d8f' },
  placeCardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' },
  placeCardName: { fontSize: '18px', fontWeight: 'bold', color: '#333', margin: 0, flex: 1 },
  categoryBadge: { backgroundColor: '#2a9d8f', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '600' },
  placeCardRating: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' },
  ratingText: { fontSize: '14px', fontWeight: '600', color: '#666' },
  placeCardDetail: { fontSize: '13px', color: '#555', marginBottom: '6px' },
};
