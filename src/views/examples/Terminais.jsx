import { useState, useEffect } from "react";

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

import { TerminalModal } from '../../components/Modal/TerminalModal';

const Terminais = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableComponents, setTableComponents] = useState([]);

  function toggleModalState() {
    setIsModalOpen(!isModalOpen);
  }

async function getProvinceList(){
  const request = await axios.get("/spots/list/");
    const { data } = await request.data;
     console.log("**************", data );
    // eslint-disable-next-line no-unused-vars
    data.map(({ id, spotName, description,  contacts }) => {
      //   tableComponents.push({ "Nº": id, Nome: countryName, Sigla: codeCountry, Região: region });
      setTableComponents((lastProvince) => [
        ...lastProvince,
        { id: id, Nome: spotName, Sigla: description, region: contacts },
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
        <Row  className="d-flex justify-content-center">
          <Col className="order-xl-1" xl="12">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Terminais</h3>

                  <Button
                    className="fa fa-plus-square mr-2"
                    style={{
                      fontSize: "20px",
                      position: "static",
                      float: "right",
                    }}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Novo Terminal"
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
        <TerminalModal isOpen={isModalOpen} changeModalState={toggleModalState}/>
      </Container>
    </>
  );
};

export default Terminais;
