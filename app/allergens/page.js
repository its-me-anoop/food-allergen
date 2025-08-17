'use client';
import { useApp } from '../../context/AppContext';

export default function AllergensPage() {
  const { currentUser, userMeals } = useApp();

  if (!currentUser) {
    return <p>Please login to view allergen analysis.</p>;
  }

  const allergenMap = {};
  userMeals.forEach((meal) => {
    if (meal.symptoms.length === 0) return;
    meal.allergens.forEach((a) => {
      if (!allergenMap[a]) {
        allergenMap[a] = { count: 0, symptoms: new Set() };
      }
      allergenMap[a].count += 1;
      meal.symptoms.forEach((s) => allergenMap[a].symptoms.add(s));
    });
  });

  const entries = Object.entries(allergenMap);

  return (
    <div>
      <h1>Potential Allergens</h1>
      {entries.length === 0 ? (
        <p>No allergen data with symptoms yet.</p>
      ) : (
        <ul>
          {entries.map(([allergen, data]) => (
            <li key={allergen}>
              <strong>{allergen}</strong> - {data.count} symptom meal{data.count > 1 ? 's' : ''}<br />
              Symptoms: {Array.from(data.symptoms).join(', ')}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
