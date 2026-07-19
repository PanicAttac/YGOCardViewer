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
/* ========================================================
   Card Display
   Part 2A.1
======================================================== */

UI.displayCard = function (card) {

    if (!card) {

        this.showError("Unable to display card.");

        return;

    }

    this.clearCardDisplay();

    const container = document.createElement("div");

    container.className = "card-view";

    container.dataset.cardId = card.id;

    /* ----------------------------------------------------
       Card Image
    ---------------------------------------------------- */

    const artwork = document.createElement("img");

    artwork.className = "card-artwork";

    artwork.src =
        card.card_images?.[0]?.image_url_cropped ||
        card.card_images?.[0]?.image_url ||
        "";

    artwork.alt = card.name;

    artwork.loading = "lazy";

    artwork.addEventListener("click", () => {

        if (typeof UI.openCardImage === "function") {

            const fullImage =
                card.card_images?.[0]?.image_url ||
                artwork.src;

            UI.openCardImage(fullImage);

        }

    });

    container.appendChild(artwork);

    /* ----------------------------------------------------
       Header
    ---------------------------------------------------- */

    const header = document.createElement("div");

    header.className = "card-header";

    header.innerHTML = `

        <h2 class="card-name">
            ${card.name}
        </h2>

        <div class="card-subtitle">

            ${card.attribute || ""}
            ${card.attribute ? " • " : ""}
            ${card.race || ""}

        </div>

        <div class="card-type">

            ${card.type}

        </div>

    `;

    container.appendChild(header);

    /* ----------------------------------------------------
       Card Type Detection
    ---------------------------------------------------- */

    const type = (card.type || "").toLowerCase();

    const isMonster = type.includes("monster");

    const isSpell = type.includes("spell");

    const isTrap = type.includes("trap");

    const isPendulum = type.includes("pendulum");

    const isLink = type.includes("link");

    const isXyz = type.includes("xyz");

    /* ----------------------------------------------------
       Route To Renderer
    ---------------------------------------------------- */

    if (isMonster) {

        if (typeof UI.renderMonsterCard === "function") {

            container.appendChild(

                UI.renderMonsterCard(
                    card,
                    {
                        isPendulum,
                        isLink,
                        isXyz
                    }
                )

            );

        }

    }
    else if (isSpell || isTrap) {

        if (typeof UI.renderSpellTrapCard === "function") {

            container.appendChild(

                UI.renderSpellTrapCard(card)

            );

        }

    }

    /* ----------------------------------------------------
       Description Placeholder
    ---------------------------------------------------- */

    const description = document.createElement("div");

    description.className = "card-description";

    description.innerHTML = `

        <div class="section-title">

            Description

        </div>

        <div class="section-content">

            ${card.desc || "No description available."}

        </div>

    `;

    container.appendChild(description);

    /* ----------------------------------------------------
       Footer
    ---------------------------------------------------- */

    const footer = document.createElement("div");

    footer.className = "card-footer";

    footer.innerHTML = `

        <div>

            <strong>Card ID:</strong>
            ${card.id}

        </div>

    `;

    container.appendChild(

    UI.createCardFooter(card)

);
/* ========================================================
   Monster Card Renderer
   Part 2A.2
======================================================== */

UI.renderMonsterCard = function (card, flags = {}) {

    const section = document.createElement("div");

    section.className = "monster-section";

    /* ----------------------------------------------------
       Stats Container
    ---------------------------------------------------- */

    const stats = document.createElement("div");

    stats.className = "monster-stats";

    /* ----------------------------------------------------
       Level / Rank / Link
    ---------------------------------------------------- */

    if (flags.isLink) {

        stats.appendChild(
            this.createStatBox(
                "🔗",
                "Link Rating",
                card.linkval || "-"
            )
        );

    }
    else if (flags.isXyz) {

        stats.appendChild(
            this.createStatBox(
                "⭐",
                "Rank",
                card.level || "-"
            )
        );

    }
    else {

        stats.appendChild(
            this.createStatBox(
                "⭐",
                "Level",
                card.level || "-"
            )
        );

    }

    /* ----------------------------------------------------
       Pendulum Scale
    ---------------------------------------------------- */

    if (flags.isPendulum) {

        stats.appendChild(
            this.createStatBox(
                "⚖️",
                "Pendulum Scale",
                card.scale ?? "-"
            )
        );

    }

    /* ----------------------------------------------------
       Attack
    ---------------------------------------------------- */

    stats.appendChild(
        this.createStatBox(
            "⚔️",
            "ATK",
            card.atk ?? "?"
        )
    );

    /* ----------------------------------------------------
       Defence OR Link Arrows
    ---------------------------------------------------- */

    if (flags.isLink) {

        let arrows = "-";

        if (Array.isArray(card.linkmarkers) &&
            card.linkmarkers.length > 0) {

            arrows = card.linkmarkers.join(", ");

        }

        stats.appendChild(
            this.createStatBox(
                "🧭",
                "Link Arrows",
                arrows
            )
        );

    }
    else {

        stats.appendChild(
            this.createStatBox(
                "🛡️",
                "DEF",
                card.def ?? "?"
            )
        );

    }

    section.appendChild(stats);

    /* ----------------------------------------------------
       Archetype
    ---------------------------------------------------- */

    if (card.archetype) {

        const archetype = document.createElement("div");

        archetype.className = "card-section";

        archetype.innerHTML = `

            <div class="section-title">

                Archetype

            </div>

            <div class="section-content">

                ${card.archetype}

            </div>

        `;

        section.appendChild(archetype);

    }

    return section;

};

/* ========================================================
   Stat Box Helper
======================================================== */

UI.createStatBox = function (icon, label, value) {

    const box = document.createElement("div");

    box.className = "stat-box";

    box.innerHTML = `

        <div class="stat-icon">

            ${icon}

        </div>

        <div class="stat-label">

            ${label}

        </div>

        <div class="stat-value">

            ${value}

        </div>

    `;

    return box;

};
/* ========================================================
   Spell / Trap Card Renderer
   Part 2A.3
======================================================== */

UI.renderSpellTrapCard = function (card) {

    const section = document.createElement("div");

    section.className = "spell-trap-section";

    /* ----------------------------------------------------
       Card Information
    ---------------------------------------------------- */

    section.appendChild(

        this.createInfoSection(

            "Card Information",

            [

                {
                    label: "Type",
                    value: card.type || "-"
                },

                {
                    label: "Property",
                    value: card.race || "-"
                }

            ]

        )

    );

    /* ----------------------------------------------------
       Archetype
    ---------------------------------------------------- */

    if (card.archetype) {

        section.appendChild(

            this.createInfoSection(

                "Archetype",

                [

                    {
                        value: card.archetype
                    }

                ]

            )

        );

    }

    return section;

};

/* ========================================================
   Generic Information Section
======================================================== */

UI.createInfoSection = function (title, rows = []) {

    const section = document.createElement("div");

    section.className = "card-section";

    const heading = document.createElement("div");

    heading.className = "section-title";

    heading.textContent = title;

    section.appendChild(heading);

    rows.forEach(row => {

        const item = document.createElement("div");

        item.className = "section-row";

        if (row.label) {

            item.innerHTML = `

                <span class="section-label">
                    ${row.label}
                </span>

                <span class="section-value">
                    ${row.value}
                </span>

            `;

        }
        else {

            item.innerHTML = `

                <span class="section-value">
                    ${row.value}
                </span>

            `;

        }

        section.appendChild(item);

    });

    return section;

};

/* ========================================================
   Banlist Helper
======================================================== */

UI.getBanlistStatus = function (card) {

    if (!card.banlist_info) {

        return "Unlimited";

    }

    const info = card.banlist_info;

    if (info.ban_tcg)
        return info.ban_tcg;

    if (info.ban_ocg)
        return info.ban_ocg;

    if (info.ban_goat)
        return info.ban_goat;

    return "Unlimited";

};

/* ========================================================
   Card Footer Builder
======================================================== */

UI.createCardFooter = function (card) {

    const footer = document.createElement("div");

    footer.className = "card-footer";

    footer.appendChild(

        this.createInfoSection(

            "Card Details",

            [

                {
                    label: "Card ID",
                    value: card.id
                },

                {
                    label: "Banlist",
                    value: this.getBanlistStatus(card)
                }

            ]

        )

    );

    return footer;

};
