export const login = async (data: any) => {
  return new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      if (data.email === "admin@nordtf.com" && data.senha === "123456") {
        resolve({
          accessToken: "simulated-jwt-token-123",
          user: {
            id: 1,
            email: "admin@nordtf.com",
            role: "ADMIN",
          },
        });
      } else {
        reject(new Error("E-mail ou senha inválidos."));
      }
    }, 1000);
  });
};

export const logout = async (token: string) => {
  return new Promise((resolve) => setTimeout(resolve, 500));
};