import "./src/scss/index.scss";
import "./src/scss/globals.scss";

import snowStorm from "./src/libs/snowStorm.js";

export const onInitialClientRender = () => {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const beginningFestiveSeason = new Date(currentYear, 11, 19)
    const endFestiveSeason = new Date(currentYear + 1, 0, 6)

    currentDate.setDate(currentDate.getDate() + 1)
    const inRange = currentDate >= beginningFestiveSeason && currentDate < endFestiveSeason;
    if (inRange) {
        snowStorm()
    }
};