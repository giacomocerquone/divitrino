const devVars = {
  baseApi: "http://0.0.0.0:3000",
};

const prodVars = {
  baseApi: "http://api.giacomocerquone.com:3000",
};

export default process.env.APP_ENV === "prod" ? prodVars : devVars;
