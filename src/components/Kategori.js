import React, {Component} from "react";
import "../assets/css/Sidebar.css";
import { Table, Card } from "react-bootstrap";
import Navbar from "./Navbar";
import axios from "axios";
import { API_URL } from "../utils/constants"
import { numberWithCommas } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pesanans: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products").then((res) => {
        const pesanans = res.data
        this.setState({pesanans})
      })
  }
  render() {
  return (
    <div className="body main">
      <Navbar />

      {/* Content*/}
      <main className="mt-5 pt-3">
        <div className="container">
          <h3>
            PRODUK
          </h3>
        <ul class="breadcrumb">
            <li>
              <a href="/">
                <i style={{ paddingRight: "3px" }} class="bi bi-house-door"></i>
                Home
              </a>
            </li>
            <li>
              <a href="/Dashbor">Dashboard</a>
            </li>
            <li>Daftar Produk</li>
          </ul>
          <div className="container">
            <Card>
              <Card.Header
                style={{
                  backgroundColor: "black",
                  paddingTop: "20px",
                  color: "white",
                }}
              >
                <Card.Title>
                  <FontAwesomeIcon icon={faListAlt} size="md" /> Daftar Produk
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover className="text-center">
                  <thead>
                    <tr>
                      <th><b>No</b></th>
                      <th><b>Nama Produk</b></th>
                      <th><b>Harga</b></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.pesanans.map((pesanans, index) => (
                    <tr>
                      <td><b>{index + 1}</b></td>
                      <td><b>{pesanans.nama}</b></td>
                      <td><b>Rp. {numberWithCommas(pesanans.harga)}</b></td>
                      {/* <td><b>{pesanans.keterangan}</b></td> */}
                    </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
}
export default App;