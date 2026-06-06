import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';
import '@/styles/globals.css';

export const metadata = {
  title: 'CRM System | Air University',
  description: 'Customer Relationship Management System - Final Term Project',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1a1a26',
                color: '#f0f0f8',
                border: '1px solid #2a2a3a',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px',
              },
              success: { iconTheme: { primary: '#00d4a0', secondary: '#fff' } },
              error: { iconTheme: { primary: '#ff4d6d', secondary: '#fff' } },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
