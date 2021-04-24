import './App.css';
import {useState} from "react";
import ListaTechnik from './ListaTechnik.js';
import SzczegolyTechniki from './SzczegolyTechniki';
import DodajTechnike from './DodajTechnike';
import AktualizujTechnike from './AktualizujTechnike';

function App() {

  const [id, setId] = useState(0);
  const [idAktualizacja, setIdAktualizacja] = useState([]);

  const WyswietlSzczegolyTechniki = (props) => {
    return <SzczegolyTechniki id={props.id} />
  }

  const WyswietlAktualizacjeTechniki = (props) => {
    return <AktualizujTechnike id={props.id} />
  }

  return (
    <div className="bigbox">
      <h1>Aplikacja frontendowa - Zofia Tabaczyńska</h1>
      <ListaTechnik changeParentHandlerId={setId} changeParentHandlerAktualizacja={setIdAktualizacja}/>
      <WyswietlSzczegolyTechniki id={id} />
      <DodajTechnike />
      <WyswietlAktualizacjeTechniki id={idAktualizacja} />
      
    </div>
  );

}

export default App;