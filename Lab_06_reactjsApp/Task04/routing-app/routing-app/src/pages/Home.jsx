import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '32px 24px', maxWidth: '900px', margin: '0 auto' }}>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e0e0e0',
        borderRadius: '16px',
        padding: '48px 32px',
        textAlign: 'center',
        marginBottom: '24px',
      }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '12px', color: '#1a1a1a' }}>
          Welcome to ReactStore
        </h1>
        <p style={{ fontSize: '15px', color: '#666666', lineHeight: '1.8', marginBottom: '24px' }}>
          Your one-stop shop for amazing products.
          Built with React Router for seamless navigation.
        </p>
        <Link
          to="/products"
          style={{
            background: '#185FA5',
            color: '#ffffff',
            padding: '12px 28px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          Shop Now
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>

        <div style={{ background: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '20px' }}>
          <div style={{ width: '40px', height: '40px', background: '#E6F1FB', borderRadius: '8px', marginBottom: '12px' }}></div>
          <p style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '6px', color: '#1a1a1a' }}>Fast Delivery</p>
          <p style={{ fontSize: '13px', color: '#888888', lineHeight: '1.5' }}>Get products delivered within 24 hours.</p>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '20px' }}>
          <div style={{ width: '40px', height: '40px', background: '#EAF3DE', borderRadius: '8px', marginBottom: '12px' }}></div>
          <p style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '6px', color: '#1a1a1a' }}>Secure Payments</p>
          <p style={{ fontSize: '13px', color: '#888888', lineHeight: '1.5' }}>All transactions are encrypted and safe.</p>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '20px' }}>
          <div style={{ width: '40px', height: '40px', background: '#EEEDFE', borderRadius: '8px', marginBottom: '12px' }}></div>
          <p style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '6px', color: '#1a1a1a' }}>24/7 Support</p>
          <p style={{ fontSize: '13px', color: '#888888', lineHeight: '1.5' }}>Our team is always here to help you.</p>
        </div>

      </div>
    </div>
  );
}

export default Home;
