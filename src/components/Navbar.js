import React, { Component } from "react";
import "../assets/css/Sidebar.css";
import { Button } from "react-bootstrap";
// import FormSett from "./FormSett";
import Judul from "./Judul";

const apiURL = "http://localhost:3004/users/";

class Crud extends Component {
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
        nama: "",
        deskripsi: "",
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
        nama: "",
        deskripsi: "",
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
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#sidebar"
              aria-controls="offcanvasExample"
            >
              <span
                className="navbar-toggler-icon"
                data-bs-target="#sidebar"
              ></span>
            </button>
            {this.state.dataUser.map((dataUser) => {
              return (
                <Judul
                  key={dataUser.id}
                  data={dataUser}
                  update={this.HendelUpdate} // Pemanggilan Hendel Update
                />
              );
            })}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#topNavBar"
              aria-controls="topNavBar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="topNavBar">
              <form className="d-flex ms-auto my-3 my-lg-0">
                <div className="input-group"></div>
              </form>
              <a href="/">
                <Button class="aaa">
                  <i
                    style={{ marginRight: "7px" }}
                    className="bi bi-box-arrow-left"
                  ></i>
                  LogOut
                </Button>
              </a>
            </div>
          </div>
        </nav>

        {/* Sidebar*/}
        <div
          className="offcanvas offcanvas-start sidebar-nav bg-dark"
          tabIndex="-1"
          id="sidebar"
        >
          <div className="offcanvas-body p-0">
            <nav className="navbar-dark">
              <ul className="navbar-nav">
                <br />
                <li>
                  <a href="/Dashbor" className="nav-link px-3 active">
                    <span className="me-2">
                      <i class="bi bi-house-door"></i>
                    </span>
                    <span style={{ fontSize: "15px" }}>Dashboard</span>
                  </a>
                </li>
                <li>
                  <a href="/Setting" className="nav-link px-3 active">
                    <span className="me-2">
                      <i class="bi bi-gear"></i>
                    </span>
                    <span style={{ fontSize: "15px" }}>Setting Apps</span>
                  </a>
                </li>
                <li className="my-4">
                  <hr className="dropdown-divider bg-light" />
                </li>
                <li>
                  <div className="text-muted small fw-bold text-uppercase px-3 mb-3 fs-6 ">
                    MENU MASTER
                  </div>
                </li>

                <li>
                  <a href="/Kontak" className="nav-link px-3 active">
                    <span className="me-2">
                      <i class="bi bi-telephone-fill"></i>
                    </span>
                    <span>Kontak kami</span>
                  </a>
                </li>
                <li>
                  <a
                    className="nav-link px-3 active sidebar-link"
                    data-bs-toggle="collapse"
                    href="#layouts"
                  >
                    <span className="me-2">
                      <i class="bi bi-folder"></i>
                    </span>
                    <span>Data Master</span>
                    <span className="ms-auto">
                      <span className="right-icon">
                        <i className="bi bi-chevron-down"></i>
                      </span>
                    </span>
                  </a>
                  <div className="collapse" id="layouts">
                    <ul className="navbar-nav ps-3">
                      <li>
                        <a href="/TambahProduc" className="nav-link px-3">
                          <span className="me-2">
                            <i class="bi bi-dash-circle"></i>
                          </span>
                          <span>Tambah Produk</span>
                        </a>
                      </li>
                      <li>
                        <a href="/Kategori" className="nav-link px-3">
                          <span className="me-2">
                            <i class="bi bi-dash-circle"></i>
                          </span>
                          <span>Produk</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="my-4">
                  <hr className="dropdown-divider bg-light" />
                </li>
                <li>
                  <div className="text-muted small fw-bold text-uppercase px-3 mb-3 fs-6">
                    MENU TRANSAKSI
                  </div>
                </li>
                <li>
                  <a href="/Menu" className="nav-link px-3 active">
                    <span className="me-2">
                      <i class="bi bi-phone"></i>
                    </span>
                    <span>Order</span>
                  </a>
                </li>
                <li className="my-4">
                  <hr className="dropdown-divider bg-light" />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}
export default Crud;
