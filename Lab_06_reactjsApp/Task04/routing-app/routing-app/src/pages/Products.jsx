import { useState } from 'react';

var productList = [
  { id: 1, name: 'Wireless Headphones', desc: 'Premium noise-cancelling sound quality.', price: '$59.99' },
  { id: 2, name: 'Mechanical Keyboard', desc: 'RGB backlit tactile switches for typing.', price: '$89.99' },
  { id: 3, name: 'Smart Watch', desc: 'Track fitness, notifications and more.', price: '$129.99' },
  { id: 4, name: 'USB-C Hub', desc: '7-in-1 with HDMI, SD and USB ports.', price: '$34.99' },
  { id: 5, name: 'Portable Speaker', desc: '360 surround sound, waterproof design.', price: '$49.99' },
  { id: 6, name: 'Laptop Stand', desc: 'Ergonomic aluminium, adjustable height.', price: '$29.99' },
];

function Products() {
  var cartState = useState([]);
  var cart = cartState[0];
  var setCart = cartState[1];

  function addToCart(id) {
    if (cart.indexOf(id) === -1) {
      setCart(cart.concat([id]));
    }
  }

  return (
    <div style={{ padding: '32px 24px', maxWidth: '900px', margin: '0 auto' }}>

      <div style={{
        background: '#E6F1FB',
        border: '1px solid #85B7EB',
        borderRadius: '10px',
        padding: '12px 16px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '13px',
        color: '#0C447C',
      }}>
        <span style={{ fontWeight: 'bold' }}>Shopping Cart</span>
        <span style={{ fontWeight: 'bold', fontSize: '15px' }}>
          {cart.length} item{cart.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {productList.map(function(p) {
          var inCart = cart.indexOf(p.id) !== -1;
          return (
            <div key={p.id} style={{
              background: '#ffffff',
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              padding: '20px',
            }}>
              <p style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '8px', color: '#1a1a1a' }}>
                {p.name}
              </p>
              <p style={{ fontSize: '13px', color: '#888888', marginBottom: '16px', lineHeight: '1.5' }}>
                {p.desc}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', fontSize: '15px', color: '#185FA5' }}>
                  {p.price}
                </span>
                <button
                  onClick={function() { addToCart(p.id); }}
                  style={{
                    background: inCart ? '#EAF3DE' : '#185FA5',
                    color: inCart ? '#27500A' : '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  {inCart ? 'Added ✓' : 'Add to Cart'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default Products;
