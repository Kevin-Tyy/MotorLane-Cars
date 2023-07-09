import { CarCard, CustomFilter, Hero, SearchBar } from "@/components";
import { fetchCars } from "@/utils";
import Image from "next/image";

const Home = async ({ searchParams }) => {
	const allCars = await fetchCars({
		manufacture : searchParams.manufucturer || '',
		year : searchParams.year || 2023,
		fuel : searchParams.fuel || '',
		limit : searchParams.limit || 10,
		model : searchParams.model || ''
	}); 
	console.log(allCars);
	const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
	return (
		<main className="overflow-hidden">
			<Hero />
			<div className="mt-12 padding-x padding-y max-width" id="discover">
				<div className="home__text-container">
					<h1 className="text-4xl font-extrabold">Car catalogue</h1>
					<p>Explore the cars you might like</p>
				</div>
				<div className="home__filters">
					<SearchBar />
					<div className="home__filter-container">
						<CustomFilter title="fuel" />
						<CustomFilter title="year" />
					</div>
				</div>
				{!isDataEmpty ? (
					<section>
						<div className="home__cars-wrapper">
							{allCars?.map((car, index) => (
								<CarCard car={car} key={index} />
							))}
						</div>
					</section>
				) : (
					<div className="home__error-container">
						<h2 className="text-black text-xl font-bold">
							Oops! We have no cars at the moment
						</h2>
						<p>{allCars?.message}</p>
					</div>
				)}
			</div>
		</main>
	);
};
export default Home;
