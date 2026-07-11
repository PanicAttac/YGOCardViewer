/*
==========================================================
 Project Millennium
 Database Manager v1.0
==========================================================
*/

const DatabaseManager = {

    config: null,
    cards: [],
    loaded: false,
    loadTime: 0,

    indexes: {
        cardById: new Map(),
        cardsByName: new Map(),
        cardsByType: new Map(),
        cardsByAttribute: new Map(),
        cardsByRace: new Map()
    },

    async load() {

        const startTime = performance.now();

        try {

            Logger.info(
                "PM-1201",
                "Database",
                "Loading configuration..."
            );

            const configResponse =
                await fetch("AppPaths.config");

            this.config =
                await configResponse.json();


            Logger.info(
                "PM-1202",
                "Database",
                "Loading card database..."
            );

            const databaseResponse =
                await fetch("AppPaths.database");

            const database =
                await databaseResponse.json();

            this.cards =
                database.data || [];


            Logger.info(
                "PM-1203",
                "Database",
                "Building indexes..."
            );

            this.buildIndexes();

            this.loaded = true;

            this.loadTime =
                (performance.now() - startTime).toFixed(2);


            Logger.success(
                "PM-1204",
                "Database",
                `${this.cards.length} cards loaded`
            );

        }

        catch(error){

            this.loaded = false;

            Logger.error(
                "PM-1205",
                "Database",
                error.message
            );

        }

    },

    buildIndexes() {

        for(const card of this.cards){

            // Card ID
            this.indexes.cardById.set(card.id, card);

            // Card Name
            this.indexes.cardsByName.set(
                card.name.toLowerCase(),
                card
            );

            // Card Type
            if(!this.indexes.cardsByType.has(card.type)){
                this.indexes.cardsByType.set(card.type, []);
            }

            this.indexes.cardsByType
                .get(card.type)
                .push(card);

            // Attribute
            if(card.attribute){

                if(!this.indexes.cardsByAttribute.has(card.attribute)){
                    this.indexes.cardsByAttribute.set(card.attribute, []);
                }

                this.indexes.cardsByAttribute
                    .get(card.attribute)
                    .push(card);

            }

            // Race
            if(card.race){

                if(!this.indexes.cardsByRace.has(card.race)){
                    this.indexes.cardsByRace.set(card.race, []);
                }

                this.indexes.cardsByRace
                    .get(card.race)
                    .push(card);

            }

        }

    },

    isReady(){

        return this.loaded;

    },

    getCards(){

        return this.cards;

    },

    getCardCount(){

        return this.cards.length;

    },

    getLoadTime(){

        return this.loadTime;

    }

};
