import React, { useEffect, useState } from 'react';
import VendorForm from './components/VendorForm.jsx';
import VendorList from './components/VendorList.jsx';
import { fetchVendors, updateActive } from './api.js';

export default function App() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await fetchVendors();
      setVendors(data);
    } catch (e) {
      setError('Failed to fetch vendors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const markActiveNow = async (id) => {
    try {
      await updateActive(id);
      await load();
    } catch (e) {
      alert('Failed to update last active');
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16, fontFamily: 'Inter, system-ui, Arial' }}>
      <h1>Laari Khojo — Vendors</h1>
      <p style={{ color: '#666' }}>
        Add vendors, list them, and update their last active time. Vendors inactive &gt; 3 days are marked in red.
      </p>

      <VendorForm onCreated={load} />

      <hr style={{ margin: '20px 0' }} />

      {loading ? <p>Loading...</p> : error ? <p style={{color:'crimson'}}>{error}</p> : (
        <VendorList vendors={vendors} onMarkActive={markActiveNow} />
      )}
    </div>
  );
}
