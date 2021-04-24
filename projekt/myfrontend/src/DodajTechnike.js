import React, {useState} from 'react';
import axios from 'axios';

const DodajTechnike = (props) => {

    const [nazwa, setNazwa] = useState("");
    const [rodzaj, setRodzaj] = useState("");
    const [ilosc_kolorow, setIlosc_kolorow] = useState("");
    const [przyklad_dziela, setPrzyklad_dziela] = useState("");

    const submit = (event) => {
        
        axios.post('http://localhost:8090/techniki/dodaj', {
            nazwa: nazwa,
            rodzaj: rodzaj,
            ilosc_kolorow: ilosc_kolorow,
            przyklad_dziela: przyklad_dziela
        })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        });

    };


    return (
        <div className="box">
            <h2>Dodaj technikę</h2>
            <form>
                <input type='text' placeholder='Nazwa' value={nazwa} onChange={event => setNazwa(event.target.value)} /><br/>
                <input type='text' placeholder='Rodzaj' value={rodzaj} onChange={event => setRodzaj(event.target.value)} /><br/>
                <input type='text' placeholder='Ilosc kolorów' value={ilosc_kolorow} onChange={event => setIlosc_kolorow(event.target.value)} /><br/>
                <input type='text' placeholder='Przykład dzieła' value={przyklad_dziela} onChange={event => setPrzyklad_dziela(event.target.value)} /><br/>

                <input type='submit' value='Dodaj technikę' onClick={submit} />
            </form>
        </div>
    );


};

export default DodajTechnike;