import './App.css';
import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { generateEmbeddings } from './lib/Embeddings';
import { vectorSearch } from './lib/VectorSearch';
import { Details } from './components/Details';
import { getMovie } from './lib/GetMovie';

export function App() {

  const [searchTerm, setSearchTerm] = useState('');
  const [embeddings, setEmbeddings] = useState<Array<number>>([]); 
  const [searchResults, setSearchResults] = useState<Array<any>>([]);
  const [movieDetails, setMovieDetails] = useState<any>(null);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleGenerateEmbeddings = () => {
    if (searchTerm) {
      setEmbeddings([]); // Clear previous embeddings
      setSearchResults([]); // Clear previous search results
      generateEmbeddings(searchTerm, (embeddings) => {
        setEmbeddings(embeddings);
      });
    }
  }

  const handleVectorSearch = () => {
    if (embeddings.length > 0) {
      vectorSearch(embeddings, (results) => {
        setSearchResults(results);
      });
    }
  }

  return (
    <>
      <Details
        data={movieDetails}
        visible={movieDetails !== null}
        onClose={() => setMovieDetails(null)}
        className="movieDetails"
      />
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
            <div 
            key={e.id} 
            className='search-item'
            onClick={() => {
              getMovie(e.id, (r) => setMovieDetails(r))}}>
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
