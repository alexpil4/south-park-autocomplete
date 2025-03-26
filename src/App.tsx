import './App.css';
import AutocompleteSearch from './components/AutocompleteSearch';

function App() {
  return (
    <>
      <h1 className="welcome-title">
        Welcome to <span className="highlight-primary">South Park </span>
        <span className="highlight-secondary">Character Finder</span>
      </h1>
      <p className="description">
        Search for your favorite South Park characters.
      </p>

      <AutocompleteSearch />
    </>
  );
}

export default App;
