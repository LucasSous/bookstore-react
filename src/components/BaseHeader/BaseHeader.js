import './BaseHeader.css'

function BaseHeader({title}) {
    return(
        <div className='base-header'>
            <h1>{title}</h1>
        </div>
    )
}

export default BaseHeader;