/*
==========================================================
 Project Millennium
 Application Controller
==========================================================
*/

const AppPaths = {

    // Configuration
    config: "app-config.json",

    // Database
    database: "cardinfo.json",

    // Folders
    core: "core/",
    data: "data/",
    assets: "assets/",
    icons: "assets/icons/",
    images: "assets/images/"

};


const App = {

    ready: false,

    async start() {

        Logger.info(
            "PM-1001",
            "App",
            "Project Millennium starting..."
        );

        // Load the offline database
        await DatabaseManager.load();

        // Stop if the database failed to load
        if (!DatabaseManager.isReady()) {

            Logger.error(
                "PM-1002",
                "App",
                "Database failed to load."
            );

            return;

        }

        // Run startup diagnostics
        Diagnostics.run();

        // Stop if diagnostics failed
        if (!Diagnostics.allPassed()) {

            Logger.error(
                "PM-1004",
                "App",
                "Diagnostics failed."
            );

            return;

        }

        // Application is ready
        this.ready = true;

        Logger.success(
            "PM-1003",
            "App",
            "Application ready."
        );

    }

};


// Start Project Millennium
document.addEventListener(
    "DOMContentLoaded",
    () => App.start()
);
