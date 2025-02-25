import { useState, useEffect } from 'react'
import { fetchAllData } from './CountriesData'
import axios from 'axios'
import FilteredCountries from './components/FilteredCountries'
const App = () => {

  const [country, setCountry] = useState('')
  const [allCountries, setAllCountries] = useState({})
  const [filteredCountries, setFilteredCountries] = useState([])

  // fetch all data from api and convert into dict for easier filtering
  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchAllData()
      setAllCountries(data)
    }
    getCountries()
  }, [])

  // filter through dict if country searched
  useEffect(() => {
    if (allCountries && Object.keys(allCountries).length > 0) {
      const filtered = Object.values(allCountries).filter(countryData =>
        countryData.name?.common.toLowerCase().includes(country.toLowerCase())
      )
      setFilteredCountries(filtered)
    }
  }, [country, allCountries]) //re-run filter when country or allCountries change

  const handleCountrySearch = (event) => {
    console.log(event.target.value)
    setCountry(event.target.value)
  }

  return (
    <div>
        find countries <input value={country} onChange={handleCountrySearch}/>
    <FilteredCountries filteredCountries={filteredCountries}/>
    </div>
  )
}
export default App
