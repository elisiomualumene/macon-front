/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

import Select from "react-select";

import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import { FaMapMarkerAlt, FaDollarSign, FaBus } from "react-icons/fa";

import { AppContext } from "../../../contexts/appContext";
import axios from "../../../services/axiosConfig";

// ni-square-pin

export function TravelModal({ isOpen, changeModalState }) {
  // eslint-disable-next-line no-unused-vars
  const { addTravel} = useContext(AppContext);
  // eslint-disable-next-line no-unused-vars
  const [listComponents, setListComponents] = useState([]);
  const [listTransport, setListTransport] = useState([]);
  // const [list, setList] = useState([]);

  const [istransportName, setTransportName] = useState([null]);
  const [isoriginProvince, setOriginProvince] = useState(null);
    const [isdestinyProvince, setDestinyProvince] = useState(null);

  async function getProvinceList() {
    const request = await axios.get("provinces/list/1");
    const { data } = await request.data;
    // console.log("dados-------", data);
    // setList(data);
    data.map(({ id, provinceName }) => {
      console.log("Provincias", provinceName);
      // <option value={index}>{provinceName}</option>;
      setListComponents((lastProvince) => [
        ...lastProvince,
        { value: id, label: provinceName },
      ]);
    });
    // eslint-disable-next-line no-unused-vars
  }


  async function getTranportList() {
    const request = await axios.get("/transport/all");
    const { data } = await request.data;
    // console.log("dados-------", data);
    // setList(data);
    data.map(({ id, transportName }) => {
      console.log("Transportes", transportName);
      // <option value={index}>{provinceName}</option>;
      setListTransport((lastTransport) => [
        ...lastTransport,
        { value: id, label: transportName },
      ]);
    });
    // eslint-disable-next-line no-unused-vars
  }


  useEffect(() => {
    getTranportList();
  }, []);


  useEffect(() => {
    getProvinceList();
  }, []);

  // eslint-disable-next-line no-unused-vars

  const onTransportName = (dados) => {
    const { value } = dados;
    setTransportName(dados);
    console.log("dado selecionado-*******",value);
  };


  const onOriginProvince = (dados) => {
    // const {target} = dados;
    const { value } = dados;
    // const {value} = target;
    // setOriginProvince(target.value);
    setOriginProvince(dados);
    console.log("dado selecionado-*******",value);
  };


  const onDestinyProvince = (dados) => {
    const { value } = dados;
    setDestinyProvince(dados);
    console.log("dado selecionado-*******", value);
  };



  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      borderBottom: '1px dotted pink',
      color: state.selectProps.menuColor,
      padding: 20,
    }),



    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    }
  }



  return (
    <>
      <Modal centered isOpen={isOpen} toggle={changeModalState}>
        <ModalHeader toggle={changeModalState} >
          Adicionar nova Viagem
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              originProvince: "",
              destinyProvince: "",
              transportId:"",
              departurDate: "",
              returnDate: "",
              price: "",
            }}
            onSubmit={ async({
              originProvince,
              destinyProvince,
              departurDate,
              transportId,
              returnDate,
              price,
            }) => {
              console.log("Modal, values: ", {
                originProvince,
                destinyProvince,
                departurDate,
                transportId,
                returnDate,
                price,
              });

              console.log("Id da origem:--------", originProvince);

              console.log("Dados da Viagem",addTravel)

              const addNewTravell = await addTravel(
                originProvince.value,
                destinyProvince.value,
                transportId.value,
                departurDate,
                returnDate,
                price
              );

              console.log("Dados da Viagem",addNewTravell)

              if (addNewTravell.success) {
                changeModalState();
                toast.success(`Uma nova Viagem adicionada com sucesso!`);
              } else {
                toast.error(addNewTravell.message);
              }
            }}
          >

            {({ handleBlur, values, setFieldValue}) => (
              <Form id="form_auth" className="">

                  {/* <div className="input-group mt-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon2">
                        <FaMapMarkerAlt />
                      </span>
                    </div>

                    <select  placeholder="selecione a origem" name="originProvince" onChange={onOriginProvince}>
                      {list.map(({ id, provinceName }) => (
                        //  console.log("*****id, provinceName******",id ,provinceName),
                        <option value={values.originProvince=id}>{values.originProvince =provinceName}</option>
                      ))}
                    </select>
                   </div> */}

                {/* <div className="input-group mt-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon2">
                      <FaMapMarkerAlt />
                    </span>
                  </div> */}
                  <Select
                  className="input-groupform-control password-form"
                  styles={customStyles}
                    options={listComponents}
                    onChange={onOriginProvince}
                    value={isoriginProvince?values.originProvince=isoriginProvince:values.originProvince=null}
                    placeholder="Selecione a Origem"
                  />
                {/* </div> */}

                {/* <div className="input-group mt-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon2">
                      <FaMapMarkerAlt />
                    </span>
                  </div> */}
                  <div className="mt-3">

                  </div>
                  <Select
                  className="input-groupform-control password-form"
                    options={listComponents}
                    onChange={onDestinyProvince}
                    value={isdestinyProvince?values.destinyProvince=isdestinyProvince:values.destinyProvince=null}
                    placeholder="Selecione o destino"
                  />
                {/* </div> */}

                {/* <div className="input-group mt-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon2">
                      <FaBus />
                    </span>
                  </div> */}
                  <div className="mt-3">

                  </div>
                  <Select
                  className="input-groupform-control password-form"
                    options={listTransport}
                    onChange={onTransportName}
                    value={istransportName? values.transportId=istransportName:values.transportId=null}
                    placeholder="Selecione o Transporte"
                  />
                {/* </div> */}

                <div className="input-group mt-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon2">
                      Data de Partida
                    </span>
                  </div>
                  <Field
                    type="date"
                    name="departurDate"
                    className="form-control password-form"
                  />
                </div>

                <div className="input-group mt-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon2">
                      Data de Chegada
                    </span>
                  </div>
                  <Field
                    type="date"
                    name="returnDate"
                    className="form-control password-form"
                  />
                </div>

                <div className="input-group mt-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon2">
                      <FaDollarSign />
                    </span>
                  </div>
                  <Field
                    type="number"
                    name="price"
                    className="form-control password-form"
                    placeholder="preço"
                  />
                </div>

                <div className="input-group my-4">
                  <Button color="danger" onClick={changeModalState}>
                    Cancelar
                  </Button>
                  <Button color="info" type="submit">
                    Adicionar
                  </Button>{" "}
                </div>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </>
  );
}
