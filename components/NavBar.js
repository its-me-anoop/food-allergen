'use client';
import Link from 'next/link';
import { useApp } from '../context/AppContext';
import styles from './NavBar.module.css';

export default function NavBar() {
  const { currentUser, logout } = useApp();
  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>Allergen Tracker</div>
      <ul className={styles.links}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/accounts">Accounts</Link></li>
        <li><Link href="/meals">Meals</Link></li>
        <li><Link href="/allergens">Allergens</Link></li>
      </ul>
      {currentUser && (
        <button className={styles.logout} onClick={logout}>Logout {currentUser.name}</button>
      )}
    </nav>
  );
}
