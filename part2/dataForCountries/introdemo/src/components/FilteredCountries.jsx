const FilteredCountries = ({ filteredCountries }) => {
    return (
      <div>
        {filteredCountries.map((country, index) => (
          <p key={index}>
            {country.name.common}
          </p>
        ))}
      </div>
    )
  }
  
  export default FilteredCountries