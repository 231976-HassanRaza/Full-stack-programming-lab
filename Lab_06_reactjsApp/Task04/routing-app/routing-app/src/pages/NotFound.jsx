import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 24px' }}>

      <div style={{
        fontSize: '90px',
        fontWeight: 'bold',
        color: '#e0e0e0',
        lineHeight: '1',
        marginBottom: '20px',
      }}>
        404
      </div>

      <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px', color: '#1a1a1a' }}>
        Page Not Found
      </h2>

      <p style={{ fontSize: '14px', color: '#888888', marginBottom: '28px' }}>
        Oops! The page you are looking for does not exist.
      </p>

      <Link
        to="/"
        style={{
          background: '#185FA5',
          color: '#ffffff',
          padding: '12px 32px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '14px',
        }}
      >
        Go Back Home
      </Link>

    </div>
  );
}

export default NotFound;
