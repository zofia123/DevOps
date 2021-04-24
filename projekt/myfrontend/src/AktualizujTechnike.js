import React, {useState, useEffect} from 'react';
import axios from 'axios';

const AktualizujTechnike = (props) => {

    const [nazwa, setNazwa] = useState("");
    const [rodzaj, setRodzaj] = useState("");
    const [ilosc_kolorow, setIlosc_kolorow] = useState("");
    const [przyklad_dziela, setPrzyklad_dziela] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8090/techniki/${props.id}`)
            .then(response => {
                setNazwa(response.data.nazwa);
                setRodzaj(response.data.rodzaj);
                setIlosc_kolorow(response.data.ilosc_kolorow);
                setPrzyklad_dziela(response.data.przyklad_dziela);
            })
            .catch(error => console.log(error));
    }, [props.id]);

    const submit = (event) => {
        axios.put(`http://localhost:8090/techniki/aktualizuj/${props.id}`, {
            nazwa: nazwa,
            rodzaj: rodzaj,
            ilosc_kolorow: ilosc_kolorow,
            przyklad_dziela: przyklad_dziela
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
            
    }


    return (
        <div className="box">
            <h2>Aktualizuj technikę</h2>
            <h5>Numer id: {props.id}</h5>
            <form>
                <input type='text' placeholder='Nazwa' value={nazwa} onChange={event => setNazwa(event.target.value)} /><br/>
                <input type='text' placeholder='Rodzaj' value={rodzaj} onChange={event => setRodzaj(event.target.value)} /><br/>
                <input type='text' placeholder='Ilosc kolorów' value={ilosc_kolorow} onChange={event => setIlosc_kolorow(event.target.value)} /><br/>
                <input type='text' placeholder='Przykład dzieła' value={przyklad_dziela} onChange={event => setPrzyklad_dziela(event.target.value)} /><br/>

                <input type='submit' value='Aktualizuj technikę' onClick={submit} />
            </form>
        </div>
    );

}

export default AktualizujTechnike;