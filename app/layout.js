import './globals.css';

export const metadata = {
  title: 'Food Allergen Tracker',
  description: 'Track allergens in foods',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
