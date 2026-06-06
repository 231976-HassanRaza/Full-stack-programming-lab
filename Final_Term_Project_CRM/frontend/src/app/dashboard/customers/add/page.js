'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { customerAPI } from '@/lib/api';

const initialForm = {
  name: '', email: '', phone: '', company: '',
  status: 'Lead', address: '', notes: '', totalRevenue: '',
};

export default function AddCustomerPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email address';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      await customerAPI.create({ ...form, totalRevenue: Number(form.totalRevenue) || 0 });
      toast.success(`${form.name} added successfully! 🎉`);
      router.push('/dashboard/customers');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add customer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Add Customer</h1>
          <p className="page-subtitle">Create a new customer record</p>
        </div>
        <Link href="/dashboard/customers" className="btn btn-secondary">← Back to Customers</Link>
      </div>

      <div className="card" style={{ maxWidth: 800 }}>
        <div className="card-header">
          <span className="card-title">👤 Customer Information</span>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Ahmed Khan" />
                {errors.name && <p style={{ color: 'var(--red)', fontSize: 12, marginTop: 4 }}>{errors.name}</p>}
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="ahmed@company.com" />
                {errors.email && <p style={{ color: 'var(--red)', fontSize: 12, marginTop: 4 }}>{errors.email}</p>}
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="+92-300-1234567" />
                {errors.phone && <p style={{ color: 'var(--red)', fontSize: 12, marginTop: 4 }}>{errors.phone}</p>}
              </div>
              <div className="form-group">
                <label>Company</label>
                <input name="company" value={form.company} onChange={handleChange} placeholder="TechPK Solutions" />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={form.status} onChange={handleChange}>
                  <option value="Lead">Lead</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="form-group">
                <label>Initial Revenue (PKR)</label>
                <input name="totalRevenue" type="number" value={form.totalRevenue} onChange={handleChange} placeholder="0" min="0" />
              </div>
            </div>

            <div className="form-group">
              <label>Address</label>
              <input name="address" value={form.address} onChange={handleChange} placeholder="Blue Area, Islamabad" />
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Any additional notes about this customer..." />
            </div>

            <div className="flex gap-3">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <><span className="spinner" style={{ width: 16, height: 16 }} /> Saving...</> : '✓ Add Customer'}
              </button>
              <Link href="/dashboard/customers" className="btn btn-secondary">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
