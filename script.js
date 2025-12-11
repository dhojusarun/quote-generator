// --- DOM Element Selection ---
const quoteBox = document.getElementById('quote-box');
const quoteTextElement = quoteBox.querySelector('p:first-child');
const authorElement = document.getElementById('author');
const categorySelect = document.getElementById('categories');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const randomButton = document.getElementById('random');
const copyButton = document.getElementById('copy-quote');
const shareButton = document.getElementById('share-quote');
const toggleTheme = document.getElementById('toggle-theme');
const increaseFontButton = document.getElementById('increasefont');
const decreaseFontButton = document.getElementById('decreasefont');
const resetFontButton = document.getElementById('resetfont');

// --- Global State Variables ---
// let currentCategory = 'science'; // Default category
let currentQuoteIndex = 0;
let currentFontSize = 18; // Corresponds to the initial CSS font size
const FONT_SIZE_STEP = 2; // Pixel step for font increase/decrease
const MIN_FONT_SIZE = 14;
const MAX_FONT_SIZE = 28;

// --- Core Functions ---

/**
 * Updates the display with the current quote from the selected category.
 */
function displayQuote() {
    const quotes = quote[currentCategory];
    if (quotes && quotes.length > 0) {
        const currentQuote = quotes[currentQuoteIndex];
        quoteTextElement.textContent = currentQuote.text;
        authorElement.textContent = `- ${currentQuote.author}`;
        updateNavigationButtons();
    } else {
        quoteTextElement.textContent = "No quotes available for this category.";
        authorElement.textContent = "";
    }
}

/**
 * Checks if previous/next buttons should be enabled or disabled.
 */
function updateNavigationButtons() {
    const quotes = quote[currentCategory];
    previousButton.disabled = currentQuoteIndex === 0;
    nextButton.disabled = currentQuoteIndex === quotes.length - 1;
}

/**
 * Selects a random quote within the current category.
 */
function selectRandomQuote() {
    const quotes = quote[currentCategory];
    if (quotes.length > 0) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * quotes.length);
        } while (randomIndex === currentQuoteIndex && quotes.length > 1); // Ensure a new quote is picked if possible
        currentQuoteIndex = randomIndex;
        displayQuote();
    }
}

/**
 * Toggles dark mode on the body element.
 */
function handleThemeToggle() {
    document.body.classList.toggle('dark');
}


function adjustFontSize(delta) {
    const newSize = currentFontSize + delta;
    if (newSize >= MIN_FONT_SIZE && newSize <= MAX_FONT_SIZE) {
        currentFontSize = newSize;
        quoteTextElement.style.fontSize = `${currentFontSize}px`;
    }
}

/**
 * Resets the font size to the initial default.
 */
function resetFontSize() {
    currentFontSize = 18; // Matches the initial CSS style
    quoteTextElement.style.fontSize = ''; // Removes inline style to revert to CSS
}

// --- Event Listeners Initialization ---
categorySelect.addEventListener('change', handleCategoryChange);
previousButton.addEventListener('click', handlePreviousClick);
nextButton.addEventListener('click', handleNextClick);
randomButton.addEventListener('click', selectRandomQuote);
copyButton.addEventListener('click', handleCopyClick);
shareButton.addEventListener('click', handleShareClick);
toggleTheme.addEventListener('change', handleThemeToggle);

increaseFontButton.addEventListener('click', () => adjustFontSize(FONT_SIZE_STEP));
decreaseFontButton.addEventListener('click', () => adjustFontSize(-FONT_SIZE_STEP));
resetFontButton.addEventListener('click', resetFontSize);


// --- Initial Setup ---

// Check if a category is pre-selected and update the state
if (categorySelect.value && categorySelect.value !== 'categories') {
    currentCategory = categorySelect.value;
}

// Load the first quote on page load
displayQuote();
