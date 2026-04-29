import { useState } from 'react';
import './managementSidebar.css';
import { getTeacherById, getAllTeachers, getTeacherStudents } from '../../services/teachersService';
import { getStudentById, getAllStudents } from '../../services/studentsService';
import translateMsgs from '../../utils/translateMsgs';

function ManagementSidebar({ setData }) {
  const [inputView, setInputView] = useState(null);
  const [error, setError] = useState('');

  const [teacherId, setTeacherId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [teacherForStudentsId, setTeacherForStudentsId] = useState('');

  const toggleInput = (view, resetFn) => {
    setInputView(prev => prev === view ? null : view);
    resetFn();
    setError('');
  };

  const submit = async (method) => {
    setData(null);
    setError('');
    try {
      const res = await method();
      setData(res);
    } catch (err) {
      setError(translateMsgs(err.message));
    }
  };

  const handleTeachersListSubmit = () => {
    setInputView(null);
    submit(getAllTeachers);
  };

  const handleStudentsListSubmit = () => {
    setInputView(null);
    submit(getAllStudents);
  };

  const handleTeacherByIDSubmit = (e) => {
    e.preventDefault();
    if (!teacherId) return setError('יש להזין מספר מורה');
    submit(() => getTeacherById(teacherId));
    setTeacherId('');
  };

  const handleStudentByIDSubmit = (e) => {
    e.preventDefault();
    if (!studentId) return setError('יש להזין מספר תלמידה');
    submit(() => getStudentById(studentId));
    setStudentId('');
  };

  const handleStudentsByTeacherSubmit = (e) => {
    e.preventDefault();
    if (!teacherForStudentsId) return setError('יש להזין מספר מורה');
    submit(() => getTeacherStudents(teacherForStudentsId));
    setTeacherForStudentsId('');
  };

  return (
    <div className="right-management-sidebar">

      <div>
        <button onClick={handleTeachersListSubmit}>
          רשימת המורות
        </button>
      </div>

      <div>
        <button onClick={handleStudentsListSubmit}>
          רשימת התלמידות
        </button>
      </div>

      <hr />

      <form onSubmit={handleTeacherByIDSubmit}>
        <button
          type="button"
          onClick={() => toggleInput('teacherByID', () => setTeacherId(''))}
        >
          חיפוש מורה
        </button>
        {inputView === 'teacherByID' && (
          <div>
            <input
              type="text"
              placeholder="הזיני מספר מורה"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
            />
            <button type="submit">↩</button>
          </div>
        )}
      </form>

      <form onSubmit={handleStudentByIDSubmit}>
        <button
          type="button"
          onClick={() => toggleInput('studentByID', () => setStudentId(''))}
        >
          חיפוש תלמידה
        </button>
        {inputView === 'studentByID' && (
          <div>
            <input
              type="text"
              placeholder="הכניסי מספר תלמידה"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
            <button type="submit">↩</button>
          </div>
        )}
      </form>

      <form onSubmit={handleStudentsByTeacherSubmit}>
        <button
          type="button"
          onClick={() => toggleInput('studentsByTeacher', () => setTeacherForStudentsId(''))}
        >
          כיתות לפי מורה
        </button>
        {inputView === 'studentsByTeacher' && (
          <div>
            <input
              type="text"
              placeholder="הכניסי מספר מורה"
              value={teacherForStudentsId}
              onChange={(e) => setTeacherForStudentsId(e.target.value)}
            />
            <button type="submit">↩</button>
          </div>
        )}
      </form>

      {error && <p className="error-message">{error}</p>}

    </div>
  );
}

export default ManagementSidebar;