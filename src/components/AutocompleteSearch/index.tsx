import useFetchOptions from '../../hooks/useFetchOptions';
import './styles.css';

export default function AutoComplete() {
  const { query, options, loading, handleInputChange } = useFetchOptions();

  return (
    <div className="autocomplete-wrapper">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={loading ? 'Loading...' : 'Search...'}
        className="autocomplete-input"
      />

      {loading && (
        <ul className="autocomplete-options">
          <li key="loading">Loading...</li>
        </ul>
      )}

      {options.length > 0 && (
        <ul className="autocomplete-options">
          {options.map((option) => (
            <li key={option.id}>{option.label}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
