import React from 'react';
import { StyleSheet, Platform } from 'react-native';

export default function AboutUsScreen({ navigation }) {
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
          
          <button style={{...webStyles.btnLight, ...webStyles.btnActive}}>
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
            <h1 style={webStyles.pageTitle}>About NeatoFood</h1>
            
            <div style={webStyles.section}>
              <h2 style={webStyles.sectionTitle}>🍔 Our Mission</h2>
              <p style={webStyles.bodyText}>
                NeatoFood helps students and locals in Leicester find the best food deals around campus and the city centre. 
                We compare prices across different cafes, restaurants, and shops so you can make informed decisions about where to eat.
              </p>
            </div>

            <div style={webStyles.section}>
              <h2 style={webStyles.sectionTitle}>🎯 What We Do</h2>
              <p style={webStyles.bodyText}>
                • Compare prices for drinks, desserts, sandwiches, and snacks<br/>
                • Show ratings and reviews from real customers<br/>
                • Provide location information and directions<br/>
                • Help you find the cheapest options near you<br/>
                • Cover University of Leicester and Leicester City Centre areas
              </p>
            </div>

            <div style={webStyles.section}>
              <h2 style={webStyles.sectionTitle}>🎓 For Students</h2>
              <p style={webStyles.bodyText}>
                We understand student life can be expensive. That's why NeatoFood focuses on helping you stretch your budget 
                further by finding the most affordable food options without compromising on quality. Whether you need a quick 
                coffee between lectures or a filling sandwich for lunch, we've got you covered.
              </p>
            </div>

            <div style={webStyles.section}>
              <h2 style={webStyles.sectionTitle}>📍 Coverage Areas</h2>
              <p style={webStyles.bodyText}>
                <strong>University of Leicester Campus:</strong> Engineering Building, Library Café, Student Union, 
                Percy Gee Building, and more.<br/><br/>
                <strong>Leicester City Centre:</strong> Gallowtree Gate, Market Place, High Street, London Road, 
                and surrounding areas.
              </p>
            </div>

            <div style={webStyles.section}>
              <h2 style={webStyles.sectionTitle}>💡 How It Works</h2>
              <div style={webStyles.stepContainer}>
                <div style={webStyles.step}>
                  <span style={webStyles.stepNumber}>1</span>
                  <span style={webStyles.stepText}>Choose a category (drinks, desserts, sandwiches, or snacks)</span>
                </div>
                <div style={webStyles.step}>
                  <span style={webStyles.stepNumber}>2</span>
                  <span style={webStyles.stepText}>View the comparison table sorted by price</span>
                </div>
                <div style={webStyles.step}>
                  <span style={webStyles.stepNumber}>3</span>
                  <span style={webStyles.stepText}>Check details including ratings and address</span>
                </div>
                <div style={webStyles.step}>
                  <span style={webStyles.stepNumber}>4</span>
                  <span style={webStyles.stepText}>Visit the place and enjoy your meal!</span>
                </div>
              </div>
            </div>

            <div style={webStyles.contactSection}>
              <h2 style={webStyles.sectionTitle}>📧 Contact Us</h2>
              <p style={webStyles.bodyText}>
                Have questions or suggestions? We'd love to hear from you!<br/><br/>
                Email: info@neatofood.com<br/>
                Instagram: @neatofood_leicester<br/>
                Twitter: @neatofood
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Return null or basic view for native platforms
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
  btnActive: {
    backgroundColor: '#2a9d8f',
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
  pageTitle: {
    fontSize: '42px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '30px',
    marginTop: 0,
  },
  section: {
    marginBottom: '30px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2a9d8f',
    marginBottom: '12px',
    marginTop: 0,
  },
  bodyText: {
    fontSize: '16px',
    color: '#555',
    lineHeight: '26px',
    margin: 0,
  },
  stepContainer: {
    marginTop: '15px',
  },
  step: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: '15px',
  },
  stepNumber: {
    width: '36px',
    height: '36px',
    backgroundColor: '#2a9d8f',
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: '36px',
    borderRadius: '18px',
    marginRight: '15px',
    display: 'inline-block',
  },
  stepText: {
    flex: 1,
    fontSize: '16px',
    color: '#555',
    lineHeight: '24px',
    paddingTop: '6px',
  },
  contactSection: {
    marginTop: '20px',
    padding: '25px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    borderLeft: '4px solid #2a9d8f',
  },
};
