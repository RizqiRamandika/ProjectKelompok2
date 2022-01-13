import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import { NavbarComponent } from "./components";
// import Footer from "./components/Footer";
import Dashbor from "./components/Dashbor";
import Setting from "./components/Setting";
import Kontak from "./components/Kontak";
import Menu from "./components/Menu";
import aab from "./components/aab";
import Kategori from "./components/Kategori";
import Adidas from "./components/Adidas";
import Vans from "./components/Vans";
import Puma from "./components/Puma";
import Piero from "./components/Piero";
import Superga from "./components/Superga";
import { Home, Sukses, Keranjang1, TabelOrder, OrderSelesai, Login } from "./pages";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdbreact/dist/css/mdb.css";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {/* <NavbarComponent /> */}
        <main>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/sukses" component={Sukses} exact />
            <Route path="/Konfirmasi" component={Keranjang1} exact />
            <Route path="/TabelOrder" component={TabelOrder} exact />
            <Route path="/OrderSelesai" component={OrderSelesai} exact />
            <Route path="/Login" component={Login} exact />
            <Route path="/Dashbor" component={Dashbor} exact />
            <Route path="/Setting" component={Setting} exact />
            <Route path="/Kontak" component={Kontak} exact />
            <Route path="/Menu" component={Menu} exact />
            <Route path="/Kategori" component={Kategori} exact />
            <Route path="/TambahProduc" component={aab} exact />
            <Route path="/Adidas" component={Adidas} exact />
            <Route path="/Vans" component={Vans} exact />
            <Route path="/Puma" component={Puma} exact />
            <Route path="/Piero" component={Piero} exact />
            <Route path="/Superga" component={Superga} exact />
          </Switch>
        </main>
        {/* <Footer /> */}
      </BrowserRouter>
    );
  }
}
