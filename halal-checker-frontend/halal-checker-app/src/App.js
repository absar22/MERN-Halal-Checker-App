import { useState, useEffect } from 'react';

function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8001/api/ingredients')
      .then(res => res.json())
      .then(data => setIngredients(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Halal Checker</h1>
      <ul>
        {ingredients.map(item => (
          <li key={item._id}>
            <h3>{item.name}</h3>
            <p>Status: {item.status}</p>
            <p>{item.description}</p>
            <img src={item.imageUrl} alt={item.name} width={100}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
