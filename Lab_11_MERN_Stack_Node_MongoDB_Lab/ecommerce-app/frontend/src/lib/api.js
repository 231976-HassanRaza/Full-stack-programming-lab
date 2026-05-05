const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = `${BASE_URL}/products${query ? `?${query}` : ''}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch products');
  const json = await res.json();
  return json.data;
}

export async function fetchProduct(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Product not found');
  const json = await res.json();
  return json.data;
}

export async function placeOrder(orderData) {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Order failed');
  return json.data;
}
