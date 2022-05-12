
import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

import Select from "react-select";

import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import { FaGlobe,FaFlag,FaMapMarkerAlt } from "react-icons/fa";

import { AppContext } from "../../../contexts/appContext";
import axios from "../../../services/axiosConfig";



export function ProvinceModal({ isOpen, changeModalState }) {

  const {addProvince}= useContext(AppContext);
  // eslint-disable-next-line no-unused-vars
  const [listCountry, setListCountry] = useState([]);
  // const [list, setList] = useState([]);

  const [countryName, setCountryName] = useState([null]);





  async function getCountryList() {
    const request = await axios.get("countries/list/");
    const { data } = await request.data;
    // console.log("dados-------", data);
    // setList(data);
    data.map(({ id, countryName }) => {
      console.log("Transportes", countryName);
      // <option value={index}>{provinceName}</option>;
      setListCountry((lastCountry) => [
        ...lastCountry,
        { value: id, label: countryName },
      ]);
    });
    // eslint-disable-next-line no-unused-vars
  }


  useEffect(() => {
    getCountryList();
  }, []);



  // eslint-disable-next-line no-unused-vars

  const onCountryName = (dados) => {
    const { value } = dados;
    setCountryName(dados);
    console.log("dado selecionado-*******",value);
  };




  // const customStyles = {
  //   menu: (provided, state) => ({
  //     ...provided,
  //     width: state.selectProps.width,
  //     borderBottom: '1px dotted pink',
  //     color: state.selectProps.menuColor,
  //     padding: 20,
  //   }),



  //   singleValue: (provided, state) => {
  //     const opacity = state.isDisabled ? 0.5 : 1;
  //     const transition = 'opacity 300ms';

  //     return { ...provided, opacity, transition };
  //   }
  // }


  return (
    <>
      <Modal centered isOpen={isOpen} toggle={changeModalState}>
        <ModalHeader toggle={changeModalState}>
          <h2>Adicionar Nova Província</h2>
        </ModalHeader>
        <ModalBody>
          <Formik
          initialValues={{
            countryID:"",
            provinceName: "",
            codeProvince: "",
            region:"",
          }}

          onSubmit={async ({countryID, provinceName, codeProvince, region }) => {
            const addNewProvince = await addProvince(countryID.value, provinceName, codeProvince, region);

            if(addNewProvince.success) {
              changeModalState();
              toast.success(`A Provncia ${provinceName} foi salvo correctamente!`);
            } else {
              toast.error(addNewProvince.message);
            }
          }}
          >
            {({  values}) => (
            <Form id="form_auth" className="">
              {/* <div className="input-group mt-3"> */}
                {/* <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon2">
                    <FaGlobe />
                  </span>
                </div> */}
                
                <Select
                    className="input-groupform-control password-form"
                    options={listCountry}
                    onChange={onCountryName}
                    value={countryName?values.countryID=countryName : values.countryID=null}
                    placeholder="Selecione o País"

                  />
                  {/* <select
                  className="form-control password-form"
                  placeholder="Selecione o País "
                  name="id_provincia"
                >
                  <option></option>
                </select> */}

              {/* </div> */}

              <div className="input-group mt-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon2">
                    <FaGlobe />
                  </span>
                </div>
                <Field
                  type="text"
                  name="provinceName"
                  className="form-control"
                  placeholder="Nome da Província"
                  aria-label="user"
                />
              </div>

              <div className="input-group mt-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon2">
                    <FaFlag />
                  </span>
                </div>
                <Field
                  type="text"
                  name="codeProvince"
                  className="form-control password-form"
                  placeholder="Sigla"
                  aria-label="Sigla"
                />
              </div>

              <div className="input-group mt-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon2">
                    <FaMapMarkerAlt />
                  </span>
                </div>
                <Field
                  type="text"
                  name="region"
                  className="form-control password-form"
                  placeholder="Região"
                  aria-label="Região"
                />
              </div>

              <div className="input-group my-4">

                <Button color="info">Adicionar</Button>{" "}
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
