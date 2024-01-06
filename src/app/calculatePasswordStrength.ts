import { passwordStrength } from "check-password-strength";
export const calculatePasswordStrength = (password: string) => {
	return passwordStrength(password);
};
