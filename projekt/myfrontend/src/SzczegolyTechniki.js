import React, {useState, useEffect} from "react"; // importuje hooki
import axios from 'axios'; // Komunikacja z endpointami w mybackendzie

const SzczegolyTechniki = (props) => { // function SzczegolyTechniki(props) {}

    const [technika, setTechnika] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8090/techniki/${props.id}`)
            .then(response => setTechnika(response.data))
            .catch(error => console.log(error));
    }, [props.id]);


    return (
        <div className="box">
            <h2>Technika</h2>
            <h5>Numer id: {props.id}</h5>
            <h4>Nazwa: {technika.nazwa}</h4>
            <h4>Rodzaj: {technika.rodzaj}</h4>
            <h4>Ilość kolorów: {technika.ilosc_kolorow}</h4>
            <h4>Przykład: {technika.przyklad_dziela}</h4>
        </div>
    );

}

export default SzczegolyTechniki;
