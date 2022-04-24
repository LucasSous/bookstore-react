import React from 'react';
import Chart from 'react-apexcharts';
import { Card, Row, Col } from 'react-bootstrap';
import './Charts.css';

function Charts() {
  const options = {
    series: [
      {
        name: 'Total',
        data: [400, 430, 448, 470, 540]
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
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy']
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
          <div className="d-flex cards align-items-center justify-content-between">
            <div className="d-flex flex-column">
              <span>Usuários</span>
              <span>29</span>
            </div>
            <div>
              <span className="material-symbols-outlined">person</span>
            </div>
          </div>
        </Col>
        <Col>
          <div className="d-flex cards align-items-center justify-content-between">
            <div className="d-flex flex-column">
              <span>Editoras</span>
              <span>29</span>
            </div>
            <div>
              <span className="material-symbols-outlined">local_library</span>
            </div>
          </div>
        </Col>
        <Col>
          <div className="d-flex cards align-items-center justify-content-between">
            <div className="d-flex flex-column">
              <span>Livros</span>
              <span>29</span>
            </div>
            <div>
              <span className="material-symbols-outlined">auto_stories</span>
            </div>
          </div>
        </Col>
        <Col>
          <div className="d-flex cards align-items-center justify-content-between">
            <div className="d-flex flex-column">
              <span>Aluguéis</span>
              <span>29</span>
            </div>
            <div>
              <span className="material-symbols-outlined">calendar_today</span>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Livros mais alugados</Card.Title>
              <Card.Text>
                <Chart options={options} series={options.series} type="bar" width="100%" height={270} />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Status de aluguéis</Card.Title>
              <Card.Text className="d-flex justify-content-center">
                <Chart options={donutChart} series={donutChart.series} type="donut" width={450} height={350} />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Charts;
