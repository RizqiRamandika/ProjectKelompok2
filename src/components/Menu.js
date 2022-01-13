import React, {Component} from "react";
import "../assets/css/Sidebar.css";
import { Table, Button, Card } from "react-bootstrap";
import Navbar from "./Navbar";
import axios from "axios";
import { API_URL } from "../utils/constants"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
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
      .get(API_URL + "pesanans").then((res) => {
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
            Order
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
            <li>Daftar orderan</li>
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
                  <FontAwesomeIcon icon={faListAlt} size="md" />
                  Daftar Order
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover className="text-center">
                  <thead>
                    <tr>
                      <th></th>
                      <th><b>No</b></th>
                      <th><b>Nama Pemesan</b></th>
                      <th><b>Alamat</b></th>
                      <th><b>Harga</b></th>
                      <th><b>Konfirmasi</b></th>
                      <th><b>Status</b></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.pesanans.map((pesanans, index) => (
                    <tr>
                      <td>
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          style={{ margin: "7px 7px" }}
                        />
                      </td>
                      <td><b>{index + 1}</b></td>
                      <td><b>{pesanans.user}</b></td>
                      <td><b>{pesanans.alamat}</b></td>
                      <td><b>{pesanans.keterangan}</b></td>
                      <td>
                        <Button variant="success" style={{padding:"8px", width:"120px"}}>KONFIRM</Button>
                      </td>
                      <td>
                        <Button variant="success" style={{padding:"8px", width:"120px"}}>BAYAR</Button>
                      </td>
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