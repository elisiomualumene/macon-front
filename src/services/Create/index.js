import axios from "../axiosConfig.js";

// Return a boolean parameter if user is authenticated


async function addTravel(originProvince1, destinyProvince1, transportId1, departurDate1,returnDate1,price1 ){
  let statusAddTravel = false;
  console.log("----tete", originProvince1, destinyProvince1, transportId1, departurDate1,returnDate1,price1 );
  try {
    // console.log("----tete------------", originProvince, destinyProvince, transportId, departurDate,returnDate,price );
    const request = await axios.post("/travels/create", {
      originProvince:originProvince1,
      destinyProvince:destinyProvince1,
      transportId:transportId1,
      departureDate: departurDate1,
      returnDate:returnDate1,
      price:price1,
    });

    const { message, error } = request.data;
    console.log("dados do Backend:", request.data);
    statusAddTravel =  request.data;
    console.log("addCountry", message, error);
  } catch (error) {
    console.log('HTTP_REQUEST_ERROR - "/": ', error);
  }
  return statusAddTravel;
}


async function ListCountry(){
  let statusListCountry = "Evandro";
  try {
    const request = await axios.get("/location/country/all/", {
    });
    const { message, error } = request;
    console.log("----Lista dos Paises:", request);
    statusListCountry = request;
    console.log("addCountry", message, error);
    console.log("ListCountry", statusListCountry);
  } catch (error) {
    console.log('HTTP_REQUEST_ERROR - "/": ', error);
  }
  return statusListCountry;

}


async function addTransport( transportName, transportNumber, typeTransport, totalPlace){
  let statusAddTranport = false;
  console.log("----tete",transportName, transportNumber, typeTransport, totalPlace );
  try {
    const request = await axios.post("/transport/create", {
      transportName,
      transportNumber,
      typeTransport,
      totalPlace

    });
    const { message, error } = request.data;
    console.log("dados do Backend:", request.data);

    statusAddTranport =  request.data;
    console.log("addCountry", message, error);
  } catch (error) {
    console.log('HTTP_REQUEST_ERROR - "/": ', error);
  }

  return statusAddTranport;

}


async function addProvince ( countryID, provinceName, codeProvince, region){
  let statusAddProvince = false;
  console.log("----tete",countryID, provinceName, codeProvince, region );

  try {
    const request = await axios.post("province/create", {
      name:provinceName,
      code: codeProvince,
      country: countryID,
      region
    });
    const { message, error } = request.data;
    console.log("dados do Backend:", request.data);
    statusAddProvince =  request.data;
    console.log("addProvince", message, error);
  } catch (error) {
    console.log('HTTP_REQUEST_ERROR - "/": ', error);
  }

  return statusAddProvince;

}

async function addTerminal ( name, description, location, contacts, provinceID){
  let statusAddTerminal = false;
  console.log("----tete",name, description, location, contacts, provinceID );

  try {
    const request = await axios.post("spot/create", {
      name:name,
      description: description,
      location: location,
      contacts:contacts,
      provinceID:provinceID,
    });
    const { message, error } = request.data;
    console.log("dados do Backend:", request.data);
    statusAddTerminal =  request.data;
    console.log("addProvince", message, error);
  } catch (error) {
    console.log('HTTP_REQUEST_ERROR - "/": ', error);
  }


  return statusAddTerminal;

}
export { ListCountry, addTravel, addTransport, addProvince, addTerminal };