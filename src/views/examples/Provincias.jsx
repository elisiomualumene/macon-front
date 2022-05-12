import { useState, useEffect } from "react";
// import DataTable from "react-data-table-component";

import axios from "../../services/axiosConfig";

import DataTable from "react-data-table-component";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import Header from "components/Headers/Header";

// Modal
import { ProvinceModal } from '../../components/Modal/ProvinceModal';

{
  /*const MapWrapper = () => {
  const mapRef = React.useRef(null);
  React.useEffect(() => {
    let google = window.google;
    let map = mapRef.current;
    let lat = "40.748817";
    let lng = "-73.985428";
    const myLatlng = new google.maps.LatLng(lat, lng);
    const mapOptions = {
      zoom: 12,
      center: myLatlng,
      scrollwheel: false,
      zoomControl: true,
      styles: [
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [{ color: "#444444" }],
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [{ color: "#f2f2f2" }],
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [{ saturation: -100 }, { lightness: 45 }],
        },
        {
          featureType: "road.highway",
          elementType: "all",
          stylers: [{ visibility: "simplified" }],
        },
        {
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [{ color: "#5e72e4" }, { visibility: "on" }],
        },
      ],
    };

    map = new google.maps.Map(map, mapOptions);

    const marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      animation: google.maps.Animation.DROP,
      title: "Light Bootstrap Dashboard PRO React!",
    });

    const contentString =
      '<div class="info-window-content"><h2>Light Bootstrap Dashboard PRO React</h2>' +
      "<p>A premium Admin for React-Bootstrap, Bootstrap, React, and React Hooks.</p></div>";

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    google.maps.event.addListener(marker, "click", function () {
      infowindow.open(map, marker);
    });
  }, []);
  return (
    <>
      <div
        style={{ height: `600px` }}
        className="map-canvas"
        id="map-canvas"
        ref={mapRef}
      ></div>
    </>
  );
};*/
}


// const isRequired = (message) => (value) => !!value ? undefined : message;

const Provincias = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableComponents, setTableComponents] = useState([]);


  function toggleModalState() {
    setIsModalOpen(!isModalOpen);
  }

async function getProvinceList(){
  const request = await axios.get("/provinces/list/1");
  const { data } = await request.data;
  // console.log("**************", data );
  // eslint-disable-next-line no-unused-vars
  data.map(({ id, provinceName, codeProvince, region }) => {
    //   tableComponents.push({ "Nº": id, Nome: countryName, Sigla: codeCountry, Região: region });
    setTableComponents((lastProvince) => [
      ...lastProvince,
      { id: id, Nome: provinceName, Sigla: codeProvince, region: region },
    ]);
  });

}

  useEffect( () => {
    getProvinceList();
  }, []);


  const colunas = [
    {
      name: "Nº",
      selector: "id",
      sortable: true,
    },
    {
      name: "Nome",
      selector: "Nome",
      sortable: true,
    },
    {
      name: "Sigla",
      selector: "Sigla",
      sortable: true,
    },
    {
      name: "Região",
      selector: "region",
      sortable: true,
    },
    {
      name: "Ações",
      selector: () => {
        return (
          <>
            <Button
              className="btn btn-outline-info fa fa-edit text-default mr-2"
              style={{ fontSize: "18px" }}
              data-toggle="tooltip"
              data-placement="top"
              title="Editar País"
              onClick={toggleModalState}
              size="sm"
            ></Button>
            <Button
              className="btn btn-outline-danger fa fa-trash-alt text-default mr-2"
              style={{ fontSize: "18px" }}
              data-toggle="tooltip"
              data-placement="top"
              title="Eliminar País"
              size="sm"
            ></Button>
          </>
        );
      },
    },
  ];

  const paginationOp = {
    rowsPerPageText: "filas por pagina",
    rangerSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "todos",
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row className="d-flex justify-content-center">
          <Col className="order-xl-1" xl="12">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Província</h3>

                <Button
                  className="fa fa-plus-square mr-2"
                  style={{
                    fontSize: "20px",
                    position: "static",
                    float: "right",
                  }}
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Novo País"
                  color="info"
                  onClick={toggleModalState}
                  size="sm"
                >
                  {" "}
                  Adicionar
                </Button>
              </CardHeader>
              <CardBody>
                <DataTable
                  columns={colunas}
                  data={tableComponents}
                  pagination
                  paginationComponentOptions={paginationOp}
                  fixedHeader
                  fixedHeaderScrollHeight="600px"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <ProvinceModal isOpen={isModalOpen} changeModalState={toggleModalState} />
    </>
  );
};
export default Provincias;
