import React, { useState } from 'react';

function App() {
  const [inputUrls, setInputUrls] = useState('');
  const [numbers, setNumbers] = useState([]);

  const fetchDataFromUrls = async (urls) => {
    try {
      const responses = await Promise.all(
        urls.map((url) => fetch(url).then((response) => response.json()))
      );
      const combinedData = responses.reduce((acc, data) => {
        return acc.concat(data.numbers);
      }, []);
      setNumbers(combinedData);
    } catch (error) {
      console.error('Error fetching data from URLs:', error);
      setNumbers([]);
    }
  };

  return (
    <div>
      <h1>Number Management Service</h1>
      <input
        type="text"
        value={inputUrls}
        onChange={(e) => setInputUrls(e.target.value)}
        placeholder="Enter URLs separated by commas"
      />
      <button onClick={() => fetchDataFromUrls(inputUrls.split(',').map(url => url.trim()))}>Fetch Numbers</button>
      <div>
        <h2>Result:</h2>
        <p>{numbers.join(', ')}</p>
      </div>
    </div>
  );
}

export default App;
