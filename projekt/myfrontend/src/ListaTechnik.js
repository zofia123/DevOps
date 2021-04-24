import React, {useState, useEffect} from "react";
import axios from 'axios';
import UsunTechnike from './UsunTechnike';

const ListaTechnik = (props) => {

    const [techniki, setTechniki] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8090/techniki')
            .then(response => setTechniki(response.data))
            .catch(error => console.log(error));
    }, []);



    const przekazId = (event) => {
        props.changeParentHandlerId(event.target.name);
    }

    const przekazIdDoAktulizacji = (event) => {
        props.changeParentHandlerAktualizacja(event.target.name);
    }

    
    
    const Technika = (props) => {
        return (
            <>
                <tr>
                    <td>{props.technika.id}</td>
                    <td>{props.technika.nazwa}</td>
                    <td>{props.technika.rodzaj}</td>
                    <td>{props.technika.ilosc_kolorow}</td>
                    <td>{props.technika.przyklad_dziela}</td>
                    <td>
                        <button onClick={przekazId} name={props.technika.id}>Pokaż szczegóły</button>
                        <button onClick={przekazIdDoAktulizacji} name={props.technika.id}>Aktualizuj dane</button>
                        <UsunTechnike id={props.technika.id}/>
                    </td>
                </tr>
            </>
        );
    }

    
    return (
        <>
            <h2>Lista Technik</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nazwa</th>
                        <th>Rodzaj</th>
                        <th>Ilość kolorów</th>
                        <th>Przykład dzieła</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {techniki.map(technika => (<Technika technika={technika} key={technika.id}></Technika>))}
                </tbody>
            </table>
        </>
    );
}

export default ListaTechnik;