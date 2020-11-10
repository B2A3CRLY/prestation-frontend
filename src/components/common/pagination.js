import React from 'react'
import '../../custom.css';
const Pagination = ({ clientsPerPage, totalClients, paginate }) => {
    const pageNumbers = [];
    for (let i = 1; i<= Math.ceil(totalClients / clientsPerPage); i++){ 
        pageNumbers.push(i);
    }
    
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={()=>paginate(number)} href role="button" className="page-link text-primary touch">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination
