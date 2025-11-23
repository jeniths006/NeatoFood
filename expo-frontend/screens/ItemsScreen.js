import React, { useState } from 'react';
import { Platform } from 'react-native';

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
                        <p style={webStyles.subtitle}>Compare food prices across Leicester campus and city centre</p>

                        <div style={webStyles.categorySection}>
                            <h2 style={webStyles.sectionTitle}>Select a Category</h2>
                            <div style={webStyles.categoryGrid}>
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        style={{
                                            ...webStyles.categoryCard,
                                            ...(selectedCategory === cat.id ? webStyles.selectedCard : {})
                                        }}
                                        onClick={() => setSelectedCategory(cat.id)}
                                    >
                                        <span style={webStyles.categoryIcon}>{cat.icon}</span>
                                        <span style={webStyles.categoryLabel}>{cat.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {selectedCategory && (
                            <button
                                style={webStyles.compareBtn}
                                onClick={handleCompare}
                            >
                                Compare Prices →
                            </button>
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
    compareBtn: {
        backgroundColor: '#2a9d8f',
        color: 'white',
        padding: '15px 40px',
        borderRadius: '10px',
        border: 'none',
        fontSize: '18px',
        fontWeight: 'bold',
        cursor: 'pointer',
        width: '100%',
        maxWidth: '300px',
        display: 'block',
        margin: '0 auto',
    },
};
