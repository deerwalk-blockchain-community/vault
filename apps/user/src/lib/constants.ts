export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.API_URL
    : "http://localhost:1337/v1";