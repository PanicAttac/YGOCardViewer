// ==========================================
// Yu-Gi-Oh! Card Search
// Version 1.0
// ==========================================

// Global Variables
let allCards = [];
let filteredCards = [];
let selectedCard = null;

// Initialise the app
document.addEventListener("DOMContentLoaded", init);

async function init() {
    console.log("Starting Yu-Gi-Oh! Card Search...");

    await loadCardDatabase();

    console.log(`Loaded ${allCards.length} cards`);
}

// Load the JSON database
async function loadCardDatabase() {
    try {

        const response = await fetch("cardinfo.json");

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const json = await response.json();

        // YGOPRODeck stores cards inside "data"
        allCards = json.data;

        console.log("Database loaded successfully.");

    } catch (error) {

        console.error("Unable to load card database:", error);

        alert(
            "Unable to load card database.\n\n" +
            "Make sure cardinfo.json is in the same folder as index.html."
        );

    }
}
