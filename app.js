// ==========================================
// Yu-Gi-Oh! Card Search
// Version 1.0
// Phase 1 - Section 1
// ==========================================

let allCards = [];
let filteredCards = [];
let recentSearches = [];

// Load the card database
async function loadCards() {
    try {
        const response = await fetch("cardinfo.json");
        const data = await response.json();

        allCards = data.data;

        console.log(`Loaded ${allCards.length} cards`);

        initialiseApp();

    } catch (error) {
        console.error("Unable to load card database.", error);
    }
}

function initialiseApp() {
    const searchBox = document.getElementById("searchBox");

    searchBox.addEventListener("input", searchCards);

    searchBox.focus();
}

// Start the app
loadCards();
