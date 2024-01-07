import React, { useState, useEffect, useRef } from "react";

export default function ThemeSwitch() {
	const [theme, setTheme] = useState(
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light",
	);
	const iconRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (theme === "dark") {
			document.body.classList.add("dark");
		} else {
			document.body.classList.remove("dark");
		}

		if (iconRef.current) {
			iconRef.current.classList.remove("animate-spin", "animate-once");
		}

		void iconRef.current?.offsetWidth;
		if (iconRef.current) {
			iconRef.current.classList.add("animate-spin", "animate-once");
		}
	}, [theme]);

	const toggleTheme = () => {
		if (theme === "light") {
			setTheme("dark");
		} else {
			setTheme("light");
		}
	};

	return (
		<div
			className="relative float-right bottom-2 cursor-pointer"
			onClick={toggleTheme}
		>
			{theme === "light" ? (
				<i
					ref={iconRef}
					className={`fa-regular fa-moon text-xl animate-spin animate-once animate-duration-200 animate-ease-in-out`}
				></i>
			) : (
				<i
					ref={iconRef}
					className={`fa-sharp fa-regular fa-sun-bright text-xl text-yellow-400 animate-spin animate-once animate-duration-200 animate-ease-in-out`}
				></i>
			)}
		</div>
	);
}
