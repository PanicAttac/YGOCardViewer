/* ==========================================
   Yu-Gi-Oh Card Viewer
   Version 1
   Part 1 - Core Engine
========================================== */

let allCards = [];

const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");
const cardCount = document.getElementById("cardCount");

/* ==========================================
   Load card database
========================================== */

async function loadCards() {

    try {

        cardCount.textContent = "Loading cards...";

        const response = await fetch("cards.json");

        allCards = await response.json();

        cardCount.textContent =
            `${allCards.length.toLocaleString()} cards loaded`;

        displayCards(allCards);

    }

    catch(error){

        console.error(error);

        cardCount.textContent =
            "Unable to load cards.";

    }

}

/* ==========================================
   Live Search
========================================== */

searchInput.addEventListener("input", function(){

    const search =
        this.value.trim().toLowerCase();

    if(search === ""){

        displayCards(allCards);

        return;

    }

    const filtered = allCards.filter(card =>

        card.CardName
            .toLowerCase()
            .includes(search)

    );

    displayCards(filtered);

});

/* ==========================================
   Display Results
========================================== */

function displayCards(cards){

    results.innerHTML = "";

    if(cards.length === 0){

        results.innerHTML =
        `
        <div class="noResults">

            No cards found.

        </div>
        `;

        return;

    }

    cards.forEach(card => {

        const result =
            createCardResult(card);

        results.appendChild(result);

    });

}

/* ==========================================
   Start App
========================================== */

loadCards();
