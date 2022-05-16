import Chart from 'react-apexcharts';
import { Card, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState, useContext } from 'react';
import api from '../../../services/api.js';
import { GlobalContext } from '../../../contexts/globalContext.jsx';
import './Charts.css';

function Charts() {
  const [rents, setRents] = useState([]);
  const [mostRentedBooks, setMostRentedBooks] = useState([]);

  const { cardTheme, textTheme } = useContext(GlobalContext);

  const getRents = () => {
    api.get('alugueis').then(({ data }) => {
      setRents(data);
    });
  };
  const getMostRentedBooks = () => {
    api.get('maisalugados').then(({ data }) => {
      setMostRentedBooks(data);
    });
  };

  function filterOnDeadline(obj) {
    if ('data_devolucao' in obj && obj.data_devolucao <= obj.data_previsao) {
      return true;
    }
  }

  function filterNotReturned(obj) {
    if ('data_devolucao' in obj && obj.data_devolucao === null) {
      return true;
    }
  }

  function filterOnDelay(obj) {
    if ('data_devolucao' in obj && obj.data_devolucao > obj.data_previsao) {
      return true;
    }
  }

  var onTime = rents.filter(filterOnDeadline);
  var notReturned = rents.filter(filterNotReturned);
  var onDelay = rents.filter(filterOnDelay);

  useEffect(() => {
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
    series: [notReturned.length, onTime.length, onDelay.length],
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
          <Card className={cardTheme}>
            <Card.Body>
              <Card.Title className={`d-flex justify-content-center ${textTheme}`}>
                <p>Livros mais alugados</p>
              </Card.Title>
              {mostRentedBooks.length ? (
                <div>
                  <Chart options={options} series={options.series} type="bar" width="100%" height={270} />
                </div>
              ) : (
                <div>
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <span>Carregando dados...</span>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className={cardTheme}>
            <Card.Body>
              <Card.Title className={`d-flex justify-content-center ${textTheme}`}>
                <p>Status de aluguéis</p>
              </Card.Title>
              {rents.length ? (
                <div className="d-flex justify-content-center">
                  <Chart options={donutChart} series={donutChart.series} type="donut" width={450} height={350} />
                </div>
              ) : (
                <div>
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <span>Carregando dados...</span>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Charts;
