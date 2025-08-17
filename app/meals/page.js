'use client';
import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function MealsPage() {
  const { currentUser, userMeals, addMeal } = useApp();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [allergens, setAllergens] = useState('');
  const [symptoms, setSymptoms] = useState('');

  if (!currentUser) {
    return <p>Please login to log meals.</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !date) return;
    addMeal({
      name,
      date,
      allergens: allergens.split(',').map((a) => a.trim()).filter(Boolean),
      symptoms: symptoms.split(',').map((s) => s.trim()).filter(Boolean),
    });
    setName('');
    setDate('');
    setAllergens('');
    setSymptoms('');
  };

  return (
    <div>
      <h1>Meals</h1>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Meal name" />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input value={allergens} onChange={(e) => setAllergens(e.target.value)} placeholder="Allergens (comma separated)" />
        <input value={symptoms} onChange={(e) => setSymptoms(e.target.value)} placeholder="Symptoms (comma separated)" />
        <button type="submit">Add Meal</button>
      </form>
      <h2>Logged Meals</h2>
      <ul>
        {userMeals.map((meal) => (
          <li key={meal.id}>
            <strong>{meal.name}</strong> ({meal.date})<br />
            Allergens: {meal.allergens.join(', ') || 'None'}<br />
            Symptoms: {meal.symptoms.join(', ') || 'None'}
          </li>
        ))}
      </ul>
    </div>
  );
}
