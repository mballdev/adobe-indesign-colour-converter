import React from "react";

import { PanelController } from "./controllers/PanelController";
import MainPanel from "./panels/main/MainPanel";

import { entrypoints } from "uxp";

const mainController = new PanelController(() => <MainPanel />, {
    id: "main"
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
        main: mainController
    }
});
