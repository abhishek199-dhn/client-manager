import bcrypt from "bcrypt";

export const hasOwnProperty = (data: Object, field: string): boolean => {
    return Object.prototype.hasOwnProperty.call(data, field);
};

export const isProductionEnv = () => {
    return process.env.NODE_CONFIG_ENV === "production";
};


export function generateHash(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}