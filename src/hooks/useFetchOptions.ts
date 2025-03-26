import { useState, useEffect } from 'react';
import { Option } from '../types/Global';

const useFetchOptions = (query: string) => {
  const [fetchedOptions, setFetchedOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    const fetchOptions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://spapi.dev/api/characters?search=${query}`,
        );
        const { data } = await response.json();
        setFetchedOptions(
          data.map((character: Character) => ({
            id: character.id,
            label: character.name,
          })),
        );
      } catch (err) {
        console.log(err);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [query]);

  return { fetchedOptions, loading, error };
};

export default useFetchOptions;
