import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function PlantList() {
    const dispatch = useDispatch();

    const plantList = useSelector(store => store.plantList);

    useEffect(() => {
        dispatch({ type: 'FETCH_PLANTS' });
    }, []);

    const removePlant = (id) => {
        console.log('deleting plant with id:', id);
        dispatch({ type: 'REMOVE_PLANTS', payload: id});
    }

    return (
        <div>
            <h3>This is the plant list</h3>
            <ul>
                {plantList.map(plant => <li key={plant.id}>{plant.name} <button type='button' onClick={() => removePlant(plant.id)}>❌</button></li>)}
            </ul>
        </div>
    );
}

export default PlantList;