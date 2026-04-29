import { POST, GET } from './genericService';

const API_URL = '/students';

export const addStudent = (studentData) => POST(studentData, API_URL);

export const getAllStudents = () => GET(API_URL);

export const getStudentById = (id) => GET(`${API_URL}/${id}`);
