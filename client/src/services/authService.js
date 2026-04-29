import { POST } from './genericService'

const API_URL = '/login'

export const enterTeacher = (formData) => POST(formData, API_URL)