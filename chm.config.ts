import { name } from "./package.json";
const federationExposes = {
    "./App": "./src/App.tsx",
};
let backend = process.env.backend || "http://localhost:8080/static/plugins";
backend = backend.endsWith("/") ? backend : `${backend}/`;
backend = backend.endsWith(name) ? backend : `${backend}${name}/`;

export { federationExposes, backend };
