import React from "react";
import { useState, useEffect } from "react";
import "../assets/css/Sidebar.css";
import Navbar from "./Navbar";
import { Card, Col, Row, Form, Button } from "react-bootstrap";
import { faDotCircle, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ isRefresh, setRefresh }) => {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [gambar, setGambar] = useState("");
  const [category, setCategory] = useState("");

  const addTodo = () => {
    const newTodo = { nama, harga, gambar, is_ready: true, category };

    fetch("http://localhost:3004/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    }).then(() => {
      setNama("");
      setHarga("");
      setGambar("");
      setCategory("");
      setRefresh(true);
      setTimeout(() => {
        // alert("Kalimat Berhasil Ditambahkan");
      }, 500);
    });
  };

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (isRefresh) {
      fetch("http://localhost:3004/categories")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRefresh(false);
          setTodos(data);
        })
        .catch((err) => {
          setRefresh(false);
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          }
        });
    }
  }, [isRefresh, setRefresh]);

  return (
    <div className="body main">
      <Navbar />

      {/* Content*/}
      <main className="mt-5 pt-3">
        <div className="container">
          <h3 style={{ fontWeight: "lighter" }}>TAMBAH PRODUK</h3>
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
            <li>Tambah Produk</li>
          </ul>
          <Card>
            <Card.Header
              style={{
                backgroundColor: "black",
                paddingTop: "15px",
                color: "white",
              }}
            >
              <Card.Title>
                <FontAwesomeIcon icon={faDotCircle} /> Form Tambah Menu
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Form>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextEmail"
                    >
                      {/* <Form.Label column sm="2" style={{ textAlign: "right" }}>
                        Nama Barang
                      </Form.Label> */}
                      <Form.Label column sm="2" style={{ textAlign: "right" }}>
                        Nama Produk
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          name="nama"
                          placeholder="Nama Anda..."
                          required
                          value={nama}
                          onChange={(e) => setNama(e.target.value)}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label column sm="2" style={{ textAlign: "right" }}>
                        Deskripsi
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          required
                          as="textarea"
                          style={{ height: "300px" }}
                        />
                      </Col>
                    </Form.Group>
                  </Form>
                </Col>
                <Col>
                  <Form>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="2" style={{ textAlign: "right" }}>
                        Kategori
                      </Form.Label>
                      <Col sm="10">
                        <Form.Select
                          name="category"
                          placeholder="Kategori..."
                          required
                          id="category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="" disabled>
                            Kategori
                          </option>
                          {todos.map((todo) => (
                            <option>{todo.nama}</option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Form.Group>

                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label column sm="2" style={{ textAlign: "right" }}>
                        Harga
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="number"
                          name="nama"
                          placeholder="Nama Anda..."
                          required
                          value={harga}
                          onChange={(e) => setHarga(e.target.value)}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label column sm="2" style={{ textAlign: "right" }}>
                        Tambah Gambar
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="file"
                          required
                          value={gambar}
                          onChange={(e) => setGambar(e.target.value)}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                      <Button
                        variant="primary"
                        type="submit"
                        style={{
                          marginLeft: "200px",
                          width: "200px",
                          padding: "20px",
                          borderRadius: "50px",
                          float: "right",
                        }}
                        onClick={addTodo}
                      >
                        <strong>
                          <FontAwesomeIcon icon={faSave} /> Tambah
                        </strong>
                      </Button>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <br />
        </div>
      </main>
    </div>
  );
};
export default Header;
