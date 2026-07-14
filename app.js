/*
==========================================================
 Project Millennium
 Application Controller
==========================================================
*/

const AppPaths = {

    config: "app-config.json",

    database: "cardinfo.json",

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

        await DatabaseManager.load();

       Diagnostics.run();

if (!Diagnostics.allPassed()) {

    Logger.error(
        "PM-1004",
        "App",
        "Diagnostics failed."
    );

    return;

}

        if (!DatabaseManager.isReady()) {

            Logger.error(
                "PM-1002",
                "App",
                "Database failed to load."
            );

            return;

        }

        this.ready = true;

        Logger.success(
            "PM-1003",
            "App",
            "Application ready."
        );

    }

};


document.addEventListener(
    "DOMContentLoaded",
    () => App.start()
);
