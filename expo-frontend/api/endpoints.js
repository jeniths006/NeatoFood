import api from './client';

export const getGreeting = async () => {
  try {
    const response = await api.get('/greeting');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add more API endpoints here as you build your app
// Example:
// export const getFoodPrices = async () => {
//   const response = await api.get('/api/food-prices');
//   return response.data;
// };
