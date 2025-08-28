import React, { useState } from 'react';
import { addVendor } from '../api.js';

export default function VendorForm({ onCreated }) {
  const [form, setForm] = useState({
    name: '',
    contactNumber: '',
    location: ''
  });
  const [saving, setSaving] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.contactNumber || !form.location) {
      alert('Please fill all fields');
      return;
    }
    setSaving(true);
    try {
      await addVendor(form);
      setForm({ name: '', contactNumber: '', location: '' });
      onCreated?.();
    } catch (e) {
      alert('Failed to add vendor');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 600 }}>
      <h2>Add Vendor</h2>
      <input
        name="name"
        placeholder="Vendor name"
        value={form.name}
        onChange={onChange}
      />
      <input
        name="contactNumber"
        placeholder="Contact number"
        value={form.contactNumber}
        onChange={onChange}
      />
      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={onChange}
      />
      <button disabled={saving} type="submit">{saving ? 'Saving...' : 'Add Vendor'}</button>
    </form>
  );
}
