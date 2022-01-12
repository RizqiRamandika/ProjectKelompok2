import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import Menuss from "./Menuss";
import { API_URL } from "../utils/constants";
import Navbar from "./Navbar";
import axios from "axios";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuss: [],
      categoriYangDipilih: "Superga",
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categoriYangDipilih)
      .then((res) => {
        const menuss = res.data;
        this.setState({ menuss });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });

    this.update();
  }

  update = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };

  changeCategory = (value) => {
    this.setState({
      categoriYangDipilih: value,
      menuss: [],
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menuss = res.data;
        this.setState({ menuss });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };

  render() {
    const { menuss } = this.state;
    return (
      <div className="body main">
        <Navbar />

        {/* Content*/}
        <main className="mt-5 pt-3">
          <div className="container">
            <Row>
              <Col className="mt-3">
                <h4 className="text-center">
                  <strong>Adidas</strong>
                </h4>
                <hr />
                <Row className="overflow-auto menu">
                  {menuss &&
                    menuss.map((menu) => <Menuss key={menu.id} menu={menu} />)}
                </Row>
              </Col>
            </Row>
          </div>
        </main>
      </div>
    );
  }
}
