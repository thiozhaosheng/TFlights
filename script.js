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
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');

    // Check the scroll position (you can adjust the 100 value for when you want the navbar to change)
    if (window.scrollY > 100) {
        navbar.classList.add('navbar-scrolled'); // Add a background color when scrolled past 100px
    } else {
        navbar.classList.remove('navbar-scrolled'); // Remove background color when at the top
    }
});