"use client";

export default function Custom404() {
	return (
		<main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238] space-y-3">
			<h1 className="text-9xl font-extrabold text-white tracking-widest">
				404
			</h1>
			<div className="bg-blue-400 px-2 text-sm rounded rotate-12 absolute">
				Page Not Found
			</div>
			<button
				type="button"
				className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
				onClick={() => window.history.back()}
			>
				<h1 className="text-lg">Go Back</h1>
			</button>
		</main>
	);
}
