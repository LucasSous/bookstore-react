import './RentsList.css';
import React, { useContext, useEffect } from 'react';
import { RentsContext } from '../../../contexts/rentsContext';
import DeleteConfirmModal from '../../../components/BaseDeleteConfirmModal/DeleteConfirmModal';
import Pagination from '../../../components/Pagination/Pagination';
import { Col, Row } from 'react-bootstrap';
import BaseHeader from '../../../components/BaseHeader/BaseHeader';
import BaseSearch from '../../../components/BaseSearch/BaseSearch';
import BaseButton from '../../../components/BaseButton/BaseButton';
import { GlobalContext } from '../../../contexts/globalContext';
import ButtonSettings from '../../../components/ButtonSettings/ButtonSettings';
import Loading from '../../../components/Loading/Loading';

function RentsList() {
  const {
    rents,
    handlerEdit,
    handlerDelete,
    handlerShow,
    handlerSearch,
    showDeleteConfirm,
    closeDeleteConfirm,
    deleteRent,
    pages,
    currentItens,
    currentPage,
    setCurrentPage,
    itensPerPage,
    setItensPerPage,
    loadingTitle,
    ordinationId,
    isActiveId,
    isAscending,
    ordinationUser,
    isActiveUser,
    ordinationBook,
    isActiveBook,
    ordinationRentalDate,
    isActiveRentalDate,
    ordinationForecastDate,
    isActiveForecastDate,
    ordinationDevolutionDate,
    isActiveDevolutionDate
  } = useContext(RentsContext);

  const { tableTheme } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itensPerPage]);

  return (
    <div className="users-list">
      <Row>
        <Col>
          <BaseHeader title="Aluguéis" />
        </Col>
        <Col className="d-flex justify-content-end align-items-center actions">
          <ButtonSettings />
          <BaseSearch change={handlerSearch} />
          <BaseButton title="Adicionar Aluguél" click={handlerShow} />
        </Col>
      </Row>
      {rents.length ? (
        <div>
          <table className={`${tableTheme} table shadow-sm mt-4`}>
            <thead className="thead-rents">
              <tr>
                <th onClick={ordinationId} className="th-start" scope="col">
                  <div className="d-flex ">
                    <span>Cód.</span>
                    {!isActiveId ? (
                      <span className="material-symbols-outlined icon-sync">sync_alt</span>
                    ) : (
                      <span className={`material-symbols-outlined icon-arrow ${!isAscending ? 'rotate-icon' : null}`}>
                        north
                      </span>
                    )}
                  </div>
                </th>
                <th onClick={ordinationUser} scope="col">
                  <div className="d-flex">
                    <span>Usuário</span>
                    {!isActiveUser ? (
                      <span className="material-symbols-outlined icon-sync">sync_alt</span>
                    ) : (
                      <span className={`material-symbols-outlined icon-arrow ${!isAscending ? 'rotate-icon' : null}`}>
                        north
                      </span>
                    )}
                  </div>
                </th>
                <th onClick={ordinationBook} scope="col">
                  <div className="d-flex">
                    <span>Livro</span>
                    {!isActiveBook ? (
                      <span className="material-symbols-outlined icon-sync">sync_alt</span>
                    ) : (
                      <span className={`material-symbols-outlined icon-arrow ${!isAscending ? 'rotate-icon' : null}`}>
                        north
                      </span>
                    )}
                  </div>
                </th>
                <th onClick={ordinationRentalDate} scope="col">
                  <div className="d-flex">
                    <span>Data de Aluguél</span>
                    {!isActiveRentalDate ? (
                      <span className="material-symbols-outlined icon-sync">sync_alt</span>
                    ) : (
                      <span className={`material-symbols-outlined icon-arrow ${!isAscending ? 'rotate-icon' : null}`}>
                        north
                      </span>
                    )}
                  </div>
                </th>
                <th onClick={ordinationForecastDate} scope="col">
                  <div className="d-flex">
                    <span>Data de Previsão</span>
                    {!isActiveForecastDate ? (
                      <span className="material-symbols-outlined icon-sync">sync_alt</span>
                    ) : (
                      <span className={`material-symbols-outlined icon-arrow ${!isAscending ? 'rotate-icon' : null}`}>
                        north
                      </span>
                    )}
                  </div>
                </th>
                <th onClick={ordinationDevolutionDate} scope="col">
                  <div className="d-flex">
                    <span>Data de Devolução</span>
                    {!isActiveDevolutionDate ? (
                      <span className="material-symbols-outlined icon-sync">sync_alt</span>
                    ) : (
                      <span className={`material-symbols-outlined icon-arrow ${!isAscending ? 'rotate-icon' : null}`}>
                        north
                      </span>
                    )}
                  </div>
                </th>
                <th scope="col">
                  <div className="d-flex">
                    <span>Status</span>
                  </div>
                </th>
                <th className="th-end" scope="col">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItens?.map((rent) => (
                <tr className="items-tr" key={rent.id}>
                  <td>{rent.id}</td>
                  <td>{rent.usuario_id.nome}</td>
                  <td>{rent.livro_id.nome}</td>
                  <td>{rent.data_aluguel}</td>
                  <td>{rent.data_previsao}</td>
                  <td>{rent.data_devolucao}</td>
                  <td>
                    {rent.data_devolucao === null ? (
                      <p className="chip-not-returned">Não devolvido</p>
                    ) : rent.data_previsao <= rent.data_devolucao ? (
                      <p className="chip-on-time">No Prazo</p>
                    ) : (
                      <p className="chip-overdue">Em atraso</p>
                    )}
                  </td>
                  <td>
                    <span
                      //   onClick={() => handlerEdit(rent.id, rent.usuario.id, rent.livro.id, rent.data_aluguel, rent.data_previsao, rent.data_devolucao)}
                      className="material-symbols-outlined btn-action"
                      title="Editar">
                      edit
                    </span>
                    <span
                      //   onClick={() => handlerDelete(rent.id, rent.usuario.id, rent.livro.id, rent.data_aluguel, rent.data_previsao, rent.data_devolucao)}
                      className="material-symbols-outlined btn-action"
                      title="Deletar">
                      delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            pages={pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itensPerPage={itensPerPage}
            setItensPerPage={setItensPerPage}
          />
        </div>
      ) : (
        <Loading loadingTitle={loadingTitle} />
      )}
      <DeleteConfirmModal
        show={showDeleteConfirm}
        onHide={closeDeleteConfirm}
        message="Tem certeza que deseja deletar este usuário?"
        clickCancel={closeDeleteConfirm}
        clickConfirm={deleteRent}
      />
    </div>
  );
}

export default RentsList;
