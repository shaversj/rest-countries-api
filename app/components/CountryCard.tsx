import type { Country } from "~/types/types";

export default function CountryCard(country) {
  return (
    <div className={"shadow-custom h-[336px] w-[264px] rounded-lg bg-white"}>
      <img src={country.country.flags.png || country.country.flags.svg} alt={country.country.name} className={"h-[160px] w-[264px] rounded-t-lg"} />
      <div className={"pt-6 pl-6"}>
        <h2 className={"text-title-lg"}>{country.country.name}</h2>

        <div className={"pt-4"}>
          <p>
            <span className={"text-label-lg"}>Population: </span> <span className={"text-body-lg"}>{country.country.population}</span>
          </p>
          <p>
            <span className={"text-label-lg"}>Region: </span>
            <span className={"text-body-lg"}>{country.country.region}</span>
          </p>
          <p>
            <span className={"text-label-lg"}>Capital: </span>
            <span className={"text-body-lg"}>{country.country.capital}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
