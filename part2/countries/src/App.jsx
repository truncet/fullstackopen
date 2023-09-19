import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const Countries = ({ allCountries }) => {
  if (allCountries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    );
  } else if (allCountries.length === 1) {
    console.log(allCountries[0])
    let languages = Object.values(allCountries[0].languages);
    return allCountries.map((country) => (
      <div key={country.name.official}>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>

        <h3>languages:</h3>
        <ul>
        {
            languages.map((language) =>
              <li key={language}>{language}</li>
          )
        }
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.flags.alt}`} />
      </div>
    ));

  } else {
    return allCountries.map((country) => (
      <p key={country.name.official}> {country.name.common}</p>
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