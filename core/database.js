/*
==========================================================
 Project Millennium
 Database Manager v1.0
==========================================================
 Handles:
 - Loading the offline database
 - Loading configuration
 - Loading database version
 - Reporting database status
==========================================================
*/

const DatabaseManager = {

    // Internal data
    config: null,
    version: null,
    cards: [],
    loaded: false,
    loadTime: 0,

    // Load everything
    async load() {

        const startTime = performance.now();

        try {

            // Load configuration
            const configResponse = await fetch("config.json");
            this.config = await configResponse.json();

            // Load database version
            const versionResponse = await fetch("database-version.json");
            this.version = await versionResponse.json();

            // Load card database
            const cardResponse = await fetch("cardinfo.json");
            const cardData = await cardResponse.json();

            // Store cards
            this.cards = cardData.data || [];

            this.loaded = true;

            this.loadTime =
                (performance.now() - startTime).toFixed(2);

            console.log("✅ Database Loaded");

        }
        catch (error) {

            console.error("❌ Database failed to load");

            console.error(error);

            this.loaded = false;

        }

    },

    isReady() {
        return this.loaded;
    },

    getCards() {
        return this.cards;
    },

    getCardCount() {
        return this.cards.length;
    },

    getVersion() {
        return this.version;
    },

    getConfig() {
        return this.config;
    },

    getLoadTime() {
        return this.loadTime;
    }

};
