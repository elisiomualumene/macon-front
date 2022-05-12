import React, { useContext } from "react";
import { Redirect,useLocation } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

import { Formik, Form, Field } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { FaGlobe, FaMapMarkerAlt, FaFlag } from "react-icons/fa";

import { AuthContext } from "../../../contexts/authContext";

// ni-square-pin

export function CountryModal({ isOpen, changeModalState }) {
  const {AddCountry, isListAddCountry}= useContext(AuthContext);

  const location = useLocation();
  return !isListAddCountry ? (
            <>
              <Modal centered isOpen={isOpen} toggle={changeModalState}>
                <ModalHeader toggle={changeModalState}>Adicionar novo País</ModalHeader>
                <ModalBody>
                  <Formik
                    initialValues={{
                      country: "",
                      sigla: "",
                      region: "",
                    }}
                    onSubmit={async ({ country, sigla, region }) => {
                      const addNewCountry = await AddCountry(country, sigla, region);

                      if(addNewCountry.success) {
                        changeModalState();
                        toast.success(`O País ${country} foi salvo correctamente!`);
                      } else {
                        toast.error(addNewCountry.message);
                      }
                    }}
                  >
                    <Form id="form_auth" className="">
                      <div className="input-group mt-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon2">
                            <FaGlobe />
                          </span>
                        </div>
                        <Field
                          type="text"
                          name="country"
                          className="form-control"
                          placeholder="Nome do País"
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
                          name="sigla"
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

                        <Button color="info" type="submit">
                          Adicionar
                        </Button>{" "}
                        <Button color="danger" onClick={changeModalState}>
                          Cancelar
                        </Button>
                      </div>
                    </Form>
                  </Formik>
                </ModalBody>
                  <ToastContainer
                    position="top-center"
                    autoClose={2800}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
              </Modal>
            </>
            ) : (
              <Redirect to={{ pathname: "/admin", state: { from: location } }} />
            );
}
