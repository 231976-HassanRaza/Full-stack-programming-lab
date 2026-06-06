'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { customerAPI } from '@/lib/api';

export default function CustomerDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await customerAPI.getById(id);
        setCustomer(res.data);
      } catch {
        toast.error('Customer not found');
        router.push('/dashboard/customers');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id, router]);

  const handleDelete = async () => {
    if (!confirm(`Delete "${customer.name}"? This action cannot be undone.`)) return;
    setDeleting(true);
    try {
      await customerAPI.delete(id);
      toast.success('Customer deleted successfully');
      router.push('/dashboard/customers');
    } catch {
      toast.error('Failed to delete customer');
      setDeleting(false);
    }
  };

  const statusBadge = (status) => {
    const map = { Active: 'badge-active', Lead: 'badge-lead', Inactive: 'badge-inactive' };
    return <span className={`badge ${map[status] || 'badge-lead'}`}>{status}</span>;
  };

  if (loading) return <div className="loading"><div className="spinner" /><span>Loading customer...</span></div>;
  if (!customer) return null;

  const InfoRow = ({ label, value }) => (
    <div style={{ display: 'flex', gap: 16, padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
      <div style={{ width: 140, fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', flexShrink: 0 }}>{label}</div>
      <div style={{ color: 'var(--text)', fontSize: 14 }}>{value || '—'}</div>
    </div>
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">{customer.name}</h1>
          <div className="flex gap-2 mt-1">{statusBadge(customer.status)}<span className="text-muted text-sm">{customer.company}</span></div>
        </div>
        <div className="flex gap-3">
          <Link href={`/dashboard/customers/${id}/edit`} className="btn btn-secondary">✏️ Edit</Link>
          <button className="btn btn-danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? 'Deleting...' : '🗑 Delete'}
          </button>
          <Link href="/dashboard/customers" className="btn btn-secondary">← Back</Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div className="card">
          <div className="card-header"><span className="card-title">📋 Contact Details</span></div>
          <div className="card-body">
            <InfoRow label="Full Name" value={customer.name} />
            <InfoRow label="Email" value={customer.email} />
            <InfoRow label="Phone" value={customer.phone} />
            <InfoRow label="Company" value={customer.company} />
            <InfoRow label="Address" value={customer.address} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="card">
            <div className="card-header"><span className="card-title">📊 Business Info</span></div>
            <div className="card-body">
              <InfoRow label="Status" value={statusBadge(customer.status)} />
              <InfoRow label="Total Revenue" value={<span style={{ color: 'var(--green)', fontWeight: 700 }}>PKR {customer.totalRevenue?.toLocaleString()}</span>} />
              <InfoRow label="Added On" value={new Date(customer.createdAt).toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })} />
              <InfoRow label="Last Updated" value={new Date(customer.updatedAt).toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })} />
            </div>
          </div>

          {customer.notes && (
            <div className="card">
              <div className="card-header"><span className="card-title">📝 Notes</span></div>
              <div className="card-body">
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-muted)' }}>{customer.notes}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <div className="card-header"><span className="card-title">⚡ Actions</span></div>
        <div className="card-body flex gap-3">
          <Link href={`/dashboard/customers/${id}/edit`} className="btn btn-primary">✏️ Edit Customer</Link>
          <Link href={`/dashboard/invoices/create?customer=${id}`} className="btn btn-secondary">🧾 Create Invoice</Link>
          <button className="btn btn-danger" onClick={handleDelete} disabled={deleting}>🗑 Delete Customer</button>
        </div>
      </div>
    </div>
  );
}
