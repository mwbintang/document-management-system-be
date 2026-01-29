import "dotenv/config";

function required(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`❌ Missing environment variable: ${name}`);
    }
    return value;
}

export const env = {
    nodeEnv: process.env.NODE_ENV || "development",
    port: Number(process.env.PORT || 3000),
    db: {
        host: required("DB_HOST"),
        port: Number(process.env.DB_PORT || 3306),
        user: required("DB_USER"),
        password: process.env.DB_PASSWORD || "",
        name: required("DB_NAME"),
    },
};
