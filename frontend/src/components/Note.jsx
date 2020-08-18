import React  from 'react';

function Note(props){

    return (
        <div className="note">
            <h3>{props.noteTitle}</h3>
            <p>{props.noteContent}</p>
            <button onClick={()=>{
                props.onDelete(props.id);
            }}>Delete</button>
        </div>
    )
}

export default Note;