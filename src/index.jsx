import React from "react";

import { PanelController } from "./controllers/PanelController.jsx";
import { Home } from "./panels/home/Home.jsx";

import { entrypoints } from "uxp";

const homeController = new PanelController(() => <Home />, {
    id: "home"
});


entrypoints.setup({
    plugin: {
        create(plugin) {
            /* optional */ console.log("created", plugin);
        },
        destroy() {
            /* optional */ console.log("destroyed");
        }
    },
    panels: {
        home: homeController
    }
});
