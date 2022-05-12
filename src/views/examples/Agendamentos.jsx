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

// const isRequired = (message) => (value) => !!value ? undefined : message;

const Agendamentos = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableComponents, setTableComponents] = useState([]);


  function toggleModalState() {
    setIsModalOpen(!isModalOpen);
  }

async function getProvinceList(){
  const request = await axios.get("/client/travel/all");
    const { data } = await request.data;


     console.log("**************", data );
      // createdAt: "2021-10-30T12:40:33.060Z"
      // deletedAt: null
      // id: 2
      // notes: null
      // personalCodeAgend: "maconTranspundefinedundefined400"
      // phoneNumber: null
      // placesReserve: 8
      // status: null
      // updatedAt: "2021-10-30T12:40:33.060Z"
      // userAgendCode: ""

    // eslint-disable-next-line no-unused-vars
    data.map(({ id, personalCodeAgend, userAgendCode, phoneNumber, placesReserve,status }) => {
      //   tableComponents.push({ "Nº": id, Nome: countryName, Sigla: codeCountry, Região: region });
      setTableComponents((lastAgend) => [
        ...lastAgend,
        { id: id, Nome: personalCodeAgend, Numero:phoneNumber, places:placesReserve, estado: status },
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
      name: "Numero",
      selector: "Numero",
      sortable: true,
    },
    {
      name: "Nº de Lugares",
      selector: "places",
      sortable: true,
    },
    {
      name: "estado",
      selector:"estado",
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
                <h3 className="mb-0">Agendamentos</h3>

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
                  Agendar
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
export default Agendamentos;
