const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show loading
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading
function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote from quotable API
async function getQuote() {
  showLoadingSpinner();
  try {
    const response = await fetch("https://api.quotable.io/random");
    const quote = await response.json();

    // Reduce font size for long quotes
    if (quote.content.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = quote.content;

    quote.author === "" ? "Unknown" : (authorText.innerText = quote.author);

    // Stop loader and show Quote
    removeLoadingSpinner();
  } catch (error) {
    getQuote();
    console.log("Whoops, no quote !", error);
  }
}

// Tweet Quote
async function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerHTML;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On page load/reload
getQuote();
