import { useState, useEffect } from 'react'
import countriesService from './services/countries'


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
    </div>
  );
};

const Countries = ({ allCountries }) => {
  const [showDetails, setShowDetails] = useState(null);

  const handleShowDetails = (country) => {
    setShowDetails(country);
  };

  if (allCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (allCountries.length === 1) {
    const languages = Object.values(allCountries[0].languages);
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
        {showDetails === country && (
          <ShowDetails country={country} />
        )}
      </div>
    ));
  }
};



const App = () => {
  const [countries, setCountries] = useState([]) 
  const [searchValue, setSearchValue] = useState('')
  const [showAll, setShowVal] = useState(true);
  const [errorMessage, setErrorMessage] = useState('')


useEffect(() => {
  countriesService.getAll().then (response => setCountries(response))
}, [])

  const countriesToShow = showAll
    ? []
    : countries.filter((country) => country.name.common.toLowerCase().includes(searchValue.toLowerCase()));

  const handleSearchValue = (event) => {
    let value = event.target.value;
    setSearchValue(value);
    setShowVal(value === "")
  }

  return (
    <div>
      <h1>Countries</h1>
      <p>find countries <input value={searchValue} onChange={handleSearchValue}></input></p>

      <Countries allCountries={countriesToShow}/>


      </div>
  )
}

export default App