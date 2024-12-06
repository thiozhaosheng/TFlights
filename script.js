// Initialize Flatpickr
let calendar = flatpickr("#dateRange", {
    mode: "single", // Default to single date selection
    dateFormat: "M j, Y", // Date format
    minDate: "today", // Optional: sets the minimum selectable date
    onChange: function(selectedDates, dateStr, instance) {
        // You can add any additional logic for when a date is selected
    }
});

// Function to update the button text when an option is selected
function updateDropdownText(item, buttonId) {
    // Update the text of the dropdown button
    const button = document.getElementById(buttonId);
    button.innerText = item.innerText;

    // Check the selection and update Flatpickr options
    if (item.innerText === "One way") {
        // Set to single date mode and reset the date picker
        calendar.set({
            mode: "single",
        });
        calendar.clear(); // Clear previous selections
    } else if (item.innerText === "Return") {
        // Set to date range mode and reset the date picker
        calendar.set({
            mode: "range",
        });
        calendar.clear(); // Clear previous selections
    }
}

function updateSelection() {
    // Perform any update logic you want when the button is clicked
    alert("Selection updated!");
}

// Listen for the scroll event
function handleNavbarStyle() {
    const navbar = document.querySelector('.navbar');
    const windowWidth = window.innerWidth; // Get the viewport width

    // Check if the scroll position is past 100px OR the window width is 820px or smaller, OR between 820px and 1180px
    if (window.scrollY > 100 || windowWidth <= 820 || (windowWidth >= 820 && windowWidth <= 1180)) {
        navbar.classList.add('navbar-scrolled'); // Add background color when scrolled past 100px or width is 820px or smaller, or between 820px and 1180px
    } else {
        navbar.classList.remove('navbar-scrolled'); // Remove background color when at the top and width is outside the range
    }
}

// Listen for scroll events
window.addEventListener('scroll', handleNavbarStyle);

// Listen for window resize events to handle changes in viewport width
window.addEventListener('resize', handleNavbarStyle);

// Initial call to set navbar style based on the current state
handleNavbarStyle();

// JavaScript for rotating text
const heroData = [
    {text1: "Drift", text2: "Flow with adventure"},
    {text1: "Soar", text2: "Lift your dreams"},
    {text1: "Roam", text2: "Uncover hidden gems"}
];

let currentTextIndex = 0;

const heroTextElement = document.getElementById('hero-text');
const heroParagraphElement = heroTextElement.nextElementSibling; // assuming the <p> tag is right after <h1>

// Function to update the text every 3 seconds
setInterval(() => {
    currentTextIndex = (currentTextIndex + 1) % heroData.length;
    heroTextElement.textContent = heroData[currentTextIndex].text1;
    heroParagraphElement.textContent = heroData[currentTextIndex].text2;
}, 3000);

fetch('countryData.json')
  .then(response => response.json())
  .then(countriesData => {
    // Get the input fields and their suggestion divs
    const originInput = document.getElementById("origin");
    const destinationInput = document.getElementById("destination");
    const originSuggestionsDiv = document.getElementById("originSuggestions");
    const destinationSuggestionsDiv = document.getElementById("destinationSuggestions");

    console.log('Fetched Countries Data:', countriesData);  // Log fetched JSON data

    // Function to handle input events and filter matching airport names or country names
    function handleInput(event, suggestionsDiv, field) {
      const query = event.target.value.toLowerCase();  // Convert input to lowercase for case-insensitive comparison
      console.log('Query:', query);  // Log the current query entered by the user
      suggestionsDiv.innerHTML = '';  // Clear previous suggestions

      if (query.length > 0) {
        const airports = [];
        const countries = [];

        // Loop through the countries and airports
        countriesData.forEach(country => {
          country.data.data.forEach(airport => {
            // Ignore entries with "type": "city"
            if (airport.type === "CITY") {
              return;
            }

            // First, check if airport name matches query
            if (airport.name.toLowerCase().includes(query)) {
              airports.push(airport);  // Push matching airport object to the array
            }
            // Then check if country name matches query
            else if (airport.countryName.toLowerCase().includes(query)) {
              countries.push(airport);  // Push airports from matching country to the array
            }
          });
        });

        // Log the airports and countries found
        console.log('Matching Airports:', airports);
        console.log('Matching Countries:', countries);

        // Display the matching airports first (priority)
        airports.forEach(airport => {
          const suggestionItem = document.createElement("div");
          suggestionItem.classList.add("suggestion-item");
          suggestionItem.textContent = airport.name;
          suggestionItem.addEventListener("click", function() {
            field.value = airport.name;  // Set selected airport name in the input
            suggestionsDiv.innerHTML = '';  // Clear suggestions after selection
            console.log('Selected Airport:', airport.name);  // Log the selected airport
          });
          suggestionsDiv.appendChild(suggestionItem);
        });

        // Show the matching airports for countries only if no direct match
        if (airports.length === 0 && countries.length > 0) {
          countries.forEach(airport => {
            const suggestionItem = document.createElement("div");
            suggestionItem.classList.add("suggestion-item");
            suggestionItem.textContent = airport.name;  // Display airport name from country match
            suggestionItem.addEventListener("click", function() {
              field.value = airport.name;  // Set selected airport name in the input
              suggestionsDiv.innerHTML = '';  // Clear suggestions after selection
              console.log('Selected Airport:', airport.name);  // Log the selected airport
            });
            suggestionsDiv.appendChild(suggestionItem);
          });
        }

        // Show the suggestions dropdown
        suggestionsDiv.style.display = "block";
      } else {
        suggestionsDiv.style.display = "none";  // Hide suggestions if no query entered
      }
    }

    // Add event listeners for both input fields
    originInput.addEventListener("input", function(event) {
      console.log('Origin Input Value:', event.target.value);  // Log origin input value
      handleInput(event, originSuggestionsDiv, originInput);
    });

    destinationInput.addEventListener("input", function(event) {
      console.log('Destination Input Value:', event.target.value);  // Log destination input value
      handleInput(event, destinationSuggestionsDiv, destinationInput);
    });
  })
  .catch(error => {
    console.error('Error loading JSON data:', error);  // Log any error during fetch
  });




