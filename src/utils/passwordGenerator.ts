import { randomBytes } from "crypto";
interface Args {
	includeSpecial: boolean;
	length: number;
	includeUppercase: boolean;
	includeLowercase: boolean;
	includeNumbers: boolean;
}

export function passwordGenerator(args: Args): string {
	const lowercaseCharacters = "abcdefghijklmnopqrstuvwxyz";
	const uppercaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const numberCharacters = "0123456789";
	const specialCharacters = "!@#$%^&*()_-+=<>?";

	let availableCharacters: string = "";
	if (args.includeLowercase) {
		availableCharacters += lowercaseCharacters;
	}
	if (args.includeUppercase) {
		availableCharacters += uppercaseCharacters;
	}
	if (args.includeNumbers) {
		availableCharacters += numberCharacters;
	}
	if (args.includeSpecial) {
		availableCharacters += specialCharacters;
	}

	const length = args.length || 16; // Use 16 as the default value

	let password = "";
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(
			(randomBytes(1)[0] / 256) * availableCharacters.length,
		);
		password += availableCharacters[randomIndex];
	}

	return password;
}
