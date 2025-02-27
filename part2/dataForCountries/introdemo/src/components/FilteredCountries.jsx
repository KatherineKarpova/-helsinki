const FilteredCountries = ({ filteredCountries, showCountryData }) => {
  
  if (filteredCountries.length > 10) {
    return <p>Too many countries, please specify another filter.</p>;
  }
  return (
    <div>
      {filteredCountries.map((country, index) => (
        <p key={index}>
          {country.name.common}
          <button onClick={() => showCountryData(country)}>show</button>
        </p>
      ))}
    </div>
  )
}
  
export default FilteredCountries