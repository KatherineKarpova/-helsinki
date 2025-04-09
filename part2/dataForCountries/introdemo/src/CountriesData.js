import axios from 'axios'

// get all data from https://studies.cs.helsinki.fi/restcountries/api/all
export const fetchAllData = async () => {
  try {
    const response = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    console.log('All countries data retrieved')

    // convert the array into an object with common names as keys
    const data = response.data.reduce((acc, country) => {
      acc[country.name.common] = country
      return acc
    }, {})
    return data
  } catch (error) {
    console.error('Error fetching countries data:', error)
    return {}
  }
}
