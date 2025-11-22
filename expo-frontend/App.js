import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

// Update this URL to match your Django backend
const API_URL = 'http://localhost:8000/api';

export default function App() {
  const [apiStatus, setApiStatus] = useState('Checking...');
  const [loading, setLoading] = useState(false);

  const checkBackendHealth = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/health/`);
      setApiStatus(`Connected: ${response.data.message}`);
    } catch (error) {
      setApiStatus('Backend not reachable');
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkBackendHealth();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to NeatoFood</Text>
      <Text style={styles.subtitle}>Expo + Django + Spring Boot</Text>
      
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Backend Status:</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Text style={styles.statusText}>{apiStatus}</Text>
        )}
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={checkBackendHealth}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Check Backend</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  statusContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#555',
  },
  statusText: {
    fontSize: 14,
    color: '#007AFF',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
