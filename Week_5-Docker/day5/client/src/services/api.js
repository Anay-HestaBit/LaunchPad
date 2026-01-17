// Load the URL from the .env file
const API_URL = import.meta.env.VITE_API_URL;

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Network response was not ok');
  }
  return response.json();
};

export const todoService = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_URL}/todos`);
      return await handleResponse(response);
    } catch (error) {
      console.error('API Call Failed:', error);
      throw error;
    }
  },

  create: async (text) => {
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('API Call Failed:', error);
      throw error;
    }
  },
};
