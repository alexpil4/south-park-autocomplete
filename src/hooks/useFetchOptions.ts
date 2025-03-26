import { useState, useTransition, useEffect } from 'react';

interface Option {
  id: number;
  label: string;
}

const fetchOptions = async (query: string): Promise<Option[]> => {
  const response = await fetch(
    `https://spapi.dev/api/characters?search=${query}`,
  );
  const { data } = await response.json();

  return data.map((character: Character) => ({
    id: character.id,
    label: character.name,
  }));
};

// Custom Hook per la ricerca
export default function useFetchOptions() {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, startTransition] = useTransition();

  useEffect(() => {
    // Return empty results if the query is empty
    if (query.trim().length === 0) {
      setOptions([]);
      return;
    }
    // Happy path - the query is managed by useTransition hook and fetched
    startTransition(async () => {
      const result = await fetchOptions(query);
      setOptions(result);
    });
  }, [query]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return { query, options, loading, handleInputChange };
}
