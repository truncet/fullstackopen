import { useState, useEffect } from 'react';
import countriesService from './services/countries';

const useCountry = (searchTerm) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    countriesService.getAll().then(response => {
      setCountries(response)
      setLoading(false)
    }).catch(error => {
      setError(error);
      setLoading(false);
    });

  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = countries.filter(country => 
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  }, [searchTerm, countries]);

  return { countries, filteredCountries, loading, error };
};

export default useCountry;
