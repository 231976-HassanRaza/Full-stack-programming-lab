'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { invoiceAPI } from '@/lib/api';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await invoiceAPI.getAll();
        setInvoices(res.data);
      } catch {
        toast.error('Failed to load invoices');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleDelete = async (id, num) => {
    if (!confirm(`Delete invoice ${num}?`)) return;
    setDeleting(id);
    try {
      await invoiceAPI.delete(id);
      toast.success(`Invoice ${num} deleted`);
      setInvoices(prev => prev.filter(i => i._id !== id));
    } catch {
      toast.error('Failed to delete invoice');
    } finally {
      setDeleting(null);
    }
  };

  const statusBadge = (status) => {
    const map = { Paid: 'badge-active', Sent: 'badge-lead', Draft: 'badge-inactive' };
    return <span className={`badge ${map[status] || 'badge-inactive'}`}>{status}</span>;
  };

  const totalAmount = invoices.reduce((s, i) => s + (i.total || 0), 0);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Invoices</h1>
          <p className="page-subtitle">{invoices.length} invoices · PKR {totalAmount.toLocaleString()} total</p>
        </div>
        <Link href="/dashboard/invoices/create" className="btn btn-primary">🧾 Create Invoice</Link>
      </div>

      <div className="card">
        <div className="table-container">
          {loading ? (
            <div className="loading"><div className="spinner" /><span>Loading...</span></div>
          ) : invoices.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🧾</div>
              <p style={{ fontWeight: 600 }}>No invoices yet</p>
              <p className="text-sm mt-1">Create your first invoice to get started</p>
              <Link href="/dashboard/invoices/create" className="btn btn-primary" style={{ marginTop: 16, display: 'inline-flex' }}>Create Invoice</Link>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Customer</th>
                  <th>Company</th>
                  <th>Date</th>
                  <th>Subtotal</th>
                  <th>Tax</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map(inv => (
                  <tr key={inv._id}>
                    <td style={{ color: 'var(--accent)', fontWeight: 700 }}>{inv.invoiceNumber}</td>
                    <td style={{ fontWeight: 600 }}>{inv.customer?.name || '—'}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{inv.customer?.company || '—'}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                      {new Date(inv.createdAt).toLocaleDateString('en-PK')}
                    </td>
                    <td style={{ fontSize: 13 }}>PKR {inv.subtotal?.toLocaleString()}</td>
                    <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>PKR {inv.tax?.toLocaleString()}</td>
                    <td style={{ color: 'var(--green)', fontWeight: 700 }}>PKR {inv.total?.toLocaleString()}</td>
                    <td>{statusBadge(inv.status)}</td>
                    <td>
                      <div className="flex gap-2">
                        <Link href={`/dashboard/invoices/${inv._id}`} className="btn btn-secondary btn-sm">👁 View</Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(inv._id, inv.invoiceNumber)}
                          disabled={deleting === inv._id}
                        >
                          {deleting === inv._id ? '...' : '🗑'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
