import { useState, useEffect } from 'react';
import './App.css';
import { deleteHistory, getHistory } from './services/historyService';

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
      const result = await getHistory();
      
      setHistory(result);

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

  async function handleDelete(id) {
    try {
      await deleteHistory(id);

      const filteredHistory = history.filter((item) => {
        return item.id !== id;
      });

      setHistory(filteredHistory);
    } catch (error) {
        console.log('Failed to delete', error.message);
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
      <button onClick={() => {
        fetchData(city);
        }}>
        Search
      </button>
      

      {history.length > 0 && (
        <div>
          <h3>Search History</h3>
          <ul>
            {history.map((item) => (
              <li key={item.id} onClick={() => {
                setCity(item.city);
                fetchData(item.city);
              }}>
                {item.city}
                <button onClick={(event) => {
                  event.stopPropagation();
                  handleDelete(item.id);
                }}>🗑</button>
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
