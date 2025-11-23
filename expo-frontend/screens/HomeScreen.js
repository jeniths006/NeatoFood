import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';

const API_URL = 'http://localhost:8080'; // change to your IP if needed

export default function HomeScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [itemError, setItemError] = useState('');

  const categories = [
    { id: 'drinks', label: 'Drinks', icon: '☕' },
    { id: 'desserts', label: 'Desserts', icon: '🍰' },
    { id: 'sandwiches', label: 'Sandwiches', icon: '🥪' },
    { id: 'snacks', label: 'Snacks', icon: '🍿' }
  ];

  // when category changes, load items for that category from backend
  useEffect(() => {
    if (!selectedCategory) {
      setItems([]);
      setItemError('');
      return;
    }

    setLoadingItems(true);
    setItemError('');

    fetch(
        `${API_URL}/api/places/items?category=${encodeURIComponent(
            selectedCategory
        )}`
    )
        .then((res) => {
          if (!res.ok) throw new Error('Failed to load items');
          return res.json();
        })
        .then((data) => {
          // backend returns array of strings like ["latte","cappuccino",...]
          setItems(data);
        })
        .catch((err) => {
          console.error(err);
          // fallback items if backend is down
          setItemError('Could not load items, using sample items.');
          if (selectedCategory === 'drinks') {
            setItems(['latte', 'cappuccino', 'americano']);
          } else if (selectedCategory === 'desserts') {
            setItems(['brownie', 'cheesecake', 'cookie']);
          } else if (selectedCategory === 'sandwiches') {
            setItems(['club sandwich', 'BLT', 'veg sandwich']);
          } else if (selectedCategory === 'snacks') {
            setItems(['crisps', 'protein bar', 'granola bar']);
          } else {
            setItems([]);
          }
        })
        .finally(() => setLoadingItems(false));
  }, [selectedCategory]);

  if (Platform.OS === 'web') {
    return (
        <div style={webStyles.container}>
          {/* Sidebar */}
          <div style={webStyles.sidebar}>
            <div style={webStyles.logoContainer}>
              <div style={webStyles.logoPlaceholder}>
                <span style={webStyles.logoText}>Logo here</span>
              </div>
              <h2 style={webStyles.brandName}>NeatoFood</h2>
            </div>

            <button
                style={webStyles.btnLight}
                onClick={() => navigation.navigate('Areas')}
            >
              Areas
            </button>

            <button
                style={webStyles.areaLink}
                onClick={() => navigation.navigate('Areas')}
            >
              University of Leicester
            </button>

            <button
                style={webStyles.areaLink}
                onClick={() => navigation.navigate('Areas')}
            >
              Leicester City Centre
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

          {/* Main Content */}
          <div style={webStyles.mainContent}>
            <div style={webStyles.contentCard}>
              <h1 style={webStyles.title}>Welcome to NeatoFood</h1>
              <p style={webStyles.subtitle}>
                Compare food prices across Leicester campus and city centre
              </p>

              {/* Step 1: select category */}
              <div style={webStyles.categorySection}>
                <h2 style={webStyles.sectionTitle}>1. Select a Category</h2>
                <div style={webStyles.categoryGrid}>
                  {categories.map((cat) => (
                      <button
                          key={cat.id}
                          style={{
                            ...webStyles.categoryCard,
                            ...(selectedCategory === cat.id
                                ? webStyles.selectedCard
                                : {})
                          }}
                          onClick={() => setSelectedCategory(cat.id)}
                      >
                        <span style={webStyles.categoryIcon}>{cat.icon}</span>
                        <span style={webStyles.categoryLabel}>{cat.label}</span>
                      </button>
                  ))}
                </div>
              </div>

              {/* Step 2: select specific item */}
              {selectedCategory && (
                  <div style={{ marginTop: '30px' }}>
                    <h2 style={webStyles.sectionTitle}>
                      2. Select an Item in {selectedCategory}
                    </h2>
                    {loadingItems && <p>Loading items…</p>}
                    {itemError && (
                        <p style={{ color: 'red', marginBottom: '10px' }}>
                          {itemError}
                        </p>
                    )}

                    {items.length === 0 && !loadingItems && (
                        <p>No items found for this category.</p>
                    )}

                    <div style={webStyles.categoryGrid}>
                      {items.map((it) => (
                          <button
                              key={it}
                              style={webStyles.itemCard}
                              onClick={() =>
                                  navigation.navigate('Comparison', {
                                    category: selectedCategory,
                                    item: it
                                  })
                              }
                          >
                            <span style={webStyles.categoryLabel}>{it}</span>
                          </button>
                      ))}
                    </div>
                  </div>
              )}

              {/* We NO LONGER need a separate "Compare Prices" button –
                clicking an item goes straight to Comparison */}
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
    backgroundColor: '#d3d3d3',
    height: '100vh',
    overflow: 'hidden',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#c89797',
    padding: '40px 20px 20px',
    overflowY: 'auto',
  },
  logoContainer: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  logoPlaceholder: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: '30px 10px',
    borderRadius: '8px',
  },
  logoText: {
    fontWeight: '600',
    color: '#333',
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
  areaLink: {
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    padding: '10px 12px',
    marginBottom: '8px',
    marginLeft: '15px',
    border: 'none',
    cursor: 'pointer',
    color: '#555',
    fontSize: '14px',
    width: 'calc(100% - 15px)',
    textAlign: 'left',
  },
  mainContent: {
    flex: 1,
    overflow: 'auto',
    padding: '40px',
  },
  contentCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '42px',
    fontWeight: 'bold',
    color: '#333',
    margin: '0 0 10px 0',
  },
  subtitle: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '40px',
  },
  categorySection: {
    marginBottom: '30px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2a9d8f',
    marginBottom: '20px',
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  categoryCard: {
    backgroundColor: '#fff',
    border: '2px solid #e8e8e8',
    borderRadius: '12px',
    padding: '30px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center',
  },
  selectedCard: {
    backgroundColor: '#2a9d8f',
    borderColor: '#2a9d8f',
    color: 'white',
  },
  categoryIcon: {
    fontSize: '48px',
    display: 'block',
    marginBottom: '15px',
  },
  categoryLabel: {
    fontSize: '18px',
    fontWeight: '600',
  },
  itemCard: {
    backgroundColor: '#fff',
    border: '2px solid #e8e8e8',
    borderRadius: '12px',
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center',
  },
};
