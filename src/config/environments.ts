
const IS_PRODUCTION = process.env.NODE_ENV === "production";

const CONFIG = {
    PORT: 4444,
    IS_PRODUCTION,
    JWT_KEY_PHRASE: process.env.JWT_KEY_PHRASE || "",
    DOMAIN: IS_PRODUCTION ? "https://domain.example.com" : "http://localhost:4444",
    ORIGIN: IS_PRODUCTION ? "https://domain.example.com" : "http://localhost:3000"
}

export default CONFIG