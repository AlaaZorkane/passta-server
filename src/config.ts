const APP_CONFIG: Passta.Config = {
  PORT: 4000,
  // process.env.PASETO_SECRET
  PASETO_SECRET: "very_secret_passta", // KEEP THIS VERY SECRET!! Maybe load it from an env
  PASETO_EXPIRE: "1m", // https://github.com/zeit/ms
};

export default APP_CONFIG;
