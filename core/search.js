/*
==========================================================
 Project Millennium
 Search Engine v1.0
==========================================================
*/

const SearchEngine = {

    search(query) {

        const startTime = performance.now();

        // Clean the search text
        query = query.trim().toLowerCase();

        if (query.length === 0) {

            return {
                query,
                totalResults: 0,
                exactMatch: false,
                searchTime: 0,
                cards: []
            };

        }

        Logger.info(
            "PM-1301",
            "Search",
            `Searching for "${query}"`
        );

        const cards = DatabaseManager.getCards();

        const exactMatches = [];
        const partialMatches = [];

        for (const card of cards) {

            const name = card.name.toLowerCase();

            if (name === query) {

                exactMatches.push(card);

            } else if (name.includes(query)) {

                partialMatches.push(card);

            }

        }

        const results = [
            ...exactMatches,
            ...partialMatches
        ];

        const searchTime =
            (performance.now() - startTime).toFixed(2);

        Logger.success(
            "PM-1302",
            "Search",
            `${results.length} result(s) found in ${searchTime} ms`
        );

        return {

            query,

            totalResults: results.length,

            exactMatch: exactMatches.length > 0,

            searchTime,

            cards: results

        };

    },

    getCardById(id) {

        return DatabaseManager.indexes.cardById.get(id) || null;

    },

    getCardsByType(type) {

        return DatabaseManager.indexes.cardsByType.get(type) || [];

    },

    getCardsByAttribute(attribute) {

        return DatabaseManager.indexes.cardsByAttribute.get(attribute) || [];

    },

    getCardsByRace(race) {

        return DatabaseManager.indexes.cardsByRace.get(race) || [];

    }

};
