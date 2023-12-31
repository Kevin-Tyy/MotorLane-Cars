"use client";

import { CarProps } from "@/types";
import { generateCarImageUrl } from "@/utils";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment } from "react";
import CustomButton from "./CustomButton";
interface CarDetailProps {
	isOpen: boolean;
	closeModal: () => void;
	car: CarProps;
}

const imageAngles = Array(3).fill(null);

const CarDetails = ({ isOpen, closeModal, car }: CarDetailProps) => {
	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<div className="fixed inset-0 bg-black bg-opacity-25 " />
					</Transition.Child>
					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95">
								<Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white dark:bg-neutral-800 p-6 text-left  shadow-xl transition-all flex flex-col gap-5">
									<button
										type="button"
										className="absolute top-2 right-0  z-10 w-fit p-2 bg-primary-blue-100 dark:bg-neutral-200 rounded-full"
										onClick={closeModal}>
										<Image
											src="/close.svg"
											alt="close"
											width={20}
											height={20}
										/>
									</button>
									<div className="flex-1 flex flex-col gap-3">
										<div className="relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg">
											<Image
												src={generateCarImageUrl(car)}
												alt="car"
												fill
												priority
												className="object-contain"
											/>
										</div>
										<div className="flex justify-center items-center gap-3">
											{imageAngles.map((_, index) => (
												<div
													key={index}
													className="flex-1 relative w-full h-24 bg-primary-blue-100 dark:bg-neutral-700 hover:bg-primary-blue/20 dark:hover:bg-neutral-600 rounded-lg">
													<Image
														src={generateCarImageUrl(
															car,
															index == 0 ? "29" : index == 1 ? "33" : "13"
														)}
														alt="car"
														fill
														priority
														className="object-contain"
													/>
												</div>
											))}
										</div>
									</div>
									<div className="flex-1 flex flex-col gap-2">
										<h2 className="font-semibold text-xl capitalize">
											{car?.make} {car?.model}
										</h2>
										<div className="mt-3 flex flex-wrap gap-4">
											{Object.entries(car).map(([key, value]) => (
												<div
													className="flex justify-between gap-5 w-full text-right"
													key={key}>
													<h4 className="text-grey capitalize dark:text-slate-200">
														{key.split("_").join(" ")}
													</h4>
													<p className="text-black-100 font-semibold dark:text-slate-400">
														{value}
													</p>
												</div>
											))}
										</div>
										<CustomButton
											title="Rent this car"
											containerStyles="w-full py-[16px] rounded-full bg-primary-blue mt-4"
											textStyles="text-white text-[14px] leading-[17px] font-bold"
										/>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default CarDetails;
