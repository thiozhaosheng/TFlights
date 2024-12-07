// Initialize Flatpickr
let calendar = flatpickr("#dateRange", {
  mode: "single", // Default to single date selection
  dateFormat: "M j, Y", // Date format
  minDate: "today", // Optional: sets the minimum selectable date
  onChange: function (selectedDates, dateStr, instance) {
    // You can add any additional logic for when a date is selected
  },
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
  const navbar = document.querySelector(".navbar");
  const windowWidth = window.innerWidth; // Get the viewport width

  // Check if the scroll position is past 100px OR the window width is 820px or smaller, OR between 820px and 1180px
  if (
    window.scrollY > 100 ||
    windowWidth <= 820 ||
    (windowWidth >= 820 && windowWidth <= 1180)
  ) {
    navbar.classList.add("navbar-scrolled"); // Add background color when scrolled past 100px or width is 820px or smaller, or between 820px and 1180px
  } else {
    navbar.classList.remove("navbar-scrolled"); // Remove background color when at the top and width is outside the range
  }
}

// Listen for scroll events
window.addEventListener("scroll", handleNavbarStyle);

// Listen for window resize events to handle changes in viewport width
window.addEventListener("resize", handleNavbarStyle);

// Initial call to set navbar style based on the current state
handleNavbarStyle();

// JavaScript for rotating text
const heroData = [
  { text1: "Drift", text2: "Flow with adventure" },
  { text1: "Soar", text2: "Lift your dreams" },
  { text1: "Roam", text2: "Uncover hidden gems" },
];

let currentTextIndex = 0;

const heroTextElement = document.getElementById("hero-text");
const heroParagraphElement = heroTextElement.nextElementSibling; // assuming the <p> tag is right after <h1>

// Function to update the text every 3 seconds
setInterval(() => {
  currentTextIndex = (currentTextIndex + 1) % heroData.length;
  heroTextElement.textContent = heroData[currentTextIndex].text1;
  heroParagraphElement.textContent = heroData[currentTextIndex].text2;
}, 3000);

// Fetch airport data (e.g., from JSON file or API)
fetch("countryData.json")
  .then((response) => response.json())
  .then((countriesData) => {
    // Get the input fields and their suggestion divs
    const originInput = document.getElementById("origin");
    const destinationInput = document.getElementById("destination");
    const originSuggestionsDiv = document.getElementById("originSuggestions");
    const destinationSuggestionsDiv = document.getElementById(
      "destinationSuggestions"
    );

    console.log("Fetched Countries Data:", countriesData); // Log fetched JSON data

    // Function to handle input events and filter matching airport names or country names
    function handleInput(event, suggestionsDiv, field) {
      const query = event.target.value.toLowerCase(); // Convert input to lowercase for case-insensitive comparison
      console.log("Query:", query); // Log the current query entered by the user
      suggestionsDiv.innerHTML = ""; // Clear previous suggestions

      if (query.length > 0) {
        const airports = [];
        const countries = [];

        // Loop through the countries and airports
        countriesData.forEach((country) => {
          country.data.data.forEach((airport) => {
            // Ignore entries with "type": "CITY"
            if (airport.type === "CITY") {
              return;
            }

            // First, check if airport name matches query
            if (airport.name.toLowerCase().includes(query)) {
              airports.push(airport); // Push matching airport object to the array
            }
            // Then check if country name matches query
            else if (airport.countryName.toLowerCase().includes(query)) {
              countries.push(airport); // Push airports from matching country to the array
            }
          });
        });

        // Log the airports and countries found
        console.log("Matching Airports:", airports);
        console.log("Matching Countries:", countries);

        // Display the matching airports first (priority)
        airports.forEach((airport) => {
          const suggestionItem = document.createElement("div");
          suggestionItem.classList.add("suggestion-item");
          suggestionItem.textContent = airport.name;
          suggestionItem.addEventListener("click", function () {
            field.value = airport.name; // Set selected airport name in the input
            field.dataset.id = airport.id; // Store the corresponding ID in the input's dataset
            suggestionsDiv.innerHTML = ""; // Clear suggestions after selection
            console.log("Selected Airport:", airport.name, "ID:", airport.id); // Log the selected airport and ID
          });
          suggestionsDiv.appendChild(suggestionItem);
        });

        // Show the matching airports for countries only if no direct match
        if (airports.length === 0 && countries.length > 0) {
          countries.forEach((airport) => {
            const suggestionItem = document.createElement("div");
            suggestionItem.classList.add("suggestion-item");
            suggestionItem.textContent = airport.name; // Display airport name from country match
            suggestionItem.addEventListener("click", function () {
              field.value = airport.name; // Set selected airport name in the input
              field.dataset.id = airport.id; // Store the corresponding ID in the input's dataset
              suggestionsDiv.innerHTML = ""; // Clear suggestions after selection
              console.log("Selected Airport:", airport.name, "ID:", airport.id); // Log the selected airport and ID
            });
            suggestionsDiv.appendChild(suggestionItem);
          });
        }

        // Show the suggestions dropdown
        suggestionsDiv.style.display = "block";
      } else {
        suggestionsDiv.style.display = "none"; // Hide suggestions if no query entered
      }
    }

    // Add event listeners for both input fields
    originInput.addEventListener("input", function (event) {
      console.log("Origin Input Value:", event.target.value); // Log origin input value
      handleInput(event, originSuggestionsDiv, originInput);
    });

    destinationInput.addEventListener("input", function (event) {
      console.log("Destination Input Value:", event.target.value); // Log destination input value
      handleInput(event, destinationSuggestionsDiv, destinationInput);
    });
  })
  .catch((error) => {
    console.error("Error loading JSON data:", error); // Log any error during fetch
  });

function showFlightsTable() {
  const resultsSection = document.getElementById("results-section");
  const tableBody = document.querySelector("#flightsTable tbody");

  // Clear any existing rows
  tableBody.innerHTML = "";

  // Retrieve the airport IDs from the data-id attributes
  const originField = document.getElementById("origin");
  const destinationField = document.getElementById("destination");

  const fromId = originField.dataset.id || originField.value.trim();
  const toId = destinationField.dataset.id || destinationField.value.trim();

  if (!fromId || !toId) {
    alert('Please select valid airports for both "From" and "To".');
    return;
  }

  console.log("From ID:", fromId);
  console.log("To ID:", toId);

  // Get the selected departure date from Flatpickr and format it as YYYY-MM-DD
  const dateRangeInput = document.getElementById("dateRange").value.trim();
  const departDate = dateRangeInput
    ? new Date(dateRangeInput).toISOString().split("T")[0] // Format as YYYY-MM-DD
    : null;

  if (!departDate) {
    alert("Please select a valid departure date.");
    return;
  }

  console.log("Formatted Departure Date:", departDate);

  // Retrieve the selected cabin class from the dropdown button
  let cabinClassText = document
    .getElementById("dropdownMenuButton2")
    .textContent.trim();
  // Convert to uppercase and replace spaces with underscores
  cabinClassText = cabinClassText.toUpperCase().replace(/\s+/g, "_");

  // Retrieve passengers as an integer
  const passengersValue = document
    .getElementById("passengersDropdown")
    .value.trim();
  const passengers = parseInt(passengersValue, 10);
  const validPassengers = isNaN(passengers) ? 1 : passengers;

  const url =
    "https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights";
  const params = new URLSearchParams({
    fromId: fromId,
    toId: toId,
    departDate: departDate,
    pageNo: 1,
    adults: validPassengers,
    children: "0,17",
    sort: "FASTEST",
    cabinClass: cabinClassText,
    currency_code: "SGD",
  });

  fetch(`${url}?${params.toString()}`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "booking-com15.p.rapidapi.com",
      "x-rapidapi-key": "056ef2774amsh1a1961b16354b7dp1b4746jsnef2b47e7b515",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const flightOffers = data?.data?.flightOffers || [];

      if (flightOffers.length > 0) {
        const topTen = flightOffers.slice(0, 10);
        topTen.forEach((offer) => {
          // Safely extract fields
          const segment = offer.segments?.[0];
          const leg = segment?.legs?.[0];
          const carrierData = leg?.carriersData?.[0];

          const departureAirport = segment?.departureAirport?.name || "N/A";
          const arrivalAirport = segment?.arrivalAirport?.name || "N/A";
          const flightNumber = leg?.flightInfo?.flightNumber || "N/A";
          const airlineCode = carrierData?.code || "N/A";
          const airlineName = carrierData?.name || "N/A";
          const airlineLogo = carrierData?.logo || "";
          const flightPrice = offer?.priceBreakdown?.total?.units || "N/A";

          const departureTimeRaw = segment?.departureTime || "N/A";
          const arrivalTimeRaw = segment?.arrivalTime || "N/A";

          let departureTime = "N/A";
          let arrivalTime = "N/A";

          if (departureTimeRaw !== "N/A") {
            const departureDateObj = new Date(departureTimeRaw);
            departureTime = departureDateObj.toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });
          }

          if (arrivalTimeRaw !== "N/A") {
            const arrivalDateObj = new Date(arrivalTimeRaw);
            arrivalTime = arrivalDateObj.toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });
          }

          const row = document.createElement("tr");
          row.innerHTML = `
                      <td>${
                        airlineLogo
                          ? `<img src="${airlineLogo}" alt="Airline Logo" style="width:50px;">`
                          : "N/A"
                      }</td>
                      <td>${airlineName}</td>
                      <td>${airlineCode}</td>
                      <td>${flightNumber}</td>
                      <td>${departureAirport}</td>
                      <td>${arrivalAirport}</td>
                      <td>${departureTime}</td>
                      <td>${arrivalTime}</td>
                      <td>$${flightPrice}</td>
                  `;
          tableBody.appendChild(row);
        });
      } else {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="9" class="text-center">No flight offers found.</td>`;
        tableBody.appendChild(row);
      }

      // Show the results section
      resultsSection.style.display = "block";
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="9" class="text-center">Error fetching flight data.</td>`;
      tableBody.appendChild(row);
      resultsSection.style.display = "block";
    });
}
