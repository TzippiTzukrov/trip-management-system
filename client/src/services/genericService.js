const API_URL = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

export const POST = async (receivedData, URL) => {
  try {
    const res = await fetch(`${API_URL}${URL}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify(receivedData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    throw new Error(error.message || 'Network error');
  }
};

export const GET = async (URL) => {
  try {
    const res = await fetch(`${API_URL}${URL}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    throw new Error(error.message || 'Network error');
  }
};