import { useState } from 'react';
import ManagementSidebar from '../../components/ManagementSidebar/ManagementSidebar';
import ManagementContent from '../../components/ManagementContent/ManagementContent';
import './ManagementPage.css';

function ManagementPage() {
  const [data, setData] = useState(null);

  return (
    <div className="management-page">
      <ManagementSidebar setData={setData} />
      <ManagementContent data={data} />
    </div>
  );
}

export default ManagementPage;