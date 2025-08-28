import React from 'react';

export default function VendorList({ vendors, onMarkActive }) {
  if (!vendors?.length) return <p>No vendors yet. Add one above.</p>;

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={th}>Name</th>
            <th style={th}>Contact</th>
            <th style={th}>Location</th>
            <th style={th}>Last Active</th>
            <th style={th}>Status</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map(v => {
            const isInactive = v.status === 'Inactive';
            return (
              <tr key={v._id} style={{ borderTop: '1px solid #ddd' }}>
                <td style={td}>{v.name}</td>
                <td style={td}>{v.contactNumber}</td>
                <td style={td}>{v.location}</td>
                <td style={td}>{new Date(v.lastActive).toLocaleString()}</td>
                <td style={{ ...td, color: isInactive ? 'crimson' : 'green', fontWeight: 600 }}>{v.status}</td>
                <td style={td}>
                  <button onClick={() => onMarkActive(v._id)}>Set Active Now</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const th = { textAlign: 'left', padding: 8, background: '#f7f7f7' };
const td = { padding: 8 };
