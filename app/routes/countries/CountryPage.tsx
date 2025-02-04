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
    <div>
      {country && (
        <>
          <div>
            <div className={"flex items-center"}>
              <img src={"/arrow-left.svg"} alt={"Back"} />
              <span>Back</span>
            </div>
            <div>
              <img src={country.flags?.png || country.flags?.svg} alt={country.name} className={"h-[401px] w-[560px]"} />
              <div>
                <h1>{country.name}</h1>
                <div>
                  <div>
                    {propertiesPart1.map((property) => (
                      <p key={property.label}>
                        <span>{property.label}: </span>
                        <span>{property.value}</span>
                      </p>
                    ))}
                  </div>
                  <div>
                    {propertiesPart2.map((property) => (
                      <p key={property.label}>
                        <span>{property.label}: </span>
                        <span>{property.value}</span>
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <p>
                    <span>Border Countries: </span>
                    <span>{country.borders?.join(", ")}</span>
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
