import type { Route } from "./+types/CountriesPage";
import countryData from "~/data/countries.json";
import CountryCard from "~/components/CountryCard";
import { Form, Link, useSubmit } from "react-router";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import GlassIcon from "~/components/GlassIcon";

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
    if (q && region)
      return country.name.toLowerCase().includes(q.toLowerCase()) && country.region === region;
  });

  return { countries, q, region };
}

export default function CountriesPage({ loaderData }: Route.ComponentProps) {
  const { countries, q, region } = loaderData;
  const submit = useSubmit();

  const regions = Array.from(new Set(countryData.map((country) => country.region))).sort();
  return (
    <div>
      <section className={"mx-4 flex flex-col py-6 lg:mx-20 lg:flex-row lg:items-center lg:py-12"}>
        <div
          className={
            "shadow-search dark:bg-dark-blue-elements rounded-1.25 flex items-center gap-x-6 bg-white py-3.5 pl-8 lg:w-120 lg:py-4.5"
          }
        >
          <GlassIcon
            containerClassName={"size-4 lg:size-5"}
            iconClassName={"fill-[#848484] dark:fill-white"}
          />
          <Form onChange={(event) => submit(event.currentTarget)}>
            <input
              aria-label={"Search countries"}
              defaultValue={q || ""}
              id="q"
              name="q"
              type="search"
              className={
                "text-very-dark-blue-text outline-none dark:text-white dark:placeholder:text-white"
              }
              placeholder="Search for a country..."
            />
          </Form>
        </div>
        <Menu>
          <MenuButton
            className={
              "dark:bg-dark-blue-elements rounded-1.25 text-3.5 mt-10 flex h-14 w-50 items-center gap-x-11.75 bg-white pl-6 leading-5 font-light text-[#111517] lg:mt-0 lg:ml-auto dark:text-white"
            }
          >
            Filter by Region
            <img src={"/arrow-down.svg"} className={"size-3"} alt={"Arrow Down"} />
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom end"
            className="dark:bg-dark-blue-elements rounded-1.25 mt-2 w-50 origin-top-right border border-white/5 bg-white p-1 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            {regions.map((regionName) => (
              <MenuItem key={regionName}>
                <button
                  onClick={() => submit({ region: regionName })}
                  className={
                    "dark:data-[focus]:bg-white-200 text-3.5 flex w-full appearance-none py-2 pl-6 leading-5 font-light text-[#111517] data-[focus]:bg-gray-500 dark:text-white"
                  }
                  id="region"
                  name="region"
                  type={"submit"}
                >
                  {regionName}
                </button>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </section>

      <section
        className={
          "grid justify-center gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-18.75 lg:gap-y-18.75 lg:px-20"
        }
      >
        {countries.map((country) => (
          <Link to={`/countries/${country.alpha3Code}`} key={country.alpha3Code}>
            <CountryCard country={country} />
          </Link>
        ))}
      </section>
    </div>
  );
}
