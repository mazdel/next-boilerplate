const globalConfig = {
  secret: process.env.SECRET ?? "th1sIsAsecr3t",
  JWT: {
    alg: "HS512",
    exp: "2h",
    secret: process.env.SECRET ?? "th1sIsAsecr3t",
  },
  protectedPath: ["/admin", "/dashboard", "/api/v1"],
  unProtectedPath: ["/api/v1/session"],
  defaultRedirectPath: "/",
};

export default globalConfig;
