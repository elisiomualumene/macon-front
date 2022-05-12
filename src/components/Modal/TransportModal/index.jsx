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

export function TransportModal({ isOpen, changeModalState }) {
  // eslint-disable-next-line no-unused-vars
  const { addTransport } = useContext(AppContext);
  // eslint-disable-next-line no-unused-vars
  const [listComponents, setListComponents] = useState([]);
  // const [list, setList] = useState([]);
  const [isoriginProvince, setOriginProvince] = useState(null);
    const [isdestinyProvince, setDestinyProvince] = useState(null);

  async function getProvinceList() {
    const request = await axios.get("/transport");
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

  useEffect(() => {
    getProvinceList();
  }, []);

  // eslint-disable-next-line no-unused-vars

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
        <ModalHeader toggle={changeModalState}>
          <h1>Adicionar Transporte</h1>
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              transportName: "",
              transportNumber: "",
              typeTransportId:"",
              totalPlace: "",


            }}
            onSubmit={ async({
              transportName,
              transportNumber,
              typeTransportId,
              totalPlace,

            }) => {
              console.log("Modal, values: ", {
                transportName,
                transportNumber,
                typeTransportId,
                totalPlace,
              });

              console.log("Id da origem:--------", transportName);

              console.log("Dados da Viagem",addTransport)

              const addNewTranport = await addTransport(
                transportName,
                transportNumber,
                typeTransportId,
                totalPlace
              );

              console.log("Dados do Transporte",addNewTranport)

              if (addNewTranport.success) {
                changeModalState();
                toast.success(`Uma novo Transport adicionado com sucesso!`);
              } else {
                toast.error(addNewTranport.message);
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

                <div className="input-group mt-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon2">
                      <FaBus />
                    </span>
                  </div>
                  <Field
                    type="text"
                    name="transportName"
                    className="form-control password-form"
                    placeholder="Nome do Transporte"
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
                    name="transportNumber"
                    className="form-control password-form"
                    placeholder="Número de série"
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
                    name="typeTransportId"
                    className="form-control password-form"
                    placeholder="Tipo de Transporte"
                  />
                </div>

                {/* <div className="input-group mt-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon2">
                      <FaMapMarkerAlt />
                    </span>
                  </div>

                  <Select
                  styles={customStyles}

                    options={listComponents}
                    onChange={onOriginProvince}
                    value={isoriginProvince?values.originProvince=isoriginProvince:values.originProvince=null}
                    placeholder="Selecione o Tipo de Transport"
                  />
                </div> */}

                <div className="input-group mt-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon2">
                      <FaDollarSign />
                    </span>
                  </div>
                  <Field
                    type="number"
                    name="totalPlace"
                    className="form-control password-form"
                    placeholder="Quantidade de Lugar"
                  />
                </div>

                <div className="input-group my-4">

                  <Button color="info" type="submit">
                    Adicionar
                  </Button>{" "}
                  <Button color="danger" onClick={changeModalState}>
                    Cancelar
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </>
  );
}
