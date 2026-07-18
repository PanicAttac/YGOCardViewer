/*
==========================================================
 Project Millennium
 User Interface Controller
 ui.js - Part 1
==========================================================
*/

"use strict";

/* ========================================================
   UI Controller
======================================================== */

const UI = {

    elements: {},

    initialise() {

        this.cacheElements();
        this.createLoadingOverlay();

        console.log("UI initialised.");

    },

    /* =====================================================
       Cache DOM Elements
    ===================================================== */

    cacheElements() {

        this.elements = {

            searchInput: document.getElementById("searchInput"),

            searchResults: document.getElementById("searchResults"),

            cardDisplay: document.getElementById("cardDisplay"),

            statusMessage: document.getElementById("statusMessage")

        };

    },

    /* =====================================================
       Loading Overlay
    ===================================================== */

    createLoadingOverlay() {

        const overlay = document.createElement("div");

        overlay.id = "loadingOverlay";

        overlay.innerHTML = `

            <div class="loading-content">

                <div class="spinner"></div>

                <div class="loading-text">
                    Loading card database...
                </div>

            </div>

        `;

        overlay.style.display = "none";

        document.body.appendChild(overlay);

        this.elements.loadingOverlay = overlay;

    },

    showLoading(message = "Loading...") {

        this.elements.loadingOverlay.style.display = "flex";

        this.elements.loadingOverlay.querySelector(".loading-text").textContent = message;

    },

    hideLoading() {

        this.elements.loadingOverlay.style.display = "none";

    },

    /* =====================================================
       Status Messages
    ===================================================== */

    showMessage(message) {

        if (!this.elements.statusMessage)
            return;

        this.elements.statusMessage.textContent = message;
        this.elements.statusMessage.className = "status-message";

    },

    showError(message) {

        if (!this.elements.statusMessage)
            return;

        this.elements.statusMessage.textContent = message;
        this.elements.statusMessage.className = "status-message error";

    },

    clearMessage() {

        if (!this.elements.statusMessage)
            return;

        this.elements.statusMessage.textContent = "";

    },

    /* =====================================================
       Search Results
    ===================================================== */

    clearResults() {

        this.elements.searchResults.innerHTML = "";

    },

    showNoResults() {

        this.clearResults();

        const result = document.createElement("div");

        result.className = "no-results";

        result.innerHTML = `

            <div class="no-results-icon">🔍</div>

            <div class="no-results-title">
                No cards found
            </div>

            <div class="no-results-text">
                Try another search.
            </div>

        `;

        this.elements.searchResults.appendChild(result);

    },

    displaySearchResults(cards = []) {

        this.clearResults();

        if (cards.length === 0) {

            this.showNoResults();

            return;

        }

        cards.forEach(card => {

            this.elements.searchResults.appendChild(

                this.createResultCard(card)

            );

        });

    },

    createResultCard(card) {

        const cardElement = document.createElement("div");

        cardElement.className = "search-result";

        const image =
            card.card_images?.[0]?.image_url_cropped || "";

        const attribute =
            card.attribute || "";

        const race =
            card.race || "";

        const type =
            card.type || "";

        cardElement.innerHTML = `

            <img
                class="result-image"
                src="${image}"
                alt="${card.name}"
            >

            <div class="result-info">

                <div class="result-name">
                    ${card.name}
                </div>

                <div class="result-type">
                    ${type}
                </div>

                <div class="result-details">
                    ${attribute} ${race}
                </div>

            </div>

        `;

        cardElement.addEventListener("click", () => {

            if (typeof displayCard === "function") {

                displayCard(card);

            }

        });

        return cardElement;

    },

    /* =====================================================
       Utilities
    ===================================================== */

    scrollToSearch() {

        if (!this.elements.searchInput)
            return;

        this.elements.searchInput.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

        this.elements.searchInput.focus();

    },

    clearCardDisplay() {

        if (!this.elements.cardDisplay)
            return;

        this.elements.cardDisplay.innerHTML = "";

    }

};

/* ========================================================
   Initialise UI
======================================================== */

document.addEventListener("DOMContentLoaded", () => {

    UI.initialise();

});
