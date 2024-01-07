import { passwordGenerator } from "@/app/utils/passwordGenerator";

export const generatePassword = (
	includeSpecial: boolean,
	length: number,
	includeUppercase: boolean,
	includeLowercase: boolean,
	includeNumbers: boolean,
) => {
	return passwordGenerator({
		includeSpecial: includeSpecial,
		length: length,
		includeUppercase: includeUppercase,
		includeLowercase: includeLowercase,
		includeNumbers: includeNumbers,
	});
};

export const updateUrlParams = (key: string, value: string) => {
	const params = new URLSearchParams(window.location.search);
	params.set(key, value);
	window.history.pushState({}, "", "?" + params.toString());
};

export const getUrlParams = () => {
	const params = new URLSearchParams(window.location.search);
	const urlLength = params.get("length");
	const urlSpecial = params.get("special");
	const urlUppercase = params.get("uppercase");
	const urlLowercase = params.get("lowercase");
	const urlNumbers = params.get("numbers");

	return {
		length: urlLength ? Number(urlLength) : 16,
		special: urlSpecial !== null ? urlSpecial === "true" : true,
		uppercase: urlUppercase !== null ? urlUppercase === "true" : true,
		lowercase: urlLowercase !== null ? urlLowercase === "true" : true,
		numbers: urlNumbers !== null ? urlNumbers === "true" : true,
	};
};
