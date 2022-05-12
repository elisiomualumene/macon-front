import Index from "views/Index";
import Terminais from "views/examples/Terminais";
import Provincias from "views/examples/Provincias";
import Register from "views/examples/Register";
import Login from "views/examples/Login";
import Viagens from "views/examples/Viagens";
import Pais from "views/examples/Pais";
import Transporte from "views/examples/Transporte";
import Agendamentos from "views/examples/Agendamentos";


var routes = [
  {
    path: "/index",
    name: "Pagina Inicial",
    icon: "ni ni-tv-2 text-info",
    component: Index,
    layout: "/admin",

  },
  {
    path: "/pais",
    name: "País",
    icon: "ni ni-world-2 text-info",
    component: Pais,
    layout: "/admin",



  },
  {
    path: "/provincias",
    name: "Províncias",
    icon: "ni ni-pin-3 text-info",
    component: Provincias,
    layout: "/admin",


  },
  {
    path: "/transporte",
    name: " Transporte",
    icon: "fa fa-bus text-info",
    component: Transporte,
    layout: "/admin",



  },
  {
    path: "/terminais",
    name: " Terminais",
    icon: "ni ni-square-pin text-info",
    component: Terminais,
    layout: "/admin",



  },
  {
    path: "/viagens",
    name: "Viagens",
    icon: "ni ni-planet text-info",
    component: Viagens,
    layout: "/admin",

    // subnav: [
    //   {
    //     path: "/",
    //     name: "Agendar Viagens",
    //     icon: "fa fa-money-check text-info",
    //     component: Viagens,
    //     layout: "/",
    //   },
    //   {
    //     path: "/",
    //     name: "Actualizar Dados",
    //     icon: "fa fa-edit text-info",
    //     component: Viagens,
    //     layout: "/",
    //   },

    //   {
    //     path: "/",
    //     name: "Cancelar Viagens",
    //     icon: "fa fa-trash text-info",
    //     component: Viagens,
    //     layout: "/",
    //   }
    // ]
  },
  {
    path: "/agendamentos",
    name: "Agendamentos",
    icon: "ni ni-calendar-grid-58 text-info",
    component: Agendamentos,
    layout: "/admin",

    subnav: [
      {
        path: "/",
        name: "Listar ",
        icon: "fa fa-list text-info",
        component: Login,
        layout: "/",
      },
      {
        path: "/",
        name: "Consultar",
        icon: "fa fa-search text-info",
        component: Login,
        layout: "/",
      },


    ]
  },

  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Criar Utilizadores",
    icon: "ni ni-circle-08 text-info",
    component: Register,
    layout: "/auth",
  },
];
export default routes;
