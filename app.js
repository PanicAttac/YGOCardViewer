// ==========================================
// Yu-Gi-Oh Card Viewer
// Phase 1 - Database Loader
// ==========================================

let allCards = [];

// YGOPRODeck database
const CARD_DATABASE_URL =
    "https://db.ygoprodeck.com/api/v7/cardinfo.php";


// Load card database
async function loadCards() {

    try {

        console.log("Downloading card database...");

        const response = await fetch(CARD_DATABASE_URL);

        const data = await response.json();

        allCards = data.data;

        console.log(`Loaded ${allCards.length} cards`);

        initialiseApp();

    } catch (error) {

        console.error(
            "Could not load card database:",
            error
        );

    }
}


// Prepare app
function initialiseApp() {

    const searchInput =
        document.getElementById("searchInput");


    if (!searchInput) {

        console.error(
            "Search box not found"
        );

        return;
    }


    searchInput.addEventListener(
        "input",
        searchCards
    );


    searchInput.focus();

}


// Search function placeholder
function searchCards(event) {

    const searchTerm =
        event.target.value.toLowerCase();


    if (!searchTerm) {

        return;

    }


    const results = allCards.filter(card =>
        card.name
            .toLowerCase()
            .includes(searchTerm)
    );


    console.log(results);

}


// Start app
loadCards();
