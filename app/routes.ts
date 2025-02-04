import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [index("routes/CountriesPage.tsx"), route("countries/:alpha3Code", "routes/countries/CountryPage.tsx")] satisfies RouteConfig;
