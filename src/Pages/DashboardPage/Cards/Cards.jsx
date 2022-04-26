import './Cards.css';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import api from '../../../services/api.js';

function Cards() {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [rents, setRents] = useState([]);

  const getUsers = async () => {
    const { data } = await api.get('usuarios');
    setUsers(data);
  };

  const getBooks = async () => {
    const { data } = await api.get('livros');
    setBooks(data);
  };

  const getPublishers = async () => {
    const { data } = await api.get('editoras');
    setPublishers(data);
  };

  const getRents = () => {
    api.get('alugueis').then(({ data }) => {
      setRents(data);
    });
  };

  useEffect(() => {
    getUsers();
    getBooks();
    getPublishers();
    getRents();
  }, []);

  return (
    <Row className="mt-4">
      <Col>
        <Link to="/users" className="d-flex cards align-items-center justify-content-between">
          <div className="d-flex flex-column">
            <span>Usuários</span>
            <span>{users.length}</span>
          </div>
          <div>
            <span className="material-symbols-outlined">person</span>
          </div>
        </Link>
      </Col>
      <Col>
        <Link to="/publishers" className="d-flex cards align-items-center justify-content-between">
          <div className="d-flex flex-column">
            <span>Editoras</span>
            <span>{publishers.length}</span>
          </div>
          <div>
            <span className="material-symbols-outlined">local_library</span>
          </div>
        </Link>
      </Col>
      <Col>
        <Link to="/books" className="d-flex cards align-items-center justify-content-between">
          <div className="d-flex flex-column">
            <span>Livros</span>
            <span>{books.length}</span>
          </div>
          <div>
            <span className="material-symbols-outlined">auto_stories</span>
          </div>
        </Link>
      </Col>
      <Col>
        <Link to="/rents" className="d-flex cards align-items-center justify-content-between">
          <div className="d-flex flex-column">
            <span>Aluguéis</span>
            <span>{rents.length}</span>
          </div>
          <div>
            <span className="material-symbols-outlined">calendar_today</span>
          </div>
        </Link>
      </Col>
    </Row>
  );
}

export default Cards;
