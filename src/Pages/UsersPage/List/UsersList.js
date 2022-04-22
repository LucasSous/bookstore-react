import './UsersList.css'

const users = [
    {
        id: 1,
        nome: 'Lucas',
        endereco: 'Rua A',
        cidade: 'Fortaleza',
        email: 'Lucas@gmail.com'
    },
    {
        id: 2,
        nome: 'Lucass',
        endereco: 'Rua A',
        cidade: 'Fortaleza',
        email: 'Lucas@gmail.com'
    },
    {
        id: 3,
        nome: 'Lucas Sousa',
        endereco: 'Rua A',
        cidade: 'Fortaleza',
        email: 'Lucas@gmail.com'
    }
]

function UsersList() {
    return(
        <div className='users-list mt-4 shadow-sm'>
            <table className="table ">
                <thead>
                    <tr>
                        <th scope="col">Cód.</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Endereço</th>
                        <th scope="col">Cidade</th>
                        <th scope="col">Email</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(item => (
                        <tr className='items-tr' key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
                            <td>{item.endereco}</td>
                            <td>{item.cidade}</td>
                            <td>{item.email}</td>
                            <td>
                                <span className="material-symbols-outlined btn-action" title="Editar">edit</span>
                                <span className="material-symbols-outlined btn-action" title='Deletar'>delete</span>
                            </td>
                        </tr>
                    )) }
                    
                </tbody>
            </table>
        </div>
    )
}

export default UsersList;