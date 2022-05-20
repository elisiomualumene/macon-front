/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useContext } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { Button, Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import { FaLock, FaUser } from "react-icons/fa";
import { AuthContext } from "../../contexts/authContext";

const LoginSchema = Yup.object().shape({
  user: Yup.string()
    .min(4, "O nome de Utilizador é demasiado curto!")
    .required("O campo Utilizador não pode estar vazio!"),
  password: Yup.string()
    .min(8, "A Palavra-Chave é demasiada curta!")
    .required("O campo Palavra-Chave não pode estar vazio!"),
});

const Registrar = () => { 
  const { authenticateUser, isAuthenticated } = useContext(AuthContext);
  const location = useLocation(); 

  return !isAuthenticated ? (
    <>
      <Col lg="4" md="7">
        <Card
          className="bg-secondary shadow border-0 animate__animated animate__slideInDown"
          style={{ "border-radius": "28px !important" }}
        >
          <CardHeader className="bg-transparent pb-5">
            <img
              className="logo-macon"
              style={{
                width:"100%",
                height:"100hv"
              }}
              alt="..."
              src={require("../../assets/img/brand/logomarca.png").default}
            />
          </CardHeader>
          <CardBody className="px-lg-4 py-lg-4">
            <Formik
              initialValues={{
                user: "",
                password: "",
              }}
              validationSchema={LoginSchema}
              onSubmit={async ({ user, password }) => {
                authenticateUser(user, password);
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form id="form_auth" className="">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        <FaUser />
                      </span>
                    </div>
                    <Field
                      type="text"
                      name="bi"
                      className="form-control"
                      placeholder="Bilhete de Identidade"
                      aria-label="user"
                    />
                    </div>

                    {errors.user && touched.user ? (
                      <div className="text-danger">{errors.user}</div>
                    ) : null}

                        {/* HERE */}

                        <div className="input-group mt-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon2">
                        <FaLock />
                      </span>
                    </div>
                    <Field
                      type="password"
                      name="password"
                      className="form-control password-form"
                      placeholder="Palavra-Chave"
                      aria-label="password"
                    />
                    </div>
                    {errors.password && touched.password ? (
                      <div className="text-danger">{errors.password}</div>
                    ) : null}


                        {/* HERE */}
                    
                    
                        {/* HERE */}

                        <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        <FaUser />
                      </span>
                    </div>
                    <Field
                      type="email"
                      name="user"
                      className="form-control"
                      placeholder="Utilizador"
                      aria-label="user"
                    />
                    </div>

                    {errors.user && touched.user ? (
                      <div className="text-danger">{errors.user}</div>
                    ) : null}

                        {/* HERE */}
                        
                        
                        {/* HERE */}

                    <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        <FaUser />
                      </span>
                    </div>
                    <Field
                      type="number"
                      name="user"
                      className="form-control"
                      placeholder="ID do Usuario"
                      aria-label="user"
                    />
                    </div>

                    {errors.user && touched.user ? (
                      <div className="text-danger">{errors.user}</div>
                    ) : null}

                        {/* HERE */}
                        
                  <div className="input-group mt-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon2">
                        <FaLock />
                      </span>
                    </div>
                    <Field
                      type="number"
                      name="password"
                      className="form-control password-form"
                      placeholder="Numero de Telefone"
                      aria-label="password"
                    />
                    </div>
                    {errors.password && touched.password ? (
                      <div className="text-danger">{errors.password}</div>
                    ) : null}


                  <div className="input-group my-4">
                    <Button
                      id="autenticar_usuario"
                      type="submit"
                      className="botao btn btn-info w-100"
                      disabled={isSubmitting}
                    >
                      Registrar
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      
      </Col>
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
    </>
  ) : (
    <Redirect to={{ pathname: "/admin", state: { from: location } }}/>
  );
};

export default Registrar;

