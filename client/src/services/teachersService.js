const API_URL = 'http://localhost:5000/api/teachers';

const getToken = () => localStorage.getItem('token');

export const addTeacher = async (teacherData) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(teacherData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

export const getAllTeachers = async () => {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

export const getTeacherById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

export const getTeacherStudents = async (id) => {
  const res = await fetch(`${API_URL}/${id}/students`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};
