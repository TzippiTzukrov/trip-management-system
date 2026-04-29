import { POST, GET } from './genericService'

const API_URL = '/teachers';

export const addTeacher = (teacherData) => POST(teacherData, API_URL);

export const getAllTeachers = () => GET(API_URL);

export const getTeacherById = (id) => GET(`${API_URL}/${id}`);

export const getTeacherStudents = (id) => GET(`${API_URL}/${id}/students`);