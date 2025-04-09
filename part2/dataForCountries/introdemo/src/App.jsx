import { useState, useEffect } from 'react'
import axios from 'axios'
import { fetchAllData } from './CountriesData'
import FilteredCountries from './components/FilteredCountries'
import CountryDataShown from './components/CountryDataShown'

const App = () => {

  console.log('app component rendered...')
  const [country, setCountry] = useState('')
  const [allCountries, setAllCountries] = useState({})
  const [filteredCountries, setFilteredCountries] = useState([])
  const [countryData, setCountryData] = useState(null)

  // fetch all data from API and convert it into a dictionary for easier filtering
  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchAllData()
      setAllCountries(data)
    }
    getCountries()
  }, [])

  // filter through dictionary if country is searched
  useEffect(() => {
    if (allCountries && Object.keys(allCountries).length > 0) {
      const filtered = Object.values(allCountries).filter(countryData =>
        countryData.name?.common.toLowerCase().includes(country.toLowerCase())
      )
      console.log('Filtered countries:', filtered)
      setFilteredCountries(filtered)
    }
  }, [country, allCountries]) // re-run filter when country or allCountries change

  const handleCountrySearch = (event) => {
    console.log(event.target.value)
    setCountry(event.target.value)
  }

  const showCountryData = (selectedCountry) => {
    // capital, area, languages
    // reset filtered countries so last results disappear before showing data
    // If selectedCountry is already the full object, set countryData directly
    if (selectedCountry) { // Clear filtered countries before showing data
      const foundCountryData = {
        name: selectedCountry.name.common,
        capital: selectedCountry.capital,
        area: selectedCountry.area,
        languages: Object.values(selectedCountry.languages),
        flag: selectedCountry.flags.png
      }
      setCountryData(foundCountryData)
      setFilteredCountries([])
    } else {
      console.log("Country not found")
    }
  }

  return (
    <div>
        find countries <input value={country} onChange={handleCountrySearch}/>
        <FilteredCountries filteredCountries={filteredCountries} showCountryData={showCountryData}/>
        <CountryDataShown countryData={countryData}/>
    </div>
  )
}

export default App