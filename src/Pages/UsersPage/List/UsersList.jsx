import './UsersList.css';
import React, { useContext, useEffect } from 'react';
import { UsersContext } from '../../../contexts/usersContext';
import DeleteConfirmModal from '../../../components/BaseDeleteConfirmModal/DeleteConfirmModal';
import Pagination from '../../../components/Pagination/Pagination';

function UsersList() {
  const {
    users,
    handlerEdit,
    handlerDelete,
    showDeleteConfirm,
    closeDeleteConfirm,
    deleteUser,
    pages,
    currentItens,
    currentPage,
    setCurrentPage,
    itensPerPage,
    setItensPerPage
  } = useContext(UsersContext);

  useEffect(() => {
    setCurrentPage(0);
  }, [itensPerPage]);

  return (
    <div className="users-list mt-4">
      {users.length ? (
        <div>
          <table className="table shadow-sm">
            <thead>
              <tr>
                <th className="th-start" scope="col">
                  Cód.
                </th>
                <th scope="col">Nome</th>
                <th scope="col">Endereço</th>
                <th scope="col">Cidade</th>
                <th scope="col">Email</th>
                <th className="th-end" scope="col">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItens?.map((user) => (
                <tr className="items-tr" key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.nome}</td>
                  <td>{user.endereco}</td>
                  <td>{user.cidade}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      onClick={() => handlerEdit(user.id, user.nome, user.endereco, user.cidade, user.email)}
                      className="material-symbols-outlined btn-action"
                      title="Editar">
                      edit
                    </span>
                    <span
                      onClick={() => handlerDelete(user.id, user.nome, user.endereco, user.cidade, user.email)}
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
        <div className="loading">
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
      <DeleteConfirmModal
        show={showDeleteConfirm}
        onHide={closeDeleteConfirm}
        message="Tem certeza que deseja deletar este usuário?"
        clickCancel={closeDeleteConfirm}
        clickConfirm={deleteUser}
      />
    </div>
  );
}

export default UsersList;
