import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseButton from '../../../components/BaseButton/BaseButton.jsx';
import api from '../../../services/api.js';
import './RentsList.css';
import { GlobalContext } from '../../../contexts/globalContext.jsx';
import Loading from '../../../components/Loading/Loading.jsx';

function RentsList() {
  const [rents, setRents] = useState([]);

  const { textTheme, tableTheme } = useContext(GlobalContext);

  const navigate = useNavigate();

  const getRents = () => {
    api.get('alugueis').then(({ data }) => {
      setRents(data);
    });
  };

  useEffect(() => {
    getRents();
  }, []);

  function filterNotReturned(obj) {
    if ('data_devolucao' in obj && obj.data_devolucao === null) {
      return true;
    }
  }

  var date = new Date();
  var day = String(date.getDate()).padStart(2, '0');
  var month = String(date.getMonth() + 1).padStart(2, '0');
  var year = date.getFullYear();

  const currentDate = year + '-' + month + '-' + day;

  const notReturned = rents.filter(filterNotReturned);

  return (
    <div>
      <div className={`d-flex align-items-center mt-3 ${textTheme}`}>
        <h1 className="me-2 mb-0">Aluguéis em andamento</h1>
        <BaseButton click={() => navigate('/rents')} title="Ir para Aluguéis" />
      </div>

      {rents.length ? (
        <div>
          <table className={`${tableTheme} table shadow-sm mt-3`}>
            <thead className="thead-dashboard-rents">
              <tr>
                <th className="th-start" scope="col">
                  <div className="d-flex ">
                    <span>Cód.</span>
                  </div>
                </th>
                <th scope="col">
                  <div className="d-flex">
                    <span>Usuário</span>
                  </div>
                </th>
                <th scope="col">
                  <div className="d-flex">
                    <span>Livro</span>
                  </div>
                </th>
                <th scope="col">
                  <div className="d-flex">
                    <span>Data de Aluguél</span>
                  </div>
                </th>
                <th scope="col">
                  <div className="d-flex">
                    <span>Previsão de Entrega</span>
                  </div>
                </th>
                <th scope="col">
                  <div className="d-flex">
                    <span>Status</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {notReturned?.map((rent) => (
                <tr className="items-tr" key={rent.id}>
                  <td>{rent.id}</td>
                  <td>{rent.usuario_id.nome}</td>
                  <td>{rent.livro_id.nome}</td>
                  <td>{rent.data_aluguel}</td>
                  <td>{rent.data_previsao}</td>
                  <td>
                    {rent.data_previsao <= currentDate ? (
                      <p className="chip-pending">Pendente</p>
                    ) : (
                      <p className="chip-in-progress">Em andamento</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Loading loadingTitle="Carregando dados" />
      )}
    </div>
  );
}

export default RentsList;
