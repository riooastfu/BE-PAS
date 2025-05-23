export const passwordValidation = (string) => {
    const hasUpperCase = /[A-Z]/.test(string);
    const hasNumber = /\d/.test(string);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>_]/.test(string);
    const isLength = string.length >= 8;

    return hasUpperCase && hasNumber && hasSymbol && isLength;
}