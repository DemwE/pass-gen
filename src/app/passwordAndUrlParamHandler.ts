import { passwordGenerator } from "@/app/passwordGenerator";

export const generatePassword = (includeSpecial: boolean, length: number) => {
	return passwordGenerator({ special: includeSpecial, length: length });
};

export const updateUrlParams = (key: string, value: string) => {
	const params = new URLSearchParams(window.location.search);
	params.set(key, value);
	window.history.pushState({}, "", "?" + params.toString());
};

export const updateFromUrlParams = (
	setLength: Function,
	setIncludeSpecial: Function,
	length: number,
	includeSpecial: boolean,
) => {
	const params = new URLSearchParams(window.location.search);
	const urlLength = params.get("length");
	const urlSpecial = params.get("special");
	if (urlLength) {
		setLength(Number(urlLength));
	}
	if (urlSpecial) {
		setIncludeSpecial(urlSpecial === "true");
	}
	params.set("length", length.toString());
	params.set("special", includeSpecial.toString());
};
