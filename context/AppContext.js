'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [accounts, setAccounts] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [meals, setMeals] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const storedAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');
    const storedMeals = JSON.parse(localStorage.getItem('meals') || '[]');
    const storedUser = localStorage.getItem('currentUserId');
    setAccounts(storedAccounts);
    setMeals(storedMeals);
    setCurrentUserId(storedUser);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem('meals', JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    if (currentUserId) {
      localStorage.setItem('currentUserId', currentUserId);
    } else {
      localStorage.removeItem('currentUserId');
    }
  }, [currentUserId]);

  const addAccount = (name) => {
    const newAccount = { id: Date.now().toString(), name };
    setAccounts([...accounts, newAccount]);
    setCurrentUserId(newAccount.id);
  };

  const login = (id) => {
    setCurrentUserId(id);
  };

  const logout = () => {
    setCurrentUserId(null);
  };

  const addMeal = (meal) => {
    setMeals([...meals, { ...meal, id: Date.now().toString(), userId: currentUserId }]);
  };

  const currentUser = accounts.find((acc) => acc.id === currentUserId);
  const userMeals = meals.filter((m) => m.userId === currentUserId);

  return (
    <AppContext.Provider value={{ accounts, currentUser, userMeals, addAccount, login, logout, addMeal }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
