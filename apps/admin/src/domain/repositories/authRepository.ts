import { BASE_URL } from "@/lib/constants";

type AuthCredentials = {
  email: string;
  password: string;
};

const fetchAuth = async (url: string, credentials: AuthCredentials): Promise<string> => {
  try {
      const response = await fetch(url, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
      });

      if (!response.ok) {
          throw new Error(`Failed to ${url.includes("register") ? "register" : "login"} user`);
      }

      const data = await response.json();
      console.log(data);
      return data.access_token;
  } catch (error) {
      console.error(`Error during ${url.includes("register") ? "registration" : "login"}:`, error);
      throw error;
  }
};

export const AuthRepository = {
  async register(credentials: AuthCredentials): Promise<string> {
    console.log(`The Base URL is ${BASE_URL}`)
      return fetchAuth(`${BASE_URL}/auth/register`, credentials);
  },

  async login(credentials: AuthCredentials): Promise<string> {
        console.log(`The Base URL is ${BASE_URL}`)
      return fetchAuth(`${BASE_URL}/auth/login`, credentials);
  }
};
