import React, { useState, useEffect, useRef} from 'react';
import { Platform } from 'react-native';

const GOOGLE_MAPS_EMBED_KEY = "AIzaSyCgKWMrQpYMqLo8AeiZw_1Mf5TvIJEalLE"; // <-- important

export default function MapScreen({ navigation }) {
  const places = [
    {
      id: 1,
      name: 'Campus Coffee Shop',
      address: '123 University Road, Leicester LE1 7RH',
      category: 'Café',
      rating: 4.5,
      priceRange: '£2-£5',
      specialties: 'Coffee, Pastries, Sandwiches',
    },
    {
      id: 2,
      name: 'Student Union Cafe',
      address: 'Percy Gee Building, Leicester LE1 7RH',
      category: 'Café & Bar',
      rating: 4.3,
      priceRange: '£3-£7',
      specialties: 'Drinks, Snacks, Hot Food',
    },
    {
      id: 3,
      name: 'Library Café',
      address: 'David Wilson Library, Leicester LE1 7RH',
      category: 'Café',
      rating: 4.2,
      priceRange: '£2-£6',
      specialties: 'Coffee, Study Snacks',
    },
    {
      id: 4,
      name: 'Sweet Treats Bakery',
      address: '45 High Street, Leicester LE1 5YN',
      category: 'Bakery',
      rating: 4.7,
      priceRange: '£3-£6',
      specialties: 'Cakes, Pastries',
    },
    {
      id: 5,
      name: 'Fresh Bites Deli',
      address: '23 Gallowtree Gate, Leicester LE1 1DA',
      category: 'Deli',
      rating: 4.6,
      priceRange: '£5-£8',
      specialties: 'Sandwiches, Salads',
    },
    {
      id: 6,
      name: 'Patisserie Le Bon',
      address: '78 Market Place, Leicester LE1 5GF',
      category: 'Patisserie',
      rating: 4.8,
      priceRange: '£3-£7',
      specialties: 'French Pastries',
    },
  ];

  const [selectedPlace, setSelectedPlace] = useState(places[0] || null);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    for (let i = 0; i < fullStars; i++) stars.push('⭐');
    if (hasHalfStar) stars.push('✨');
    return stars.join('');
  };

  const handleOpenMaps = (place) => {
    const query = encodeURIComponent(`${place.name} ${place.address}`);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    } else {
      alert('Open this in a browser to view Google Maps.');
    }
  };

  const buildMapUrl = (place) => {
    if (!GOOGLE_MAPS_EMBED_KEY) return null;

    if (!place) {
      const defaultQuery = encodeURIComponent(
          'University of Leicester, Leicester'
      );
      return `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_EMBED_KEY}&q=${defaultQuery}`;
    }

    const query = encodeURIComponent(`${place.name} ${place.address}`);
    return `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_EMBED_KEY}&q=${query}`;
  };

  const mapUrl = buildMapUrl(selectedPlace);

  if (Platform.OS === 'web') {
    return (
        <div style={webStyles.container}>
          {/* Sidebar */}
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
              🏠 Home
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
            <button style={{ ...webStyles.btnLight, ...webStyles.btnActive }}>
              Map
            </button>
          </div>

          {/* Main content */}
          <div style={webStyles.mainContent}>
            <div style={webStyles.splitContainer}>
              {/* Map section */}
              <div style={webStyles.mapSection}>
                <h2 style={webStyles.mapTitle}>Leicester Food Map</h2>
                <div style={webStyles.mapContainer}>
                  {mapUrl ? (
                      <iframe
                          key={mapUrl} // force refresh when URL changes
                          src={mapUrl}
                          style={webStyles.mapIframe}
                          loading="lazy"
                          allowFullScreen
                          referrerPolicy="no-referrer-when-downgrade"
                          title="NeatoFood Map"
                      />
                  ) : (
                      <div style={webStyles.mapPlaceholder}>
                        <p style={webStyles.mapText}>
                          Add a Google Maps Embed API key to see the live map.
                        </p>
                      </div>
                  )}

                  <div style={webStyles.mapOverlay}>
                    <p style={webStyles.mapText}>🗺️ NeatoFood Map View</p>
                    <p style={webStyles.mapSubtext}>
                      Click a place on the right to move the map.
                    </p>
                  </div>
                </div>
              </div>

              {/* List section */}
              <div style={webStyles.listSection}>
                <h2 style={webStyles.listTitle}>All Places ({places.length})</h2>
                <div style={webStyles.placesList}>
                  {places.map((place) => (
                      <div
                          key={place.id}
                          style={{
                            ...webStyles.placeCard,
                            ...(selectedPlace?.id === place.id
                                ? webStyles.placeCardActive
                                : {}),
                          }}
                          onClick={() => setSelectedPlace(place)}
                      >
                        <div style={webStyles.placeCardHeader}>
                          <h3 style={webStyles.placeCardName}>{place.name}</h3>
                          <span style={webStyles.categoryBadge}>
                        {place.category}
                      </span>
                        </div>
                        <div style={webStyles.placeCardRating}>
                          <span>{renderStars(place.rating)}</span>
                          <span style={webStyles.ratingText}>{place.rating}</span>
                        </div>
                        <p style={webStyles.placeCardDetail}>
                          💰 {place.priceRange}
                        </p>
                        <p style={webStyles.placeCardDetail}>
                          🍴 {place.specialties}
                        </p>
                        <p style={webStyles.placeCardDetail}>
                          📍 {place.address}
                        </p>

                        <button
                            style={webStyles.mapsBtn}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenMaps(place);
                            }}
                        >
                          Open in Google Maps
                        </button>
                      </div>
                  ))}
                </div>

                {selectedPlace && (
                    <div style={webStyles.selectedInfo}>
                      <h3 style={webStyles.selectedTitle}>
                        Selected: {selectedPlace.name}
                      </h3>
                      <p style={webStyles.selectedText}>
                        {renderStars(selectedPlace.rating)} • {selectedPlace.rating}{' '}
                        • {selectedPlace.category}
                      </p>
                      <p style={webStyles.selectedText}>
                        {selectedPlace.specialties}
                      </p>
                      <p style={webStyles.selectedText}>
                        {selectedPlace.address}
                      </p>
                    </div>
                )}
              </div>
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
  btnActive: { backgroundColor: '#2a9d8f', color: 'white' },

  mainContent: { flex: 1, overflow: 'hidden' },
  splitContainer: { display: 'flex', height: '100%' },

  mapSection: { flex: 1, padding: '30px', overflow: 'hidden' },
  mapTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
    marginTop: 0,
  },
  mapContainer: {
    height: '100vh',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    position: 'relative',
  },
  mapIframe: {
    border: '0',
    width: '100%',
    height: '100%',
  },
  mapPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapOverlay: {
    position: 'absolute',
    top: '16px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: '10px 24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  mapText: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#2a9d8f',
    margin: '0 0 4px 0',
  },
  mapSubtext: { fontSize: '13px', color: '#666', margin: 0 },

  listSection: {
    width: '420px',
    backgroundColor: 'white',
    padding: '30px',
    borderLeft: '1px solid #e8e8e8',
    display: 'flex',
    flexDirection: 'column',
  },
  listTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
    marginTop: 0,
  },
  placesList: {
    flex: 1,
    overflowY: 'auto',
    paddingRight: '10px',
  },
  placeCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '12px',
    cursor: 'pointer',
    border: '2px solid transparent',
    transition: 'all 0.2s',
  },
  placeCardActive: {
    backgroundColor: '#e8f4f3',
    borderColor: '#2a9d8f',
  },
  placeCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: '6px',
  },
  placeCardName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: '#2a9d8f',
    color: 'white',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '600',
  },
  placeCardRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '6px',
  },
  ratingText: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#666',
  },
  placeCardDetail: {
    fontSize: '13px',
    color: '#555',
    marginBottom: '4px',
  },
  mapsBtn: {
    marginTop: '8px',
    backgroundColor: '#2a9d8f',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },

  selectedInfo: {
    marginTop: '14px',
    padding: '12px',
    backgroundColor: '#f0f9ff',
    borderRadius: '10px',
    borderLeft: '4px solid #2a9d8f',
  },
  selectedTitle: {
    fontSize: '16px',
    fontWeight: '700',
    margin: '0 0 4px 0',
    color: '#111827',
  },
  selectedText: { fontSize: '13px', color: '#4b5563', margin: '2px 0' },
};
