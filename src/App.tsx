import './App.css';
import AutoComplete from './components/AutocompleteSearch';

function App() {
  return (
    <>
      <h1 className="welcome-title">
        Welcome to{' '}
        <span className="highlight">South Park Character Finder</span>
      </h1>
      <p className="description">
        Search for your favorite South Park characters.
      </p>

      <AutoComplete />
    </>
  );
}

export default App;
