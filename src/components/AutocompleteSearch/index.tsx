import { useState, useCallback, useTransition } from 'react';
import './styles.css';

import useFetchOptions from '../../hooks/useFetchOptions';
import { Option } from '../../types/Global';

export default function AutoComplete() {
  // Input query
  const [query, setQuery] = useState('');
  // Output options
  const [options, setOptions] = useState<Option[]>([]);
  // State for tracking highlighted option
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  // useTransition to manage rendering performance
  const [loading, startTransition] = useTransition();
  // Fetch options using custom hook
  const { fetchedOptions } = useFetchOptions(query);

  // Memoized function to fetch options based on user input
  const memoizedFetchOptions = useCallback(
    async (value: string) => {
      if (value.trim().length === 0) {
        setOptions([]);
        return;
      }
      setOptions(fetchedOptions);
    },
    [fetchedOptions],
  );

  // Handle input change and trigger data fetching
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    startTransition(() => {
      memoizedFetchOptions(value);
    });
  };

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'ArrowDown') {
        // Move highlight down the list
        setHighlightedIndex((prev) => {
          if (prev === null || prev >= options.length - 1) {
            // Back to the first element if bottom list is reached or no selected option
            return 0;
          }
          // Go to next option
          return prev + 1;
        });
      } else if (event.key === 'ArrowUp') {
        // Move highlight up the list
        setHighlightedIndex((prev) => {
          if (prev === null || prev <= 0) {
            // Back to the last element if top list is reached or no selected option
            return options.length - 1;
          }
          // Go to previous option
          return prev - 1;
        });
      } else if (event.key === 'Enter' && highlightedIndex !== null) {
        // If exists the highlighted option, select it
        const selectedOption = options[highlightedIndex];
        if (selectedOption) {
          setQuery(selectedOption.label);

          // Reset options and highlighted substring
          setOptions([]);
          setHighlightedIndex(null);
        }
      }
    },
    [highlightedIndex, options],
  );

  const handleOptionClick = (selectedOption: Option) => {
    if (highlightedIndex !== null) setQuery(selectedOption.label);

    // Reset options and highlighted substring
    setOptions([]);
    setHighlightedIndex(null);
  };

  const highlightMatch = useCallback(
    (text: string): React.ReactElement => {
      // Highlight the query
      // Search for query (insensitive case) into the global string
      const regex = new RegExp(`(${query})`, 'gi');
      return (
        <>
          {text
            // Divide the string each time query string appears into the string
            // Query: test => ['Once a time a', 'test', 'appears over there!']
            .split(regex)
            .map((part, index) =>
              part.toLowerCase() === query.toLowerCase() ? (
                <strong key={index} className="highlight-match">
                  {part}
                </strong>
              ) : (
                part
              ),
            )}
        </>
      );
    },
    [query],
  );

  return (
    <div className="autocomplete-wrapper">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        className="autocomplete-input"
      />

      {fetchedOptions.length > 0 ? (
        <ul
          className={`autocomplete-options ${
            options.length === 0 ? 'hidden-options' : ''
          }`}
        >
          {options.map((option, index) => (
            <li
              key={option.id}
              style={{
                background: highlightedIndex === index ? '#f0f0f0' : 'white',
              }}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
              onMouseLeave={() => setHighlightedIndex(null)}
            >
              {highlightMatch(option.label)}
            </li>
          ))}
        </ul>
      ) : loading ? (
        <ul className="autocomplete-options">
          <li key="loading">Loading...</li>
        </ul>
      ) : null}
    </div>
  );
}
