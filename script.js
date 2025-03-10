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

async function getQuote() {
  showLoadingSpinner();
  try {
    const response = await fetch("https://api.quotable.io/random");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const quote = await response.json();
    quoteText.innerText = quote.content;
    authorText.innerText = quote.author ? quote.author : "Unknown";
  } catch (error) {
    console.error("Error fetching quote:", error);
    quoteText.innerText = "Oops! Could not fetch a quote.";
    authorText.innerText = "Try again later.";
  } finally {
    removeLoadingSpinner();
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
