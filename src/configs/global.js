const defaultSecret = "th1sIsAsecr3t";
const globalConfig = {
  secret: process.env.SECRET ?? defaultSecret,
  encryption: {
    secret: process.env.SECRET ?? defaultSecret,
    saltLength: 5,
  },
  JWT: {
    alg: "HS512",
    exp: "6h",
    secret: process.env.SECRET ?? defaultSecret,
  },
  protectedPath: ["/admin", "/dashboard", "/api/v1"],
  unProtectedPath: ["/api/v1/session"],
  defaultRedirectPath: "/",
  CONSTANT: {
    THEME: { DARK: "dark", LIGHT: "light" },
    ACCESS_TOKEN: "access_token",
    SIDEMENU: { OPEN: "open", CLOSE: "close" },
  },
};

export default globalConfig;
