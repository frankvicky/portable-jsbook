import './cell-list.css';
import { Fragment, useEffect } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';
import { useActions } from '../hooks/use-actions';
import { saveCells } from '../state/action-creators';


const CellList: React.FC = () => {
    const cells = useTypedSelector(({ cells: { order, data }}) => order.map((id) => data[id]));
    const { fetchCells } = useActions();

    useEffect(() => {
        fetchCells();
    }, []);

    const renderCells = cells.map((cell) => (
        <Fragment key={ cell.id }>
            <CellListItem key={ cell.id } cell={ cell } />
            <AddCell previousCellId={ cell.id } />
        </Fragment>
    ));

    return (
        <div className='cell-list'>
            <AddCell forceVisible={ cells.length === 0 } previousCellId={null} />
            { renderCells }
        </div>
    );
};

export default CellList;