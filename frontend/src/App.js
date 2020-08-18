import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Note from './components/Note';


function App() {

  const [note,setNote] = useState({
    title: "",
    content: ""
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const [noteLists,setNoteLists] = useState([]);

  function handleGet() {
    fetch("/notes/")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setNoteLists(
            result
          );
          console.log(noteLists);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  function handleAdd(){
    const requestOptions = {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React POST Request Example', content: 'This is a content example' })
    };
    fetch('/notes/', requestOptions)
        .then(response => response)
        .then(data => {
          console.log(data);
          // this.setState({ postId: data.id })
        }
        );
  }

  function deleteNote(noteID){
    console.log(noteID);
    fetch("/notes/" + noteID, {method: 'DELETE'})
    .then(res => res)
    .then(
      (result => {
        setIsLoaded(true);
        setError(error);
      })
    )
  }

  return (
    <div className="App">
      <Header />
      <div className="buttons">
        <button className="getButton" onClick={handleGet}>Get notes</button>
        <button className="getButton" onClick={handleAdd}>Add note</button>
      </div>
      <div className="notes">
      {noteLists.map((note)=>{
        return(<Note key={note._id} id={note._id} onDelete={deleteNote} noteTitle = {note.title} noteContent = {note.content} />);
      })}
      </div>
    </div>
  );
}

export default App;
