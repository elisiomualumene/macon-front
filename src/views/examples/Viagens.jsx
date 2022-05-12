import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

// import { AuthContext } from "../../contexts/authContext";
// import { AppContext } from "../../contexts/appContext";

import axios from "../../services/axiosConfig";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardBody,
} from "reactstrap";

// core components
import Header from "components/Headers/Header";
// Modal

import { TravelModal } from "./../../components/Modal/TravelModal/index";
//import { icons } from 'react-icons/lib';

const Viagens = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [tableComponents, setTableComponents] = useState([]);

  function toggleModalState() {
    setIsModalOpen(!isModalOpen);
  }

  async function getTravelList() {
    const request = await axios.get("travels/list/");
    const { data } = await request.data;

    console.log("************** Travel List: ", data);

    // eslint-disable-next-line no-unused-vars
    data.map(
      ({
        originProvince,
        destinyProvince,
        departureDate,
        returnDate,
        price,
      }) => {
        const { provinceName: orignProvinceName } = originProvince;
        const { provinceName: destinyProvinceName } = destinyProvince;

        setTableComponents((lastTravel) => [
          ...lastTravel,
          // { Origin: "xxx", Destiny: "xxx", departureDate: departureDate, returnDate: returnDate,price: price },
          {
            Origin: orignProvinceName,
            Destiny: destinyProvinceName,
            departureDate: departureDate,
            returnDate: returnDate,
            price: price,
          },
        ]);
      }
    );
  }

  useEffect(() => {
    getTravelList();
  }, []);

  const colunas = [
    {
      name: "Origem",
      selector: "Origin",
      sortable: true,
    },
    {
      name: "Destino",
      selector: "Destiny",
      sortable: true,
    },
    {
      name: "Data de Partida",
      selector: "departureDate",
      sortable: true,
    },
    {
      name: "Data de Chegada",
      selector: "returnDate",
      sortable: true,
    },
    {
      name: "Preço",
      selector: "price",
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
              title="Actualizar Viagens "
              onClick={toggleModalState}
              size="sm"
            ></Button>
            <Button
              className="btn btn-outline-danger fa fa-trash-alt text-default mr-2"
              style={{ fontSize: "18px" }}
              data-toggle="tooltip"
              data-placement="top"
              title="Cancelar Viagens"
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
                <h3 className="mb-0">Viagens</h3>

                <Button
                  className="fa fa-plus-square mr-2"
                  style={{
                    //icons:"fa-plus-square",
                    fontFamily: "Roboto",
                    fontSize: "20px",
                    position: "static",
                    float: "right",
                  }}
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Agendar Viagens"
                  color="info"
                  onClick={toggleModalState}
                  size="sm"
                >
                  {" "}
                  Cadastrar
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

      <TravelModal isOpen={isModalOpen} changeModalState={toggleModalState} />
    </>
  );
};

export default Viagens;
