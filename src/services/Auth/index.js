import axios from "../axiosConfig.js";

// Return a boolean parameter if user is authenticated
async function isUserAuthenticated() {
  let statusUserAthentication = false;

  try {
    const request = await axios.get("/users/isAuthenticated", {
      withCredentials: true,
    });


    console.log("request=>>> ",request)

    const { message, error } = request.data;
    console.log("dados do Backend:", request.data);

    statusUserAthentication = message ? message : error;

    console.log("authenticated", message, error);
  } catch (error) {
    console.log('HTTP_REQUEST_ERROR - "/users/isAuthenticated": ', error);
  }

  return statusUserAthentication;
}

// authenticate user if his credentials is correct
async function auth(username, password) {
  return await axios.post("/users/login", { email: username, password });
}

async function logout() {
  return await axios.get("/users/logout");
}



async function AddCountry(country,sigla,region){
  let statusAddCountry = false;
  console.log("----tete", country, sigla, region);

  try {
    const request = await axios.post("/country/create", {
      name: country,
      code :sigla,
      region
    });
    const { message, success } = request.data;
    console.log("dados do Backend:", request.data);

    statusAddCountry = request.data;

    console.log("addCountry", message, success);
  } catch (error) {
    console.log('HTTP_REQUEST_ERROR - "/": ', error);
  }

  return statusAddCountry;

}



export { isUserAuthenticated, auth, logout, AddCountry};
