import zxcvbn from "zxcvbn";

export const passwordStrengthIndicator = (password: string) => {
	return zxcvbn(password);
};
