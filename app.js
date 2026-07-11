/*
==========================================================
 Project Millennium
 Application Entry Point
==========================================================
*/

const AppPaths = {

    config: "app-config.json",

    database: "cardinfo.json",

    assets: "assets/",

    icons: "assets/icons/",

    images: "assets/images/"

};


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

    const cardCount = document.getElementById("cardCount");

    try {

        cardCount.textContent = "Downloading card database...";

        const response = await fetch(CARD_DATABASE_URL);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        allCards = data.data;

        cardCount.textContent =
            `Loaded ${allCards.length} cards`;

        initialiseApp();

    } catch (error) {

        cardCount.textContent =
            "Failed to load card database.";

        console.error(error);

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
