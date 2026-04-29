import './ManagementContent.css';

function ManagementContent({ data }) {
  if (!data) {
    return (
      <div className="management-content empty">
        <p>בחרי פעולה מהתפריט</p>
      </div>
    );
  }

  const items = Array.isArray(data) ? data : [data];

  const FIELDS = [
    { key: 'firstName', label: 'שם פרטי' },
    { key: 'lastName',  label: 'שם משפחה' },
    { key: 'id',        label: 'תעודת זהות' },
    { key: 'className', label: 'כיתה' },
  ];

  return (
    <div className="management-content">
      <table>
        <thead>
          <tr>
            {FIELDS.map(f => <th key={f.key}>{f.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              {FIELDS.map(f => <td key={f.key}>{item[f.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManagementContent;