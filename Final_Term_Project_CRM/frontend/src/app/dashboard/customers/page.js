'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { customerAPI } from '@/lib/api';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [deleting, setDeleting] = useState(null);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      const res = await customerAPI.getAll(params);
      setCustomers(res.data);
    } catch {
      toast.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(() => fetchCustomers(), 300);
    return () => clearTimeout(timer);
  }, [fetchCustomers]);

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"? This action cannot be undone.`)) return;
    setDeleting(id);
    try {
      await customerAPI.delete(id);
      toast.success(`${name} deleted successfully`);
      setCustomers(prev => prev.filter(c => c._id !== id));
    } catch {
      toast.error('Failed to delete customer');
    } finally {
      setDeleting(null);
    }
  };

  const statusBadge = (status) => {
    const map = { Active: 'badge-active', Lead: 'badge-lead', Inactive: 'badge-inactive' };
    return <span className={`badge ${map[status] || 'badge-lead'}`}>{status}</span>;
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Customers</h1>
          <p className="page-subtitle">{customers.length} records found</p>
        </div>
        <Link href="/dashboard/customers/add" className="btn btn-primary">➕ Add Customer</Link>
      </div>

      {/* Search & Filter */}
      <div className="search-bar">
        <div className="search-input-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search customers by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          style={{ width: 'auto', minWidth: 160 }}
        >
          <option value="">All Statuses</option>
          <option value="Lead">Lead</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        {(search || statusFilter) && (
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => { setSearch(''); setStatusFilter(''); }}
          >
            ✕ Clear
          </button>
        )}
      </div>

      <div className="card">
        <div className="table-container">
          {loading ? (
            <div className="loading"><div className="spinner" /><span>Loading...</span></div>
          ) : customers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>👥</div>
              <p style={{ fontWeight: 600 }}>No customers found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Company</th>
                  <th>Status</th>
                  <th>Revenue</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c, i) => (
                  <tr key={c._id}>
                    <td style={{ color: 'var(--text-dim)', fontSize: 12 }}>{i + 1}</td>
                    <td>
                      <Link
                        href={`/dashboard/customers/${c._id}`}
                        style={{ fontWeight: 600, color: 'var(--text)' }}
                      >
                        {c.name}
                      </Link>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{c.email}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{c.phone}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{c.company || '—'}</td>
                    <td>{statusBadge(c.status)}</td>
                    <td style={{ color: 'var(--green)', fontWeight: 600, fontSize: 13 }}>
                      PKR {c.totalRevenue?.toLocaleString()}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <Link
                          href={`/dashboard/customers/${c._id}`}
                          className="btn btn-secondary btn-sm"
                        >
                          👁
                        </Link>
                        <Link
                          href={`/dashboard/customers/${c._id}/edit`}
                          className="btn btn-secondary btn-sm"
                        >
                          ✏️
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(c._id, c.name)}
                          disabled={deleting === c._id}
                        >
                          {deleting === c._id ? '...' : '🗑'}
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
