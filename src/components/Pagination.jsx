
const Pagination = ({quantyPages, page, setPage}) => {

    return (
        <div className='getPages'>
            <div className="btn__pages">{ page > 1 && <i onClick={() => setPage(page - 1)}  className='bx bx-chevrons-left bx-flip-vertical'></i>}</div>
            <p className="page">{page} de {quantyPages}</p>
            <div className="btn__pages">{ page < quantyPages && <i onClick={() => setPage(page + 1)} className='bx bx-chevrons-right bx-flip-vertical'></i>}</div>
        </div>
    );
};

export default Pagination
