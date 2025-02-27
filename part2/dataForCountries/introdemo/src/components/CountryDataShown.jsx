const CountryDataShown = ({ countryData }) => {
    if (!countryData) {
        return <p>Select a country to view details</p>
    }

    return (
        <div>
            <h1>{countryData.name}</h1>
            <p><strong>Capital</strong> {countryData.capital}</p>
            <p><strong>Area</strong> {countryData.area} km²</p>
            <div>
                <h2>Languages</h2>
                <ul>
                    {countryData.languages.map((language, index) => (
                        <li key={index}>{language}</li>
                    ))}
                </ul>
            </div>
            <img src={countryData.flag} alt="Switzerland Flag"/>
        </div>
    )
}

export default CountryDataShown