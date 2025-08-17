'use client';
import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function AccountsPage() {
  const { accounts, currentUser, addAccount, login } = useApp();
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      addAccount(name.trim());
      setName('');
    }
  };

  return (
    <div>
      <h1>Accounts</h1>
      {currentUser ? <p>Logged in as {currentUser.name}</p> : <p>No user logged in.</p>}
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New account name" />
        <button type="submit">Create Account</button>
      </form>
      <h2>Existing Accounts</h2>
      <ul>
        {accounts.map((acc) => (
          <li key={acc.id}>
            {acc.name} <button onClick={() => login(acc.id)}>Login</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
