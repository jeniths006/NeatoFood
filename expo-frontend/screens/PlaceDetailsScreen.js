import React from 'react';
import { Platform } from 'react-native';

export default function PlaceDetailsScreen({ route, navigation }) {
  const { place } = route.params;

  const handleOpenMaps = () => {
    alert(`This would open:\n${place.place}\n${place.address}\n\n(Feature not yet implemented)`);
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
          <button style={webStyles.btnLight} onClick={() => navigation.navigate('Home')}>🏠 Home</button>
          <button style={webStyles.btnLight} onClick={() => navigation.goBack()}>← Back to Comparison</button>
          <button style={webStyles.btnLight} onClick={() => navigation.navigate('Areas')}>Areas</button>
          <button style={webStyles.btnLight} onClick={() => navigation.navigate('AboutUs')}>About Us</button>
          <button style={webStyles.btnLight} onClick={() => navigation.navigate('Map')}>Map</button>
        </div>
        <div style={webStyles.mainContent}>
          <div style={webStyles.detailsCard}>
            <div style={webStyles.header}>
              <h1 style={webStyles.placeName}>{place.place}</h1>
              <div style={webStyles.ratingContainer}>
                <span style={webStyles.ratingStars}>{renderStars(place.rating)}</span>
                <span style={webStyles.ratingText}>{place.rating} ({place.reviewCount || 0} reviews)</span>
              </div>
            </div>
            
            <hr style={webStyles.divider} />
            
            <div style={webStyles.section}>
              <h3 style={webStyles.sectionLabel}>📍 Address</h3>
              <p style={webStyles.addressText}>{place.address || 'Address not available'}</p>
            </div>
            
            <div style={webStyles.section}>
              <h3 style={webStyles.sectionLabel}>🍽️ Item</h3>
              <p style={webStyles.itemText}>{place.item}</p>
            </div>
            
            <div style={webStyles.section}>
              <h3 style={webStyles.sectionLabel}>💰 Price</h3>
              <p style={webStyles.priceText}>£{place.price.toFixed(2)}</p>
            </div>
            
            <hr style={webStyles.divider} />
            
            <div style={webStyles.actionButtons}>
              <button style={webStyles.mapsButton} onClick={handleOpenMaps}>
                🗺️ Open in Google Maps
              </button>
              <button style={webStyles.backButton} onClick={() => navigation.goBack()}>
                ← Back to Comparison
              </button>
            </div>
            
            <div style={webStyles.infoBox}>
              <p style={webStyles.infoText}>
                💡 Tip: Visit during off-peak hours for the best experience!
              </p>
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
  mainContent: { flex: 1, overflow: 'auto', padding: '40px' },
  detailsCard: { backgroundColor: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  header: { marginBottom: '20px' },
  placeName: { fontSize: '36px', fontWeight: 'bold', color: '#333', margin: '0 0 10px 0' },
  ratingContainer: { display: 'flex', alignItems: 'center', gap: '10px' },
  ratingStars: { fontSize: '20px' },
  ratingText: { fontSize: '16px', color: '#666' },
  divider: { border: 'none', borderTop: '1px solid #e8e8e8', margin: '20px 0' },
  section: { marginBottom: '25px' },
  sectionLabel: { fontSize: '18px', fontWeight: 'bold', color: '#2a9d8f', margin: '0 0 8px 0' },
  addressText: { fontSize: '16px', color: '#555', margin: 0 },
  itemText: { fontSize: '18px', color: '#333', fontWeight: '600', margin: 0 },
  priceText: { fontSize: '24px', color: '#2a9d8f', fontWeight: 'bold', margin: 0 },
  actionButtons: { display: 'flex', gap: '15px', marginBottom: '20px' },
  mapsButton: { flex: 1, backgroundColor: '#2a9d8f', color: 'white', padding: '15px', borderRadius: '10px', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
  backButton: { flex: 1, backgroundColor: '#e8e8e8', color: '#333', padding: '15px', borderRadius: '10px', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
  infoBox: { backgroundColor: '#f0f9ff', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #2a9d8f' },
  infoText: { margin: 0, fontSize: '15px', color: '#555' },
};
