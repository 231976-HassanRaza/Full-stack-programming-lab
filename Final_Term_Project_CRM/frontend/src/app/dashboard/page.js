'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { customerAPI, invoiceAPI } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, active: 0, leads: 0, inactive: 0, totalRevenue: 0 });
  const [recentCustomers, setRecentCustomers] = useState([]);
  const [recentInvoices, setRecentInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, customersRes, invoicesRes] = await Promise.all([
          customerAPI.getStats(),
          customerAPI.getAll(),
          invoiceAPI.getAll(),
        ]);
        setStats(statsRes.data);
        setRecentCustomers(customersRes.data.slice(0, 5));
        setRecentInvoices(invoicesRes.data.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statusBadge = (status) => {
    const map = { Active: 'badge-active', Lead: 'badge-lead', Inactive: 'badge-inactive' };
    return <span className={`badge ${map[status] || 'badge-lead'}`}>{status}</span>;
  };

  if (loading) return <div className="loading"><div className="spinner" /><span>Loading dashboard...</span></div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Welcome back, {user?.name} 👋</p>
        </div>
        <Link href="/dashboard/customers/add" className="btn btn-primary">
          ➕ Add Customer
        </Link>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card purple">
          <div className="stat-icon">👥</div>
          <div className="stat-label">Total Customers</div>
          <div className="stat-value purple">{stats.total}</div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon">✅</div>
          <div className="stat-label">Active</div>
          <div className="stat-value green">{stats.active}</div>
        </div>
        <div className="stat-card yellow">
          <div className="stat-icon">🎯</div>
          <div className="stat-label">Leads</div>
          <div className="stat-value yellow">{stats.leads}</div>
        </div>
        <div className="stat-card red">
          <div className="stat-icon">💰</div>
          <div className="stat-label">Total Revenue</div>
          <div className="stat-value" style={{ color: 'var(--accent)', fontSize: 22 }}>
            PKR {stats.totalRevenue?.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Grid: Recent Customers + Recent Invoices */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Recent Customers */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">👥 Recent Customers</span>
            <Link href="/dashboard/customers" className="btn btn-secondary btn-sm">View All</Link>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentCustomers.length === 0 ? (
                  <tr><td colSpan={3} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 24 }}>No customers yet</td></tr>
                ) : (
                  recentCustomers.map(c => (
                    <tr key={c._id}>
                      <td>
                        <Link href={`/dashboard/customers/${c._id}`} style={{ color: 'var(--accent)', fontWeight: 600 }}>
                          {c.name}
                        </Link>
                      </td>
                      <td style={{ color: 'var(--text-muted)' }}>{c.company || '—'}</td>
                      <td>{statusBadge(c.status)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">🧾 Recent Invoices</span>
            <Link href="/dashboard/invoices" className="btn btn-secondary btn-sm">View All</Link>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Customer</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentInvoices.length === 0 ? (
                  <tr><td colSpan={3} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 24 }}>No invoices yet</td></tr>
                ) : (
                  recentInvoices.map(inv => (
                    <tr key={inv._id}>
                      <td style={{ color: 'var(--accent)', fontWeight: 600 }}>{inv.invoiceNumber}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{inv.customer?.name || '—'}</td>
                      <td style={{ color: 'var(--green)', fontWeight: 600 }}>PKR {inv.total?.toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="card" style={{ marginTop: 24 }}>
        <div className="card-header">
          <span className="card-title">⚡ Quick Actions</span>
        </div>
        <div className="card-body" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/dashboard/customers/add" className="btn btn-primary">➕ Add Customer</Link>
          <Link href="/dashboard/invoices/create" className="btn btn-secondary">🧾 Create Invoice</Link>
          <Link href="/dashboard/customers" className="btn btn-secondary">👥 All Customers</Link>
          <Link href="/dashboard/invoices" className="btn btn-secondary">📄 All Invoices</Link>
        </div>
      </div>
    </div>
  );
}
