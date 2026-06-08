import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchData(cityName) {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:3000/weather/${cityName || city}`);

      if (!response.ok) {
        throw new Error('City not found');
      }

      const result = await response.json();
      setData(result);
      await fetchHistory(); // Fetch history after getting new data

    } catch (error) {
      setError(error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  async function fetchHistory() {
    try {
      const response = await fetch('http://localhost:3000/history');
      const result = await response.json();
      
      setHistory(result.history);

    } catch (error) {
      setError('Failed to fetch history');
    }
  }

  async function clearHistory() {
    try {
      await fetch('http://localhost:3000/history', {
        method: 'DELETE'
      });
      setHistory([]);
    } catch (error) {
      setError('Failed to clear history');
    }
  }

  return (
    <div>
      <input 
        type="text" 
        placeholder='Enter city name' 
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            fetchData(city);
          }
        }} 
      />
      <button onClick={fetchData}>
        Search
      </button>
      

      {history.length > 0 && (
        <div>
          <h3>Search History</h3>
          <ul>
            {history.map((item, index) => (
              <li key={index} onClick={() => {
                setCity(item);
                fetchData(item);
              }}>
                {item}
              </li>
            ))}
          </ul>
          <button onClick={clearHistory}>Clear History</button>
        </div>
      )}

      <h1>{data?.city}</h1>
      <h2>{data?.temperature}</h2>
      <p>{data?.description}</p>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
      
  )
}

export default App
