import React, { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { SearchResults } from '../components/SearchResults';
import { SearchResult } from '../lib/search';

const Search: React.FC = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [currentQuery, setCurrentQuery] = useState('');

  const handleSearchResults = (searchResults: SearchResult[]) => {
    setResults(searchResults);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Search Our Content
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find sermons, blog posts, news articles, and events from our church community.
          </p>
        </div>

        <SearchBar
          onResults={(results) => {
            setResults(results);
            setCurrentQuery(''); // Will be updated when we track the query
          }}
          placeholder="Search for sermons, blog posts, news, events..."
        />

        {results.length > 0 && (
          <div className="mt-12">
            <SearchResults results={results} query={currentQuery} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;