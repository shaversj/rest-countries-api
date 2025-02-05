import type { Route } from "../countries/+types/CountryPage";
import countryData from "~/data/countries.json";
import type { Country } from "~/types/types";

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
            <div className={"flex items-center"}>
              <img src={"/arrow-left.svg"} alt={"Back"} />
              <span>Back</span>
            </div>
            <div className={"flex items-center gap-x-[120px]"}>
              <img src={country.flags?.png || country.flags?.svg} alt={country.name} className={"h-[401px] w-[560px]"} />
              <div>
                <h1 className={"text-very-dark-blue-text text-[32px] font-extrabold"}>{country.name}</h1>
                <div className={"flex"}>
                  <div>
                    {propertiesPart1.map((property) => (
                      <p key={property.label}>
                        <span className={"text-very-dark-blue-text leading-[32px] font-semibold"}>{property.label}: </span>
                        <span className={"text-very-dark-blue-text font-light"}>{property.value}</span>
                      </p>
                    ))}
                  </div>
                  <div className={"ml-auto"}>
                    {propertiesPart2.map((property) => (
                      <p key={property.label}>
                        <span className={"text-very-dark-blue-text leading-[32px] font-semibold"}>{property.label}: </span>
                        <span className={"text-very-dark-blue-text font-light"}>{property.value}</span>
                      </p>
                    ))}
                  </div>
                </div>
                <div className={"pt-[68px]"}>
                  <p className={"flex items-center gap-x-[15px]"}>
                    <h2 className={"text-very-dark-blue-text leading-[24px] font-semibold"}>Border Countries: </h2>
                    {country.borders?.map((border) => (
                      <div className={"shadow-border-countries grid h-[28px] w-[96px] place-items-center gap-x-[10px] rounded-[2px]"}>
                        <span className={"text-very-dark-blue-text text-[14px] font-light"}>{border}</span>
                      </div>
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
