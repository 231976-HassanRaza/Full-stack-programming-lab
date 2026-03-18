function About() {
  var stats = [
    { num: '500+', label: 'Products' },
    { num: '10K+', label: 'Customers' },
    { num: '50+', label: 'Brands' },
    { num: '24/7', label: 'Support' },
  ];

  return (
    <div style={{ padding: '32px 24px', maxWidth: '700px', margin: '0 auto' }}>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', color: '#1a1a1a' }}>
        About ReactStore
      </h2>

      <p style={{ fontSize: '14px', color: '#666666', lineHeight: '1.8', marginBottom: '20px' }}>
        We are a modern e-commerce platform built with React JS.
        Our mission is to provide a seamless shopping experience for everyone.
      </p>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '20px',
      }}>
        <p style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '10px', color: '#1a1a1a' }}>Our Story</p>
        <p style={{ fontSize: '13px', color: '#666666', lineHeight: '1.8' }}>
          ReactStore was born from a simple idea — shopping online should be effortless.
          We built our platform using React JS and React Router.
          Every feature is designed with the user in mind, from fast navigation
          to an intuitive product search and seamless checkout experience.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        {stats.map(function(s) {
          return (
            <div key={s.label} style={{
              background: '#f0f4ff',
              borderRadius: '10px',
              padding: '16px 10px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#185FA5' }}>{s.num}</div>
              <div style={{ fontSize: '11px', color: '#888888', textTransform: 'uppercase', marginTop: '4px', letterSpacing: '0.05em' }}>{s.label}</div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default About;
