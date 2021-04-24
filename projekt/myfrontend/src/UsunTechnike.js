import React from 'react';
import axios from 'axios';

const UsunTechnike = (props) => {

    const submit = (event) => {
        axios.delete(`http://localhost:8090/techniki/kasuj/${props.id}`)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    return (
        <>
            <form>
                <input type='submit' value='Usuń' onClick={submit} />
            </form>
        </>
    );

}

export default UsunTechnike;