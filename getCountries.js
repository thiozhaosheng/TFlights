const fetch = require('node-fetch');
const fs = require('fs');

const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chile",
    "China",
    "Colombia",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czechia",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Grenada",
    "Guatemala",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kenya",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lithuania",
    "Luxembourg",
    "Malaysia",
    "Maldives",
    "Malta",
    "Mauritius",
    "Mexico",
    "Morocco",
    "Netherlands",
    "New Zealand",
    "Norway",
    "Oman",
    "Pakistan",
    "Panama",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Saudi Arabia",
    "Serbia",
    "Seychelles",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "Sweden",
    "Switzerland",
    "Taiwan",
    "Tanzania",
    "Thailand",
    "Turkey",
    "United Arab Emirates",
    "United Kingdom",
    "United States of America",
    "Vietnam"
  ];

const fetchCountryData = async (country) => {
  const url = `https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination?query=${encodeURIComponent(country)}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '056ef2774amsh1a1961b16354b7dp1b4746jsnef2b47e7b515',
      'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Error fetching ${country}: ${response.status}`);
    const data = await response.json();
    console.log(`Data for ${country}:`, data);
    return { country, data };
  } catch (error) {
    console.error(`Failed for ${country}: ${error.message}`);
    return null;
  }
};

(async () => {
  const results = [];

  for (const country of countries) {
    const result = await fetchCountryData(country);
    if (result) results.push(result);
  }

  console.log("Final hardcoded data:", JSON.stringify(results, null, 2));
  
  // Save the data to a JSON file after all the data is fetched
  fs.writeFileSync('C:/Users/ADMIN/Desktop/final-api/countryData.json', JSON.stringify(results, null, 2));
})();
