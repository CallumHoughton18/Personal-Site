import "./src/scss/index.scss";
import "./src/scss/globals.scss";
import "./src/scss/code-theme.scss";

import { snowStorm, isInFestiveSeason } from "./src/easter_eggs/snowStorm";

export const onInitialClientRender = () => {
    const currentDate = new Date();
    if (isInFestiveSeason(currentDate)) {
        snowStorm()
    }
};