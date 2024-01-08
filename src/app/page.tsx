"use client";

import React, { useState, useEffect, useRef } from "react";
import ThemeSwitch from "@/components/themeSwitch";
import { toast } from "sonner";
import {
	generatePassword,
	getUrlParams,
	updateUrlParams,
} from "@/app/utils/passwordAndUrlParamHandler";
import { calculatePasswordStrength } from "@/app/utils/calculatePasswordStrength";

export default function Home() {
	const [length, setLength] = useState(16);
	const [minLength, maxLength] = [1, 128];
	const [password, setPassword] = useState("");
	const [includeSpecial, setIncludeSpecial] = useState(true);
	const [includeUppercase, setIncludeUppercase] = useState(true);
	const [includeLowercase, setIncludeLowercase] = useState(true);
	const [includeNumbers, setIncludeNumbers] = useState(true);
	const [passwordStrength, setPasswordStrength] = useState(0);
	const [isInputActive, setIsInputActive] = useState(false);
	const strengthRef = useRef<HTMLParagraphElement | null>(null);

	useEffect(() => {
		const { length, special, uppercase, lowercase, numbers } = getUrlParams();
		if (length) {
			setLength(length);
		}
		setIncludeSpecial(special);
		setIncludeUppercase(uppercase);
		setIncludeLowercase(lowercase);
		setIncludeNumbers(numbers);
	}, []);

	useEffect(() => {
		const newPassword = generatePassword(
			includeSpecial,
			length,
			includeUppercase,
			includeLowercase,
			includeNumbers,
		);
		setPassword(newPassword);
	}, [
		length,
		includeSpecial,
		includeUppercase,
		includeLowercase,
		includeNumbers,
	]);

	useEffect(() => {
		if (!isInputActive) {
			const newStrength = calculatePasswordStrength(password).score;
			setPasswordStrength(newStrength);
		}
	}, [password, isInputActive]);

	useEffect(() => {
		if (strengthRef.current) {
			strengthRef.current.classList.remove("animate-fade", "animate-once");
		}

		void strengthRef.current?.offsetWidth;
		if (strengthRef.current) {
			strengthRef.current.classList.add("animate-fade", "animate-once");
		}
	}, [passwordStrength]);

	const handleMouseDown = () => {
		setIsInputActive(true);
	};

	const handleMouseUp = () => {
		setIsInputActive(false);
	};

	const handleBlur = () => {
		setIsInputActive(false);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newLength = Number(event.target.value);
		setLength(newLength);
		updateUrlParams("length", newLength.toString());
	};

	const handleSpecialCheckboxChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const newIncludeSpecial = event.target.checked;
		if (
			!newIncludeSpecial &&
			!(includeUppercase || includeLowercase || includeNumbers)
		) {
			return;
		}
		setIncludeSpecial(newIncludeSpecial);
		updateUrlParams("special", newIncludeSpecial.toString());
	};

	const handleUppercaseCheckboxChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const newIncludeUppercase = event.target.checked;
		if (
			!newIncludeUppercase &&
			!(includeSpecial || includeLowercase || includeNumbers)
		) {
			return;
		}
		setIncludeUppercase(newIncludeUppercase);
		updateUrlParams("uppercase", newIncludeUppercase.toString());
	};

	const handleLowercaseCheckboxChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const newIncludeLowercase = event.target.checked;
		if (
			!newIncludeLowercase &&
			!(includeSpecial || includeUppercase || includeNumbers)
		) {
			return;
		}
		setIncludeLowercase(newIncludeLowercase);
		updateUrlParams("lowercase", newIncludeLowercase.toString());
	};

	const handleNumbersCheckboxChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const newIncludeNumbers = event.target.checked;
		if (
			!newIncludeNumbers &&
			!(includeSpecial || includeUppercase || includeLowercase)
		) {
			return;
		}
		setIncludeNumbers(newIncludeNumbers);
		updateUrlParams("numbers", newIncludeNumbers.toString());
	};

	const copyToClipboard = () => {
		navigator.clipboard
			.writeText(password)
			.then(() => toast.success("Password was copied to clipboard!"))
			.catch((error) => {
				console.error("Failed to copy text: ", error);
				toast.error("Failed to copy password to clipboard.");
			});
	};

	const generateNewPassword = () => {
		setPassword(
			generatePassword(
				includeSpecial,
				length,
				includeUppercase,
				includeLowercase,
				includeNumbers,
			),
		);
	};

	return (
		<main className="min-h-screen p-8 sm:p-12 md:p-18 lg:p-24 bg-gradient-to-tr from-sky-500 to-indigo-500">
			<div className="bg-zinc-50 rounded-xl p-10 space-y-3 text-gray-950 dark:bg-gray-800 dark:text-zinc-50 animate-fade-down animate-once animate-duration-[800ms] animate-ease-in-out">
				<ThemeSwitch />
				<h1 className="text-center text-3xl font-medium tracking-wide">
					Password Generator
				</h1>
				<div className="space-y-1">
					<div className="w-full rounded-xl p-3 border-2 border-black dark:border-zinc-50 flex leading-3 justify-between space-x-3 bg-zinc-200 dark:bg-gray-700">
						<p className="text-xl font-medium truncate w-full">{password}</p>
						<div className="flex space-x-2">
							<button onClick={copyToClipboard}>
								<i className="fa-regular fa-clipboard text-xl dark:text-zinc-300 transition hover:-translate-1 hover:scale-110"></i>
							</button>
							<button onClick={generateNewPassword}>
								<i className="fa-regular fa-arrows-rotate text-xl dark:text-zinc-300 transition hover:-translate-1 hover:scale-110"></i>
							</button>
						</div>
					</div>
					<div className="w-full bg-zinc-200 dark:bg-zinc-400 h-2 rounded">
						<div
							className={`h-full rounded transition-width duration-300 ease-in-out ${
								passwordStrength === 1
									? "bg-red-500 w-1/4"
									: passwordStrength === 2
									  ? "bg-yellow-500 w-1/2"
									  : passwordStrength === 3
										  ? "bg-green-500 w-3/4"
										  : passwordStrength === 4
											  ? "bg-green-700 w-full"
											  : "bg-zinc-200 dark:bg-zinc-400 w-0"
							}`}
						></div>
					</div>
					<p
						ref={strengthRef}
						className="float-right text-gray-700 dark:text-zinc-300"
					>
						{passwordStrength === 0
							? "Very weak"
							: passwordStrength === 1
							  ? "Weak"
							  : passwordStrength === 2
								  ? "Medium"
								  : passwordStrength === 3
									  ? "Strong"
									  : passwordStrength === 4
										  ? "Very strong"
										  : ""}
					</p>
				</div>
				<label className="block text-md font-medium text-gray-700 leading-5 dark:text-zinc-300">
					Password Length
				</label>
				<div className="flex space-x-2">
					<input
						type="number"
						className="block text-sm font-medium- w-20 border-2 border-black dark:border-zinc-50 rounded-xl h-10 text-center bg-zinc-200 dark:bg-gray-700"
						value={length}
						min={minLength}
						max={maxLength}
						onChange={handleChange}
						onMouseDown={handleMouseDown}
						onMouseUp={handleMouseUp}
						onBlur={handleBlur}
					/>
					<input
						type="range"
						className="block w-full"
						value={length}
						min={minLength}
						max={maxLength}
						onChange={handleChange}
						onMouseDown={handleMouseDown}
						onMouseUp={handleMouseUp}
						onBlur={handleBlur}
					/>
				</div>
				<div>
					<div>
						<div className="flex md:space-x-2 leading-5 max-md:flex-col">
							<label className="block text-md font-medium text-gray-700 leading-5 dark:text-zinc-300">
								Special Characters
							</label>
							<label className="relative inline-flex items-center mb-5 cursor-pointer">
								<input
									type="checkbox"
									value=""
									className="sr-only peer"
									checked={includeSpecial}
									onChange={handleSpecialCheckboxChange}
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
							</label>
							<label className="block text-md font-medium text-gray-700 leading-5 dark:text-zinc-300">
								Lowercase Characters
							</label>
							<label className="relative inline-flex items-center mb-5 cursor-pointer">
								<input
									type="checkbox"
									value=""
									className="sr-only peer"
									checked={includeLowercase}
									onChange={handleLowercaseCheckboxChange}
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
							</label>
							<label className="block text-md font-medium text-gray-700 leading-5 dark:text-zinc-300">
								Uppercase Characters
							</label>
							<label className="relative inline-flex items-center mb-5 cursor-pointer">
								<input
									type="checkbox"
									value=""
									className="sr-only peer"
									checked={includeUppercase}
									onChange={handleUppercaseCheckboxChange}
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
							</label>
							<label className="block text-md font-medium text-gray-700 leading-5 dark:text-zinc-300">
								Number Characters
							</label>
							<label className="relative inline-flex items-center mb-5 cursor-pointer">
								<input
									type="checkbox"
									value=""
									className="sr-only peer"
									checked={includeNumbers}
									onChange={handleNumbersCheckboxChange}
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
							</label>
						</div>
					</div>
					<div>
						<label className="float-right">
							<a
								href="https://github.com/DemwE/pass-gen"
								className="text-blue-500 dark:text-blue-300"
								target="_blank"
							>
								Project site
							</a>
						</label>
					</div>
				</div>
			</div>
		</main>
	);
}
