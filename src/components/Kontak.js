import React, { Component } from "react";
import "../assets/css/Sidebar.css";
import Navbar from "./Navbar";
import Kon from "./Kon";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import swal from "sweetalert";

const apiURL = "http://localhost:3004/users/";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUser: [], // Untuk tampung Get all data
      totalData: 0, // Untuk Hitung All Data
      isUpdate: false, // Untuk Fileter Fungsi
      Notif: {
        // Untuk Tampung respon Dari Server
        alertShow: false,
        actionType: "",
        responCode: 0,
      },
      DataUserNew: {
        // untuk Tampung data Update / New data
        id: 1,
        home: "",
        email: "",
        telfon: "",
      },
    };
  }

  componentDidMount() {
    this.GetdataUsers();
  }

  GetdataUsers() {
    fetch(apiURL)
      .then((res) => {
        if (res.status === 200) return res.json();
        else return <p>No data Found</p>;
      })
      .then((resdata) => {
        console.log(resdata);
        // console.log('Numrow', resdata.length)
        this.setState({
          dataUser: resdata,
          totalData: resdata.length,
        });
      });
  }
  SaveNewDataUSer = () => {
    const Newdata = this.state.DataUserNew;

    fetch(apiURL, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Newdata),
    }).then((res) => {
      console.log(res);
      console.log("Status Create", res.status);

      // Untuk Tampung respon Dari Server
      this.setState({
        Notif: {
          alertShow: true,
          actionType: "created",
          responCode: res.status,
        },
      });

      this.GetdataUsers();
      this.ClearForm();
    });
  };
  UpdateDataUser = () => {
    const dataUpdate = this.state.DataUserNew;
    const id = dataUpdate.id;

    fetch(apiURL + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataUpdate),
    }).then((res) => {
      console.log(res);
      console.log("Status Update", res.status);

      // Untuk Tampung respon Dari Server
      this.setState({
        Notif: {
          alertShow: true,
          actionType: "updated",
          responCode: res.status,
        },
      });

      this.GetdataUsers();
      this.ClearForm();
    });
  };
  HendelOnchange = (event) => {
    // console.log('Form Change')
    const NumberingId = this.state.totalData + 1; // Untuk ID New Data
    let prmInputUser = { ...this.state.DataUserNew }; // Copy State
    if (!this.state.isUpdate) {
      //Cek Jika Update Data Idnya Tidak Di Ubah
      prmInputUser["id"] = NumberingId;
    }
    prmInputUser[event.target.name] = event.target.value;
    this.setState({
      DataUserNew: prmInputUser,
    });
  };
  ClearForm = () => {
    this.setState({
      isUpdate: false,
      DataUserNew: {
        id: 1,
        home: "",
        email: "",
        telfon: "",
      },
    });

    // Mengembalikan Nilai Awal Notif
    setInterval(() => {
      this.setState({
        Notif: {
          alertShow: false,
          actionType: "",
          responCode: 0,
        },
      });
    }, 4500);
  };
  HendelSimpan = () => {
    if (this.state.isUpdate) {
      this.UpdateDataUser();
      swal({
        title: "Sukses Di Perbaharui",
        text: "Succes Full ",
        icon: "success",
        button: false,
        timer: 1500,
      });
    } else {
      this.SaveNewDataUSer();
    }
  };
  HendelUpdate = (data) => {
    console.log("Update id", data.id);
    console.log("Update arry", data);
    this.setState({
      DataUserNew: data,
      isUpdate: true,
    });
  };

  render() {
    return (
      <div className="body main">
        <Navbar />

        {/* Content*/}
        <Container>
          <main className="mt-5 pt-3">
            <div className="row">
              <Container className="row">
                <div className=" mt-3">
                <h3 style={{ fontWeight: "lighter" }}>KONTAK KAMI</h3>
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
            <li>Kontak Kami</li>
          </ul>
                  <Form>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formHorizontalEmail"
                    >
                      <Form.Label column sm={2}>
                        <strong>Alamat</strong>
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control
                          placeholder="Alamat..."
                          id="Alamat"
                          required
                          name="Alamat"
                          onChange={this.HendelOnchange}
                          value={this.state.DataUserNew.home}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formHorizontalEmail"
                    >
                      <Form.Label column sm={2}>
                        <strong>No.Telpon</strong>
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control
                          placeholder="No.Telpon..."
                          id="telfon"
                          required
                          name="telfon"
                          onChange={this.HendelOnchange}
                          value={this.state.DataUserNew.telfon}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formHorizontalEmail"
                    >
                      <Form.Label column sm={2}>
                        <strong>Email</strong>
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control
                          placeholder="Email..."
                          id="email"
                          required
                          name="email"
                          onChange={this.HendelOnchange}
                          value={this.state.DataUserNew.email}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                      <Col sm={{ span: 10, offset: 2 }}>
                        <Button
                          variant="primary"
                          type="submit"
                          style={{
                            width: "100px",
                            padding: "10px",
                            borderRadius: "10px",
                            float: "right",
                          }}
                          onClick={this.HendelSimpan}
                        >
                          <strong>Simpan</strong>
                        </Button>
                        {this.state.dataUser.map((dataUser) => {
                          return (
                            <Kon
                              key={dataUser.id}
                              data={dataUser}
                              update={this.HendelUpdate} // Pemanggilan Hendel Update
                            />
                          );
                        })}
                      </Col>
                    </Form.Group>
                  </Form>
                </div>
              </Container>
            </div>
          </main>
        </Container>
      </div>
    );
  }
}
export default Nav;
