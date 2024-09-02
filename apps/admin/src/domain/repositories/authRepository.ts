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
      return data.access_token;
  } catch (error) {
      console.error(`Error during ${url.includes("register") ? "registration" : "login"}:`, error);
      throw error;
  }
};

export const AuthRepository = {
  async register(credentials: AuthCredentials): Promise<string> {
      return fetchAuth("http://localhost:1337/v1/auth/register", credentials);
  },

  async login(credentials: AuthCredentials): Promise<string> {
      return fetchAuth("http://localhost:1337/v1/auth/login", credentials);
  }
};
