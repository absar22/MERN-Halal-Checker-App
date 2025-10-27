import { useState, useEffect } from 'react';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // ✅ Fetch all ingredients when component mounts
  useEffect(() => {
    fetch('http://localhost:8001/api/ingredients')
      .then(res => res.json())
      .then(data => setIngredients(data))
      .catch(err => console.error('Error fetching ingredients:', err));
  }, []);

  // ✅ Add new ingredient
  function addIngredient(e) {
    e.preventDefault();

    const newIngredient = { name, status, description, imageUrl };

    fetch('http://localhost:8001/api/ingredients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIngredient)
    })
      .then(res => res.json())
      .then(data => {
        setIngredients([...ingredients, data]);
        // clear input fields
        setName('');
        setStatus('');
        setDescription('');
        setImageUrl('');
      })
      .catch(err => console.error('Error adding ingredient:', err));
  }

  // ✅ Delete ingredient
  function deleteIngredient(id) {
    fetch(`http://localhost:8001/api/ingredients/${id}`, { method: 'DELETE' })
      .then(() => {
        setIngredients(ingredients.filter(item => item._id !== id));
      })
      .catch(err => console.error('Error deleting ingredient:', err));
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🕌 Halal Ingredient Checker</h1>

      {/* Add Ingredient Form */}
      <form onSubmit={addIngredient} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Status (Halal/Haram/Doubtful)"
          value={status}
          onChange={e => setStatus(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
        />
        <button type="submit">Add Ingredient</button>
      </form>

      {/* Ingredient List */}
      {ingredients.length === 0 ? (
        <p>Loading ingredients or none found...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {ingredients.map(item => (
            <li key={item._id} style={{ marginBottom: '15px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
              <h3>{item.name}</h3>
              <p><strong>Status:</strong> {item.status}</p>
              {item.description && <p>{item.description}</p>}
              {item.imageUrl && <img src={item.imageUrl} alt={item.name} width="100" />}
              <br />
              <button onClick={() => deleteIngredient(item._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
