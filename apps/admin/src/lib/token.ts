const getToken = () => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken);
      return parsedToken;
    }
  };