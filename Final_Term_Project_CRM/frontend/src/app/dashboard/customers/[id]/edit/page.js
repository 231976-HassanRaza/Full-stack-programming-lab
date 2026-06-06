'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { customerAPI } from '@/lib/api';

export default function EditCustomerPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await customerAPI.getById(id);
        setForm(res.data);
      } catch {
        toast.error('Customer not found');
        router.push('/dashboard/customers');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const e = {};
    if (!form.name?.trim()) e.name = 'Name is required';
    if (!form.email?.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.phone?.trim()) e.phone = 'Phone is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSaving(true);
    try {
      await customerAPI.update(id, form);
      toast.success('Customer updated successfully! ✅');
      router.push(`/dashboard/customers/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update customer');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading"><div className="spinner" /><span>Loading...</span></div>;
  if (!form) return null;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Edit Customer</h1>
          <p className="page-subtitle">{form.name}</p>
        </div>
        <Link href={`/dashboard/customers/${id}`} className="btn btn-secondary">← Back</Link>
      </div>

      <div className="card" style={{ maxWidth: 800 }}>
        <div className="card-header"><span className="card-title">✏️ Update Information</span></div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input name="name" value={form.name || ''} onChange={handleChange} />
                {errors.name && <p style={{ color: 'var(--red)', fontSize: 12, marginTop: 4 }}>{errors.name}</p>}
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input name="email" type="email" value={form.email || ''} onChange={handleChange} />
                {errors.email && <p style={{ color: 'var(--red)', fontSize: 12, marginTop: 4 }}>{errors.email}</p>}
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input name="phone" value={form.phone || ''} onChange={handleChange} />
                {errors.phone && <p style={{ color: 'var(--red)', fontSize: 12, marginTop: 4 }}>{errors.phone}</p>}
              </div>
              <div className="form-group">
                <label>Company</label>
                <input name="company" value={form.company || ''} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={form.status || 'Lead'} onChange={handleChange}>
                  <option value="Lead">Lead</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="form-group">
                <label>Total Revenue (PKR)</label>
                <input name="totalRevenue" type="number" value={form.totalRevenue || 0} onChange={handleChange} min="0" />
              </div>
            </div>
            <div className="form-group">
              <label>Address</label>
              <input name="address" value={form.address || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea name="notes" value={form.notes || ''} onChange={handleChange} />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? <><span className="spinner" style={{ width: 16, height: 16 }} /> Saving...</> : '✓ Save Changes'}
              </button>
              <Link href={`/dashboard/customers/${id}`} className="btn btn-secondary">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
