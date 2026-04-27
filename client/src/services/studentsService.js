const API_URL = 'http://localhost:5000/api/students';

const getToken = () => localStorage.getItem('token');

export const addStudent = async (studentData) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(studentData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

export const getAllStudents = async () => {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

export const getStudentById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};
