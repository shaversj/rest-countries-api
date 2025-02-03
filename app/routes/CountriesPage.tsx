import type { Route } from "./+types/CountriesPage";
import countryData from "~/data/countries.json";
import CountryCard from "~/components/CountryCard";
export function meta({}: Route.MetaArgs) {
  return [{ title: "Counties" }];
}

export default function CountriesPage() {
  return (
    <main className={"mx-auto w-[1440px] bg-[#fafafa]"}>
      <header>
        <h1>Where in the world?</h1>
        <h2>Dark Mode</h2>
      </header>

      <section>
        <input type="text" placeholder="Search for a country..." />
        <select>
          <option value="filter">Filter by Region</option>
        </select>
      </section>

      <div className={"grid grid-cols-4 gap-x-[75px] gap-y-[75px]"}>
        {countryData.map((country) => (
          <CountryCard country={country} key={country.alpha3Code} />
        ))}
      </div>
    </main>
  );
}
