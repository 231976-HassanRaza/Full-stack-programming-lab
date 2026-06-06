'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { customerAPI, invoiceAPI } from '@/lib/api';

function CreateInvoiceForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedCustomer = searchParams.get('customer');

  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState(preselectedCustomer || '');
  const [items, setItems] = useState([{ description: '', quantity: 1, unitPrice: 0 }]);
  const [taxRate, setTaxRate] = useState(0);
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingCustomers, setFetchingCustomers] = useState(true);

  useEffect(() => {
    customerAPI.getAll()
      .then(res => setCustomers(res.data))
      .catch(() => toast.error('Could not load customers'))
      .finally(() => setFetchingCustomers(false));
  }, []);

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = field === 'description' ? value : Number(value);
    setItems(updated);
  };

  const addItem = () => setItems([...items, { description: '', quantity: 1, unitPrice: 0 }]);
  const removeItem = (i) => items.length > 1 && setItems(items.filter((_, idx) => idx !== i));

  const subtotal = items.reduce((s, item) => s + item.quantity * item.unitPrice, 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const total = subtotal + taxAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerId) { toast.error('Please select a customer'); return; }
    if (items.some(i => !i.description.trim())) { toast.error('All items need a description'); return; }
    if (items.some(i => i.unitPrice <= 0)) { toast.error('All items need a valid price'); return; }

    setLoading(true);
    try {
      const res = await invoiceAPI.create({ customerId, items, tax: taxRate, dueDate, notes });
      toast.success(`Invoice ${res.data.invoiceNumber} created! 🎉`);
      router.push(`/dashboard/invoices/${res.data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create invoice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Create Invoice</h1>
          <p className="page-subtitle">Generate a new invoice for a customer</p>
        </div>
        <Link href="/dashboard/invoices" className="btn btn-secondary">← Back to Invoices</Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24 }}>
          {/* Left: Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="card">
              <div className="card-header"><span className="card-title">👤 Customer</span></div>
              <div className="card-body">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Select Customer *</label>
                  <select value={customerId} onChange={e => setCustomerId(e.target.value)} disabled={fetchingCustomers}>
                    <option value="">-- Select a customer --</option>
                    {customers.map(c => (
                      <option key={c._id} value={c._id}>{c.name} — {c.company || c.email}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <span className="card-title">📦 Line Items</span>
                <button type="button" className="btn btn-secondary btn-sm" onClick={addItem}>+ Add Item</button>
              </div>
              <div className="card-body">
                <table style={{ marginBottom: 0 }}>
                  <thead>
                    <tr>
                      <th style={{ width: '45%' }}>Description</th>
                      <th>Qty</th>
                      <th>Unit Price</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, i) => (
                      <tr key={i}>
                        <td>
                          <input
                            value={item.description}
                            onChange={e => updateItem(i, 'description', e.target.value)}
                            placeholder="Service description"
                            style={{ padding: '8px 10px' }}
                          />
                        </td>
                        <td>
                          <input
                            type="number" min="1" value={item.quantity}
                            onChange={e => updateItem(i, 'quantity', e.target.value)}
                            style={{ padding: '8px 10px', width: 70 }}
                          />
                        </td>
                        <td>
                          <input
                            type="number" min="0" value={item.unitPrice}
                            onChange={e => updateItem(i, 'unitPrice', e.target.value)}
                            style={{ padding: '8px 10px', width: 110 }}
                          />
                        </td>
                        <td style={{ color: 'var(--green)', fontWeight: 600, fontSize: 13 }}>
                          PKR {(item.quantity * item.unitPrice).toLocaleString()}
                        </td>
                        <td>
                          <button type="button" className="btn btn-danger btn-sm" onClick={() => removeItem(i)} disabled={items.length === 1}>✕</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right: Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="card">
              <div className="card-header"><span className="card-title">💰 Summary</span></div>
              <div className="card-body">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                    <span>PKR {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Tax Rate (%)</label>
                    <input type="number" min="0" max="100" value={taxRate} onChange={e => setTaxRate(Number(e.target.value))} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Tax</span>
                    <span>PKR {taxAmount.toLocaleString()}</span>
                  </div>
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 20 }}>
                    <span>Total</span>
                    <span style={{ color: 'var(--green)' }}>PKR {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header"><span className="card-title">📅 Details</span></div>
              <div className="card-body">
                <div className="form-group">
                  <label>Due Date</label>
                  <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Notes</label>
                  <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Payment terms, special instructions..." style={{ minHeight: 60 }} />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? <><span className="spinner" style={{ width: 16, height: 16 }} /> Creating...</> : '🧾 Create Invoice'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function CreateInvoicePage() {
  return (
    <Suspense fallback={<div className="loading"><div className="spinner" /></div>}>
      <CreateInvoiceForm />
    </Suspense>
  );
}
