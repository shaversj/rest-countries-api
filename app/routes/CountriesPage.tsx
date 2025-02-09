import type { Route } from "./+types/CountriesPage";
import countryData from "~/data/countries.json";
import CountryCard from "~/components/CountryCard";
import { Form, Link, useSubmit } from "react-router";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Counties" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const region = url.searchParams.get("region");

  const countries = countryData.filter((country) => {
    if (!q && !region) return true;
    if (region && !q) return country.region === region;
    if (q && !region) return country.name.toLowerCase().includes(q.toLowerCase());
    if (q && region) return country.name.toLowerCase().includes(q.toLowerCase()) && country.region === region;
  });

  return { countries, q, region };
}

export default function CountriesPage({ loaderData }: Route.ComponentProps) {
  const { countries, q, region } = loaderData;
  const submit = useSubmit();

  const regions = Array.from(new Set(countryData.map((country) => country.region))).sort();
  return (
    <div>
      <section className={"mx-4 flex flex-col items-center py-6 lg:mx-[80px] lg:flex-row lg:py-[48px]"}>
        <div className={"shadow-search flex items-center gap-x-6 rounded-[5px] bg-white py-[14px] pl-8 lg:w-[480px] lg:py-[18px]"}>
          <img className={"size-[16px] lg:size-[18px]"} src={"/icon-glass.svg"} alt={"Search"} />
          <Form onChange={(event) => submit(event.currentTarget)}>
            <input
              aria-label={"Search countries"}
              defaultValue={q || ""}
              id="q"
              name="q"
              type="search"
              className={"outline-none"}
              placeholder="Search for a country..."
            />
          </Form>
        </div>
        {/*<form className={"flex items-center pt-[40px] lg:ml-auto lg:pt-0"} onChange={(event) => submit(event.currentTarget)}>*/}
        {/*  <select className={"text-search text-very-dark-blue-text appearance-none py-[18px]"} defaultValue={region || ""} id="region" name="region">*/}
        {/*    <option className={"text-very-dark-blue-text"}>Filter by Region</option>*/}
        {/*    {regions.map((regionName) => (*/}
        {/*      <option key={regionName}>{regionName}</option>*/}
        {/*    ))}*/}
        {/*  </select>*/}
        {/*  <img src={"/arrow-down.svg"} className={"size-[12px]"} alt={"Arrow Down"} />*/}
        {/*</form>*/}=
        <Menu>
          <MenuButton
            className={
              "ml-auto flex h-[56px] w-[200px] items-center gap-x-[47px] rounded-[5px] bg-white pl-6 text-[14px] leading-[20px] font-light text-[#111517]"
            }
          >
            Filter by Region
            <img src={"/arrow-down.svg"} className={"size-[12px]"} alt={"Arrow Down"} />
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom end"
            className="mt-2 w-[200px] origin-top-right rounded-[5px] border border-white/5 bg-white p-1 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            {regions.map((regionName) => (
              <MenuItem key={regionName}>
                <button
                  onClick={(event) => submit(event.currentTarget)}
                  className={
                    "flex w-full appearance-none py-[8px] pl-6 text-[14px] leading-[20px] font-light text-[#111517] data-[focus]:bg-gray-200"
                  }
                  id="region"
                  name="region"
                  value={regionName}
                >
                  {regionName}
                </button>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </section>

      <section className={"grid justify-center gap-y-[40px] md:grid-cols-3 lg:grid-cols-4 lg:gap-x-[75px] lg:gap-y-[75px] lg:px-[80px]"}>
        {countries.map((country) => (
          <Link to={`/countries/${country.alpha3Code}`} key={country.alpha3Code}>
            <CountryCard country={country} />
          </Link>
        ))}
      </section>
    </div>
  );
}
