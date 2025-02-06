import { type RouteConfig, route, index, layout } from "@react-router/dev/routes";

export default [
  route("/", "routes/Layout.tsx", [
    //prettier-ignore
    index("routes/CountriesPage.tsx"),
    route("countries/:alpha3Code", "routes/countries/CountryPage.tsx"),
  ]),
] satisfies RouteConfig;
