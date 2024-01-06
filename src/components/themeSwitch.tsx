import React, { useState, useEffect } from "react";

export default function ThemeSwitch() {
	const [theme, setTheme] = useState("light");

	useEffect(() => {
		if (theme === "dark") {
			document.body.classList.add("dark");
		} else {
			document.body.classList.remove("dark");
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
		<div className="relative float-right bottom-2" onClick={toggleTheme}>
			{theme === "light" ? (
				<i className="fa-regular fa-moon text-xl"></i>
			) : (
				<i className="fa-sharp fa-regular fa-sun-bright text-xl text-yellow-400"></i>
			)}
		</div>
	);
}
