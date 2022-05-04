import './BaseSearch.css';

function BaseSearch({ change }) {
  return (
    <div className="base-search">
      <div className="input-group">
        <div className="input-group-text">
          <span className="material-symbols-outlined">search</span>
        </div>
        <input type="text" className="input" placeholder="Pesquisar" onChange={change} />
      </div>
    </div>
  );
}

export default BaseSearch;
