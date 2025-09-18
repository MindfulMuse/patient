'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';

export default function NurseRegister() {
  const { user } = useUser(); // Clerk user
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in!');
      return;
    }

    try {
      const res = await fetch('/api/nurse/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.id, // Clerk userId
          name: formData.name,
          email: user.primaryEmailAddress?.emailAddress,
          phone: formData.phone,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('✅ Nurse registered successfully!');
      } else {
        alert(`❌ ${data.msg}`);
      }
    } catch (err) {
      console.error(err);
      alert('🚨 Something went wrong.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Nurse Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
