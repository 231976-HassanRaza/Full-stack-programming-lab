import { useState } from 'react';

function ContactUs() {
  var nameState = useState('');
  var name = nameState[0];
  var setName = nameState[1];

  var emailState = useState('');
  var email = emailState[0];
  var setEmail = emailState[1];

  var messageState = useState('');
  var message = messageState[0];
  var setMessage = messageState[1];

  var sentState = useState(false);
  var sent = sentState[0];
  var setSent = sentState[1];

  function handleSubmit() {
    if (!name || !email || !message) {
      alert('Please fill all fields!');
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div style={{ padding: '60px 24px', textAlign: 'center' }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: '#EAF3DE',
          border: '2px solid #639922',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto',
          fontSize: '24px',
          color: '#27500A',
        }}>
          ✓
        </div>
        <h3 style={{ fontWeight: 'bold', color: '#27500A', marginBottom: '8px', fontSize: '18px' }}>
          Message Sent!
        </h3>
        <p style={{ fontSize: '14px', color: '#3B6D11' }}>
          We will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  var inputStyle = {
    width: '100%',
    padding: '11px 14px',
    border: '1px solid #85B7EB',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#1a1a1a',
  };

  return (
    <div style={{ padding: '32px 24px', maxWidth: '500px', margin: '0 auto' }}>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: '#1a1a1a' }}>
        Contact Us
      </h2>
      <p style={{ fontSize: '14px', color: '#666666', marginBottom: '24px' }}>
        Fill out the form and we will reply within 24 hours.
      </p>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e0e0e0',
        borderRadius: '14px',
        padding: '28px',
      }}>

        <div style={{ marginBottom: '18px' }}>
          <label style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#185FA5',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '8px',
          }}>
            Name
          </label>
          <input
            type="text"
            placeholder="Your full name..."
            value={name}
            onChange={function(e) { setName(e.target.value); }}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '18px' }}>
          <label style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#185FA5',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '8px',
          }}>
            Email
          </label>
          <input
            type="email"
            placeholder="Your email address..."
            value={email}
            onChange={function(e) { setEmail(e.target.value); }}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#185FA5',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '8px',
          }}>
            Message
          </label>
          <textarea
            placeholder="Write your message here..."
            value={message}
            onChange={function(e) { setMessage(e.target.value); }}
            style={{
              width: '100%',
              padding: '11px 14px',
              border: '1px solid #85B7EB',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              minHeight: '100px',
              resize: 'vertical',
              boxSizing: 'border-box',
              fontFamily: 'Segoe UI, sans-serif',
              color: '#1a1a1a',
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '12px',
            background: '#185FA5',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Send Message
        </button>

      </div>
    </div>
  );
}

export default ContactUs;
