import './BaseSearch.css'

function BaseSearch() {
    return(
        <div className="base-search">
            <label className="visually-hidden">Username</label>
            <div className="input-group">
                <div className="input-group-text">
                    <span className="material-symbols-outlined">search</span>
                </div>
                <input type="text" className="input" placeholder="Pesquisar"/>
            </div>
        </div>
    )
}

export default BaseSearch;