// Get quote from api
const quoteContainer = document.getElementById('quote-container');
const quote = document.getElementById('quote');
const author = document.querySelector('.author');
const newQuote = document.getElementById('new-quote');
const twitterButton = document.querySelector('.twitter-button');
const loader = document.getElementById('loader');


// show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;

}

// hide loading 
function complete() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }

}

async function getQuote() {
    loading()
       try {
        const response = await fetch('https://api.quotable.io/random')
        const data = await response.json()
        // add class for long quotes
        if(data.content.length > 120 ){
            quote.classList.add('long-quote')
        } else {
            quote.classList.remove('long-quote')
        }
        quote.textContent = data.content;

        // if author is blank, add unknown
        if(data.author === ''){
            author.textContent = 'unknown'
        } else {
             author.innerHTML = data.author;
        }
       
    // stop loader
    complete()
    } catch (error) {
        console.log('there is no response', error);
    } 
}

// tweet quote
function tweetQuote() {
    const quote = quote.innerText;
    const author = author.innerText;
    const twitterUrl = url(`https://twitter.com/intent/follow?text=${quote} - ${author}`);

    window.open(twitterUrl, '_blank');
}



 
// Event Listener
twitterButton.addEventListener('click', tweetQuote);
newQuote.addEventListener('click', getQuote);

// on load 
getQuote();
