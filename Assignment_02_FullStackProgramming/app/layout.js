import './globals.css';

export const metadata = {
  title: 'AquaLux Hot Tubs – Premium Spa & Hot Tub Store',
  description: 'Premium hot tubs, swim spas and accessories. Elevate your relaxation experience with AquaLux.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body className="bg-white text-dark font-sans">
        {children}
      </body>
    </html>
  );
}
