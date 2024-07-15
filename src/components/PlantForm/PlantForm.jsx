import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const PlantForm = () => {
    const dispatch = useDispatch();

    let [name, setName] = useState('');
    let [kingdom, setKingdom] = useState('');
    let [clade, setClade] = useState('');
    let [order, setOrder] = useState('');
    let [family, setFamily] = useState('');
    let [subfamily, setSubfamily] = useState('');
    let [genus, setGenus] = useState('');

    const addNewPlant = event => {
        event.preventDefault();
        dispatch({ type: 'SEND_PLANTS', payload: { name, kingdom, clade, order, family, subfamily, genus } });
        //Clear out input fields
        setName('');
        setKingdom('');
        setClade('');
        setOrder('');
        setFamily('');
        setSubfamily('');
        setGenus('');
    }
    return (
        <div>
            <h3>This is the form</h3>
            <form onSubmit={addNewPlant}>
                <label>
                    Name
                    <input type='text' value={name} onChange={(event) => setName(event.target.value)} required />
                </label>

                <label>
                    Kingdom
                    <input type='text' value={kingdom} onChange={(event) => setKingdom(event.target.value)} />
                </label>

                <label>
                    Clade
                    <input type='text' value={clade} onChange={(event) => setClade(event.target.value)} />
                </label>

                <label>
                    Order
                    <input type='text' value={order} onChange={(event) => setOrder(event.target.value)} />
                </label>

                <label>
                    Family
                    <input type='text' value={family} onChange={(event) => setFamily(event.target.value)} />
                </label>

                <label>
                    Subfamily
                    <input type='text' value={subfamily} onChange={(event) => setSubfamily(event.target.value)} />
                </label>

                <label>
                    Genus
                    <input type='text' value={genus} onChange={(event) => setGenus(event.target.value)} />
                </label>

                <input type='submit' value='Add New Plant' />

            </form>
        </div>
    );
}


export default PlantForm;