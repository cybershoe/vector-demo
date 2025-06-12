import './App.css';
import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { generateEmbeddings } from './lib/Embeddings';
import { vectorSearch } from './lib/VectorSearch';

export function App() {

  const [searchTerm, setSearchTerm] = useState('');
  const [embeddings, setEmbeddings] = useState<Array<number>>([]); 
  const [searchResults, setSearchResults] = useState<Array<any>>([]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleGenerateEmbeddings = () => {
    console.log('Generating embeddings for:', searchTerm);
    if (searchTerm) {
      generateEmbeddings(searchTerm, (embeddings) => {
        console.log('Generated embeddings:', embeddings);
        setEmbeddings(embeddings);
      });
    }
  }

  const handleVectorSearch = () => {
    console.log('Performing vector search with embeddings:', embeddings);
    if (embeddings.length > 0) {
      vectorSearch(embeddings, (results) => {
        console.log('Vector search results:', results);
        setSearchResults(results);
      });
    }
  }

  return (
    <>
      <h1>Vector search demo</h1>
      <div id='search-container'>
      <h2>Enter a search phrase</h2>
      <SearchBar onChange={handleSearchChange} />
      <button onClick={handleGenerateEmbeddings} disabled={!searchTerm}>
        Generate Embeddings
      </button>
      </div>

      <div id="embeddings-output"
      style={{ display: embeddings.length > 0 ? 'block' : 'none' }}>
        <h3>Embeddings</h3>
        <div className='embeddings-list'>
        {embeddings.join(' ')}
        </div>
        <button onClick={handleVectorSearch}>
          Vector Search
        </button>
      </div>

      <div id="search-output"
      style={{ display: searchResults.length > 0 ? 'block' : 'none' }}>
        <h3>Search Results</h3>
        <div className='search-list'>
        {searchResults.map((e) => {
          return (
            <div key={e.id} className='search-item'>
              <h4>{e.title}</h4>
              <p>{e.plot}</p>
              <p><strong>Score:</strong> {e.score}</p>
            </div>
          );
        })}
        </div>
      </div>


    </>
  );
}
