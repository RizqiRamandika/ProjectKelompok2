import React, { Component } from "react";
import { Col, Card } from "react-bootstrap";

class table extends Component {
  render() {
    const kat = this.props.data;
    return (
        <Col md={3} xs={6} className="mb-5">
        <Card className="shadow" style={{ cursor: "pointer", height:"350px" }}>
          <Card.Img
            variant="top"
            width="150px"
            height="210px"
            src={
              "assets/images/" +
              kat.category.nama.toLowerCase() +
              "/" +
              kat.gambar}
          />
          <Card.Body className="text-center">
            <Card.Title>{kat.nama}</Card.Title>
            <Card.Text>Rp. {kat.harga}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default table;
