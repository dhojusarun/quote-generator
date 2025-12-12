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
let currentCategory = '';   // EMPTY ON PAGE LOAD
let currentQuoteIndex = 0;
let currentFontSize = 18;

const FONT_SIZE_STEP = 2;
const MIN_FONT_SIZE = 14;
const MAX_FONT_SIZE = 28;

// --- Core Functions ---

/**
 * Displays quote or shows text if no category selected.
 */
function displayQuote() {
    if (!currentCategory) {
        quoteTextElement.textContent = "Select a category to view quotes.";
        authorElement.textContent = "";
        previousButton.disabled = true;
        nextButton.disabled = true;
        randomButton.disabled = true;
        return;
    }

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
 * Updates next/previous buttons based on quote index
 */
function updateNavigationButtons() {
    const quotes = quote[currentCategory];
    previousButton.disabled = currentQuoteIndex === 0;
    nextButton.disabled = currentQuoteIndex === quotes.length - 1;
    randomButton.disabled = quotes.length <= 1;
}

/**
 * Selects a random quote
 */
function selectRandomQuote() {
    if (!currentCategory) return;
    const quotes = quote[currentCategory];

    if (quotes.length > 0) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * quotes.length);
        } while (randomIndex === currentQuoteIndex && quotes.length > 1);

        currentQuoteIndex = randomIndex;
        displayQuote();
    }
}

// --- Event Handlers ---

function handleCategoryChange(event) {
    currentCategory = event.target.value;
    currentQuoteIndex = 0;
    displayQuote();
}

function handlePreviousClick() {
    if (currentQuoteIndex > 0) {
        currentQuoteIndex--;
        displayQuote();
    }
}

function handleNextClick() {
    const quotes = quote[currentCategory];
    if (currentQuoteIndex < quotes.length - 1) {
        currentQuoteIndex++;
        displayQuote();
    }
}

function handleCopyClick() {
    const quoteToCopy = `${quoteTextElement.textContent} ${authorElement.textContent}`;
    navigator.clipboard.writeText(quoteToCopy)
        .then(() => alert('Quote copied to clipboard!'));
}

function handleShareClick() {
    const quoteToShare = `${quoteTextElement.textContent} ${authorElement.textContent}`;
    if (navigator.share) {
        navigator.share({
            title: 'Quote of the Day',
            text: quoteToShare,
        });
    } else {
        alert(`Share this quote:\n\n${quoteToShare}`);
    }
}

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

function resetFontSize() {
    currentFontSize = 18;
    quoteTextElement.style.fontSize = '';
}

// --- Event Listeners ---
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

// --- Initial Page State ---
displayQuote();   // Show "Select a category..." on page load
