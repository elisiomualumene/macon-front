/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody,FormGroup, Input } from "reactstrap";

import { Formik, Form, Field} from "formik";
import { FaGlobe,FaMapMarkerAlt,FaPhoneAlt } from "react-icons/fa";
import Select from "react-select";

import { toast } from "react-toastify";

import { AppContext } from "../../../contexts/appContext";
import axios from "../../../services/axiosConfig";


export function TerminalModal({ isOpen, changeModalState }) {

  const { addTerminal} = useContext(AppContext);
  const [listComponents, setListComponents] = useState([]);
  const [isoriginProvince, setOriginProvince] = useState(null);

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

    useEffect(() => {
      getProvinceList();
    }, []);

    const onOriginProvince = (dados) => {
      // const {target} = dados;
      const { value } = dados;
      // const {value} = target;
      // setOriginProvince(target.value);
      setOriginProvince(dados);
      console.log("dado selecionado-*******",value);
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
          Adicionar Novo Terminal
        </ModalHeader>
        <ModalBody>
          <Formik
          initialValues={{
              name:"",
              description:"",
              location:"",
              contacts:"",
              provinceID:""
          }}onSubmit={ async({
              name,
              description,
              location,
              contacts,
              provinceID
            }) => {
            console.log("Modal, values: ", {
              name,
              description,
              location,
              contacts,
              provinceID
            });

            console.log("Id da origem:--------", description);

            console.log("Dados da Viagem",addTerminal)

            const addNewTravell = await addTerminal(
              name,
              description,
              location,
              contacts,
              provinceID.value,
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
              <Select
                className="input-groupform-control password-form"
                styles={customStyles}
                  options={listComponents}
                  onChange={onOriginProvince}
                  value={isoriginProvince?values.provinceID=isoriginProvince:values.provinceID=null}
                  placeholder="Selecione a Província"
              />

              <div className="input-group mt-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon2">
                    <FaGlobe />
                  </span>
                </div>
                <Field
                  type="text"
                  name="name"
                  className="form-control password-form"
                  placeholder="Nome do Terminal"
                  aria-label="Name"
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
                  name="location"
                  className="form-control password-form"
                  placeholder="Localização"
                  aria-label="Localização"
                />
              </div>

              <div className="input-group mt-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon2">
                    <FaPhoneAlt />
                  </span>
                </div>
                <Field
                  type="text"
                  name="contacts"
                  className="form-control password-form"
                  placeholder="Contactos"
                  aria-label="Contactos"
                />
              </div>

              <div className="input-group mt-3">

                <Field
                  type="textarea"
                  name="description"
                  className="form-control password-form"
                  placeholder="Descrição"
                  aria-label="description"
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
