'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { href: '/dashboard', icon: '🏠', label: 'Dashboard' },
  { href: '/dashboard/customers', icon: '👥', label: 'Customers' },
  { href: '/dashboard/customers/add', icon: '➕', label: 'Add Customer' },
  { href: '/dashboard/invoices', icon: '🧾', label: 'Invoices' },
  { href: '/dashboard/invoices/create', icon: '📝', label: 'Create Invoice' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">🎯</div>
        <span>CRM Pro</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item ${pathname === item.href ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">{initials}</div>
          <div>
            <div className="user-name">{user?.name || 'User'}</div>
            <div className="user-role">CRM Admin</div>
          </div>
        </div>
        <button
          className="btn btn-secondary w-full btn-sm"
          style={{ marginTop: 8 }}
          onClick={handleLogout}
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
