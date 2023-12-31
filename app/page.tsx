"use client";

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const Home = () => {
	const [allCars, setAllCars] = useState([]);
	const [loading, setLoading] = useState(false);
	const [manufacturer, setManufacturer] = useState("");
	const [model, setModel] = useState("");
	const [fuel, setFuel] = useState("");
	const [year, setYear] = useState(2023);
	const [limit, setLimit] = useState(10);
	const carSectionRef = useRef(null);
	const getCars = async () => {
		setLoading(true);
		try {
			const result = await fetchCars({
				manufacturer: manufacturer || "",
				year: year || 2023,
				fuel: fuel || "",
				limit: limit || 10,
				model: model || "",
			});
			setAllCars(result);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		getCars();
	}, [fuel, year, limit, model, manufacturer]);

	const scrollToSection = () => {
		if (carSectionRef.current) {
			(carSectionRef.current as any).scrollIntoView({ behavior: "smooth" });
		}
	};
	// const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
	return (
		<main className="overflow-hidden">
			<Hero scrollToSection={scrollToSection} />
			<div className="mt-12 padding-x padding-y max-width" id="discover">
				<div className=" flex flex-col items-start justify-start gap-y-2.5 text-black-100">
					<h1 className="text-4xl font-extrabold dark:text-slate-200">
						Car catalogue
					</h1>
					<p className="dark:text-slate-400">Explore the cars you might like</p>
				</div>
				<div className="mt-12 w-full flex-between items-center flex-wrap gap-5">
					<SearchBar setModel={setModel} setManufacturer={setManufacturer} />
					<div className="flex justify-start flex-wrap items-center gap-2">
						<CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
						<CustomFilter
							title="year"
							options={yearsOfProduction}
							setFilter={setYear}
						/>
					</div>
				</div>
				<section id="carsection" ref={carSectionRef}>
					{loading ? (
						<div className="mt-16 w-full flex-center flex-col gap-7">
							<Image
								src="/loader.svg"
								alt="loader"
								width={50}
								height={50}
								className="object-contain"
							/>
							<p>Loading...</p>
						</div>
					) : (
						<div>
							{allCars.length > 0 ? (
								<section>
									<div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-14">
										{allCars?.map((car, index) => (
											<CarCard car={car} key={index} />
										))}
									</div>
									{loading && (
										<div className="mt-16 w-full flex-center flex-col gap-7">
											<Image
												src="/loader.svg"
												alt="loader"
												width={50}
												height={50}
												className="object-contain"
											/>
											<p>Loading...</p>
										</div>
									)}
									<ShowMore
										pageNumber={(limit || 10) / 10}
										isNext={(limit || 10) > allCars?.length}
										setLimit={setLimit}
									/>
								</section>
							) : (
								<div className="mt-16 flex justify-center items-center flex-col gap-2">
									<h2 className="text-black dark:text-slate-200 text-xl font-bold">
										😢 Oops! No results
									</h2>
								</div>
							)}
						</div>
					)}
				</section>
			</div>
		</main>
	);
};
export default Home;
