import './globals.css';
import NavBar from '../components/NavBar';
import { AppProvider } from '../context/AppContext';

export const metadata = {
  title: 'Food Allergen Tracker',
  description: 'Track allergens in foods',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <NavBar />
          <main className="container">{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
