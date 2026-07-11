/*
==========================================================
 Project Millennium
 Logger v1.0
==========================================================
*/

const Logger = {

    logs: [],
    maxEntries: 500,

    log(level, eventId, component, message) {

        const entry = {
            timestamp: new Date().toISOString(),
            level,
            eventId,
            component,
            message
        };

        this.logs.push(entry);

        // Keep only the newest entries
        if (this.logs.length > this.maxEntries) {
            this.logs.shift();
        }

        const output =
            `[${entry.timestamp}] ${entry.level} ${entry.eventId} (${entry.component}) ${entry.message}`;

        switch (level) {

            case "ERROR":
                console.error(output);
                break;

            case "WARNING":
                console.warn(output);
                break;

            default:
                console.log(output);
                break;
        }
    },

    info(eventId, component, message) {
        this.log("INFO", eventId, component, message);
    },

    success(eventId, component, message) {
        this.log("SUCCESS", eventId, component, message);
    },

    warning(eventId, component, message) {
        this.log("WARNING", eventId, component, message);
    },

    error(eventId, component, message) {
        this.log("ERROR", eventId, component, message);
    },

    debug(eventId, component, message) {
        this.log("DEBUG", eventId, component, message);
    },

    getLogs() {
        return [...this.logs];
    },

    clear() {
        this.logs = [];
    }

};
