import api from './client';

export const healthCheck = async () => {
  try {
    const response = await api.get('/health/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add more API endpoints here as you build your app
// Example:
// export const getMenuItems = async () => {
//   const response = await api.get('/menu/');
//   return response.data;
// };
