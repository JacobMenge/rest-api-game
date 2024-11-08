import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // Wir verwenden useState um die Liste der Gegenstände zu verwalten
  // items speichert unsere Gegenstände und setItems aktualisiert diese Liste
  const [items, setItems] = useState([]);
  // name und type sind die Eingaben für einen neuen Gegenstand
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  // useEffect wird aufgerufen sobald die Komponente zum ersten Mal gerendert wird
  // Hier rufen wir die Liste der Gegenstände von der API ab
  useEffect(() => {
    axios.get('http://localhost:4000/items')
      .then(response => {
        // Wenn die Anfrage erfolgreich ist speichern wir die Daten in items
        setItems(response.data);
      })
      .catch(error => {
        // Falls ein Fehler auftritt geben wir ihn in der Konsole aus
        console.error('Fehler beim Abrufen der Gegenstände', error);
      });
  }, []); // [] bedeutet dass dieser Effekt nur einmal ausgeführt wird

  // Funktion zum Hinzufügen eines neuen Gegenstands
  const addItem = () => {
    // Wir senden eine POST-Anfrage an die API mit name und type aus den Eingaben
    axios.post('http://localhost:4000/items', { name, type })
      .then(response => {
        // Wenn die Anfrage erfolgreich ist fügen wir den neuen Gegenstand zur Liste hinzu
        setItems([...items, response.data]);
        // Danach setzen wir die Eingabefelder zurück damit sie leer sind
        setName('');
        setType('');
      })
      .catch(error => {
        // Falls ein Fehler auftritt geben wir ihn in der Konsole aus
        console.error('Fehler beim Hinzufügen des Gegenstands', error);
      });
  };

  return (
    <div>
      <h1>REST-API-Spiel</h1>
      {/* Eingabefeld für den Namen des Gegenstands */}
      <input
        type="text"
        placeholder="Name des Gegenstands"
        value={name}
        // onChange aktualisiert den State name sobald sich das Eingabefeld ändert
        onChange={(e) => setName(e.target.value)}
      />
      {/* Eingabefeld für die Art des Gegenstands */}
      <input
        type="text"
        placeholder="Art des Gegenstands"
        value={type}
        // onChange aktualisiert den State type sobald sich das Eingabefeld ändert
        onChange={(e) => setType(e.target.value)}
      />
      {/* Button um den neuen Gegenstand hinzuzufügen */}
      <button onClick={addItem}>Hinzufügen</button>

      <ul>
        {/* Wir durchlaufen die Liste der Gegenstände und zeigen jeden einzeln an */}
        {items.map(item => (
          <li key={item.id}>
            {/* item.name ist der Name des Gegenstands und item.power ist seine Stärke */}
            {item.name} - Stärke: {item.power}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
