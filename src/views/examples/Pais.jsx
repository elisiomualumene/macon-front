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
import { CountryModal } from "../../components/Modal/CountryModal";

//import { icons } from "react-icons/lib";
// import { AppContext } from './../../contexts/appContext';

const Pais = () => {
  // const [copiedText, setCopiedText] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableComponents, setTableComponents] = useState([]);

  function toggleModalState() {
    setIsModalOpen(!isModalOpen);
  }

  // function toggleDelete(id) {
  //   setIsModalOpen(!isModalOpen);
  // }

  async function getCountriesList() {
    const request = await axios.get("countries/list/");
    const { data } = await request.data;

    console.log("**************", data );

    // eslint-disable-next-line no-unused-vars
    data.map(({ id, countryName, codeCountry, region }) => {
      //   tableComponents.push({ "Nº": id, Nome: countryName, Sigla: codeCountry, Região: region });
      setTableComponents((lastCountries) => [...lastCountries,{ Nº: id, Nome: countryName, Sigla: codeCountry, Região: region }]);
    });
  }

  useEffect(() => {
    getCountriesList();
  }, []);
  // console.log("***********list dos paises",funcaoTeste())

  //const testetet[]= funcaoTeste();

  const colunas = [
    {
      name: "Nº",
      selector: "Nº",
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
      selector: "Região",
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
              // onClick={toggleDelete(Nº)}
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
                <h3 className="mb-0">País</h3>

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

      <CountryModal isOpen={isModalOpen} changeModalState={toggleModalState} />
    </>
  );
};

export default Pais;
