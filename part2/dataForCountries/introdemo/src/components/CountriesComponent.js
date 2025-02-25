import { useEffect, useState } from 'react'
import { fetchAllData } from '../CountriesData'

const CountriesComponent = () => {
  const [countries, setCountries] = useState({})

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchAllData()
      setCountries(data)
    }

    getCountries()
  }, [])

  return (
    <div>
      <h1>Countries</h1>
      <ul>
        {Object.keys(countries).map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CountriesComponent
