import type { Route } from "../countries/+types/CountryPage";
import countryData from "~/data/countries.json";
import type { Country } from "~/types/types";
import { Link } from "react-router";
import LeftArrowIcon from "~/components/LeftArrowIcon";

export async function loader({ params }: Route.LoaderArgs) {
  return countryData.find((country) => country.alpha3Code === params.alpha3Code);
}

export default function CountryPage({ loaderData }: Route.ComponentProps) {
  const country: Country | undefined = loaderData;
  const propertiesPart1 = country
    ? [
        { label: "Native Name", value: country.nativeName },
        { label: "Population", value: country.population },
        { label: "Region", value: country.region },
        { label: "Sub Region", value: country.subregion },
        { label: "Capital", value: country.capital },
      ]
    : [];

  const propertiesPart2 = country
    ? [
        { label: "Top Level Domain", value: country.topLevelDomain && country.topLevelDomain[0] },
        { label: "Currencies", value: country.currencies?.map((currency) => currency.name).join(", ") },
        { label: "Languages", value: country.languages?.map((language) => language.name).join(", ") },
      ]
    : [];

  return (
    <div className={"px-20"}>
      {country && (
        <>
          <div>
            <Link to={"/"} className={"dark:bg-dark-blue-elements rounded-1.5 my-20 flex h-10 w-34 items-center justify-center gap-x-2.5"}>
              <LeftArrowIcon containerClassName={"size-3"} iconClassName={"fill-[#111517] dark:fill-white"} />
              <span className={"font-light dark:text-white"}>Back</span>
            </Link>
            <div className={"flex items-center gap-x-30"}>
              <img src={country.flags?.svg} alt={country.name} className={"h-100.25 w-140"} />
              <div className={"w-full"}>
                <h1 className={"text-very-dark-blue-text text-8 font-extrabold dark:text-white"}>{country.name}</h1>
                <div className={"flex"}>
                  <div>
                    {propertiesPart1.map((property) => (
                      <p key={property.label}>
                        <span className={"text-very-dark-blue-text leading-8 font-semibold dark:text-white"}>{property.label}: </span>
                        <span className={"text-very-dark-blue-text font-light dark:text-white"}>{property.value}</span>
                      </p>
                    ))}
                  </div>
                  <div className={"ml-auto"}>
                    {propertiesPart2.map((property) => (
                      <p key={property.label}>
                        <span className={"text-very-dark-blue-text leading-8 font-semibold dark:text-white"}>{property.label}: </span>
                        <span className={"text-very-dark-blue-text font-light dark:text-white"}>{property.value}</span>
                      </p>
                    ))}
                  </div>
                </div>
                <div className={"pt-17"}>
                  <p className={"flex flex-wrap items-center gap-x-3.75 gap-y-5"}>
                    <h2 className={"text-very-dark-blue-text leading-[24px] font-semibold dark:text-white"}>Border Countries: </h2>
                    {country.borders?.map((border) => (
                      <Link to={`/countries/${border}`} key={border}>
                        <div className={"shadow-border-countries dark:bg-dark-blue-elements rounded-.5 grid h-7 w-24 place-items-center gap-x-2.5"}>
                          <span className={"text-very-dark-blue-text text-[14px] font-light dark:text-white"}>{border}</span>
                        </div>
                      </Link>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
