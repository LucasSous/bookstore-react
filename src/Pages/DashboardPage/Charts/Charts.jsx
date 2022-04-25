import Chart from 'react-apexcharts';
import { Card, Row, Col } from 'react-bootstrap';
import './Charts.css';
import React, { useEffect, useState } from 'react';
import api from '../../../services/api.js';
import { Link } from 'react-router-dom';

function Charts() {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [rents, setRents] = useState([]);
  const [mostRentedBooks, setMostRentedBooks] = useState([]);

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

  const getRents = async () => {
    const { data } = await api.get('alugueis');
    setRents(data);
  };
  const getMostRentedBooks = () => {
    api.get('maisalugados').then(({ data }) => {
      setMostRentedBooks(data);
    });
  };

  useEffect(() => {
    getUsers();
    getBooks();
    getPublishers();
    getRents();
    getMostRentedBooks();
  }, []);

  const dataChart = mostRentedBooks.slice(0, 5);

  const options = {
    series: [
      {
        name: 'Total',
        data: dataChart.map((book) => book.totalalugado)
      }
    ],
    colors: ['#198754'],
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true
      }
    },
    fill: {
      opacity: 1
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: dataChart.map((book) => book.nome)
    }
  };

  const donutChart = {
    series: [44, 55, 41],
    chart: {
      type: 'donut'
    },
    labels: ['Não devolvido', 'No prazo', 'Em atraso'],
    colors: ['#198754', '#0e4129', '#15d179'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };

  return (
    <div className="charts">
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
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="d-flex justify-content-center">Livros mais alugados</Card.Title>
              <div>
                <Chart options={options} series={options.series} type="bar" width="100%" height={270} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="d-flex justify-content-center">Status de aluguéis</Card.Title>
              <div className="d-flex justify-content-center">
                <Chart options={donutChart} series={donutChart.series} type="donut" width={450} height={350} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Charts;
