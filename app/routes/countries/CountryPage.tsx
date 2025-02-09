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
    <div className={"px-[80px]"}>
      {country && (
        <>
          <div>
            <Link
              to={"/"}
              className={"dark:bg-dark-blue-elements my-[80px] flex h-[40px] w-[136px] items-center justify-center gap-x-[10px] rounded-[6px]"}
            >
              <LeftArrowIcon containerClassName={"h-[12px] w-[12px]"} iconClassName={"fill-[#111517] dark:fill-white"} />
              <span className={"font-light dark:text-white"}>Back</span>
            </Link>
            <div className={"flex items-center gap-x-[120px]"}>
              <img src={country.flags?.svg} alt={country.name} className={"h-[401px] w-[560px]"} />
              <div className={"w-full"}>
                <h1 className={"text-very-dark-blue-text text-[32px] font-extrabold dark:text-white"}>{country.name}</h1>
                <div className={"flex"}>
                  <div>
                    {propertiesPart1.map((property) => (
                      <p key={property.label}>
                        <span className={"text-very-dark-blue-text leading-[32px] font-semibold dark:text-white"}>{property.label}: </span>
                        <span className={"text-very-dark-blue-text font-light dark:text-white"}>{property.value}</span>
                      </p>
                    ))}
                  </div>
                  <div className={"ml-auto"}>
                    {propertiesPart2.map((property) => (
                      <p key={property.label}>
                        <span className={"text-very-dark-blue-text leading-[32px] font-semibold dark:text-white"}>{property.label}: </span>
                        <span className={"text-very-dark-blue-text font-light dark:text-white"}>{property.value}</span>
                      </p>
                    ))}
                  </div>
                </div>
                <div className={"pt-[68px]"}>
                  <p className={"flex flex-wrap items-center gap-x-[15px] gap-y-5"}>
                    <h2 className={"text-very-dark-blue-text leading-[24px] font-semibold dark:text-white"}>Border Countries: </h2>
                    {country.borders?.map((border) => (
                      <Link to={`/countries/${border}`} key={border}>
                        <div
                          className={
                            "shadow-border-countries dark:bg-dark-blue-elements grid h-[28px] w-[96px] place-items-center gap-x-[10px] rounded-[2px]"
                          }
                        >
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
