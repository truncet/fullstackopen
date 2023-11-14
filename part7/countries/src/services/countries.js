import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const weatherUrl = 'https://api.openweathermap.org/data/3.0/onecall'
const api_key = import.meta.env.VITE_SOME_KEY

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getWeather = (latitude, longitude) => {
  let url = `${weatherUrl}?lat=${latitude}&lon=${longitude}&appid=${api_key}`
  const request = axios.get(url);
  return request.then(response => response.data)
}


export default { getAll , getWeather}