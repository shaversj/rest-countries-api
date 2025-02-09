import type { Country } from "~/types/types";

type CountryCardProps = {
  country: Country;
};

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <div className={"shadow-custom dark:bg-dark-blue-elements h-84 w-66 rounded-lg bg-white"}>
      <img src={country.flags?.png} alt={country.name} className={"h-40 w-66 rounded-t-lg"} />
      <div className={"pt-6 pl-6"}>
        <h2 className={"text-title-lg"}>{country.name}</h2>

        <div className={"pt-4"}>
          <p>
            <span className={"text-label-lg"}>Population: </span> <span className={"text-body-lg"}>{country.population?.toLocaleString()}</span>
          </p>
          <p>
            <span className={"text-label-lg"}>Region: </span>
            <span className={"text-body-lg"}>{country.region}</span>
          </p>
          <p>
            <span className={"text-label-lg"}>Capital: </span>
            <span className={"text-body-lg"}>{country.capital}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
