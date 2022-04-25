import './UsersList.css';
import React, { useEffect, useState } from 'react';
import api from '../../../services/api.js';

function UsersList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api.get('usuarios').then(({ data }) => {
      setUsers(data);
    });

    console.log(users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="users-list mt-4">
      {users.length ? (
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
            {users?.map((user) => (
              <tr className="items-tr" key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome}</td>
                <td>{user.endereco}</td>
                <td>{user.cidade}</td>
                <td>{user.email}</td>
                <td>
                  <span className="material-symbols-outlined btn-action" title="Editar">
                    edit
                  </span>
                  <span className="material-symbols-outlined btn-action" title="Deletar">
                    delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    </div>
  );
}

export default UsersList;
