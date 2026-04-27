export default function translateMsgs(msg) {
  switch (msg) {
    case 'Teacher not found':
      return 'המורה לא נמצאה';
    case 'Student not found':
      return 'התלמידה לא נמצאה';
    case 'Teacher with this ID already exists':
      return 'מורה עם תעודת זהות זו כבר רשומה';
    case 'Student with this ID already exists':
      return 'תלמידה עם תעודת זהות זו כבר רשומה';
    case 'No token provided':
      return 'לא סופק טוקן, יש להתחבר מחדש';
    case 'Invalid token':
      return 'טוקן לא תקין, יש להתחבר מחדש';
    case 'Access denied':
      return 'אין הרשאה לפעולה זו';
    case 'id is required':
      return 'יש להזין תעודת זהות';
    case 'id, firstName, lastName and className are required':
      return 'יש למלא את כל שדות החובה';
    case 'Location not found':
      return 'המיקום לא נמצא';
    default:
      return 'שגיאה לא ידועה, נסי שוב';
  }
}