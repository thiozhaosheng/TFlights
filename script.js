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