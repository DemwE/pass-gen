import { randomBytes } from 'crypto';

interface Args {
    special: boolean;
    length: number;
}

export function generator(args: Args): string {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const specialCharacters = '!@#$%^&*()_-+=<>?';

    let availableCharacters = characters;
    if (args.special) {
        availableCharacters += specialCharacters;
    }

    const length = args.length || 16; // Use 16 as the default value

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(randomBytes(1)[0] / 256 * availableCharacters.length);
        password += availableCharacters[randomIndex];
    }

    return password;
}