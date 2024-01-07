import zxcvbn from "zxcvbn";

export const calculatePasswordStrength = (password: string) => {
	return zxcvbn(password);
};
