import { useState, useEffect } from 'react'
import countriesService from './services/countries'

import useCountry from './hook';


const GetWeather = ({ country }) => {
  const [temperature, setTemperature] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [iconSrc, setIconSrc] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await countriesService.getWeather(country.latlng[0], country.latlng[1]);
        setTemperature(response.current.temp - 273.15);
        setWindSpeed(response.current.wind_speed);
        setIconSrc(`https://openweathermap.org/img/wn/${response.current.weather[0].icon}@2x.png`)
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [country]);

  return (
    <div>
      <p>temperature - {temperature}</p>
      <img src={iconSrc}/>
      <p>wind {windSpeed}</p>
    </div>
    
  );
};


const ShowDetails = ({ country }) => {
  let languages = Object.values(country.languages);
  return (
    <div key={country.name.official}>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>

      <h3>languages:</h3>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.flags.alt}`} />
      <GetWeather country={country}/>
    </div>
  );
};

const Countries = ({ allCountries }) => {
  const [showDetails, setShowDetails] = useState(null);

  const handleShowDetails = (country) => {
    setShowDetails(country.name.common); // Store the country name instead of the entire object
  };

  if (allCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (allCountries.length === 1) {
    return (
      <div>
        <ShowDetails country={allCountries[0]} />
      </div>
    );
  } else {
    return allCountries.map((country) => (
      <div key={country.name.official}>
        <span> {country.name.common} </span>
        <button onClick={() => handleShowDetails(country)}>Show</button>
        {showDetails === country.name.common && ( // Compare the names
          <ShowDetails country={country} />
        )}
      </div>
    ));
  }
};




const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const { filteredCountries, loading, error } = useCountry(searchValue);

  // const filteredCountry = useCountry(countries, searchValue);


  // useEffect(() => {
  //   countriesService.getAll().then(response => setCountries(response));
  // }, []);

  // const countriesToShow = showAll
  //   ? []
  //   : countries.filter((country) => country.name.common.toLowerCase().includes(searchValue.toLowerCase()));

  // const handleSearchValue = (event) => {
  //   let value = event.target.value;
  //   setSearchValue(value);
  //   setShowVal(value === "")
  // }
  const handleSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div>
      <h1>Countries</h1>
      <p>find countries <input value={searchValue} onChange={handleSearchValue}></input></p>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <Countries allCountries={filteredCountries} />
    </div>
  );
}

export default App