import type { Route } from "./+types/CountriesPage";
import countryData from "~/data/countries.json";
import CountryCard from "~/components/CountryCard";
export function meta({}: Route.MetaArgs) {
  return [{ title: "Counties" }];
}

export default function CountriesPage() {
  return (
    <div>
      <section className={"mx-[80px] flex py-[48px]"}>
        <div className={"shadow-search flex w-[480px] gap-x-6 rounded-[5px] py-6 pl-8"}>
          <img src={"/icon-glass.svg"} alt={"Search"} />
          <input type="text" className={"outline-none"} placeholder="Search for a country..." />
        </div>
        <form className={"ml-auto"}>
          <select className={"text-search border py-[18px]"}>
            <option>Filter by Region</option>
            {countryData.map((country) => (
              <option key={country.alpha3Code}>{country.region}</option>
            ))}
          </select>
        </form>
      </section>

      <div className={"grid grid-cols-4 gap-x-[75px] gap-y-[75px] px-[80px]"}>
        {countryData.map((country) => (
          <CountryCard country={country} key={country.alpha3Code} />
        ))}
      </div>
    </div>
  );
}
