import React, { useState } from "react";
import noteContext from "./noteContext";
import { json } from "react-router-dom";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const initialNotes = [];
  const [notes, setNote] = useState(initialNotes);


  //Get all Notes
  const getNotes = async()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`,{
                method:"GET",
                headers:{
                        'Content-Type':"application/json",
                        'auth-token':localStorage.getItem('token')
                },
        }); 
        const json = await response.json();
        console.log(json)
        setNote(json)
  }
  //Add a note
  const addNote = async (title,description,tag)=>{
        //console.log(title,description,tag)
        const response = await fetch(`${host}/api/notes/addnote`,{
                method:"POST",
                headers:{
                        'Content-Type':"application/json",
                        'auth-token':localStorage.getItem('token')
                },
                body:JSON.stringify({title,description,tag})        
        });
        //console.log(title,description,tag)
        console.log("Adding a new note")
        const note = await response.json();
        setNote([...notes, note]);
        //setNote(notes.concat(note))
        //console.log("You Are Getting Error...")
        //const json = await response.json();
        //console.log(json)
        
        
  }
  //Delete a note 
  const deleteNote = async (id)=>{
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
                method:"DELETE",
                headers:{
                        'Content-Type':"application/json",
                        'auth-token':localStorage.getItem('token')
                },
        });
        const json = response.json
        console.log(json)
        console.log("Deleting the note with id " + id)
        const newNote = notes.filter((note)=>{return note._id!==id})
        setNote(newNote)
  }
  //Edit a Note
  const editNote = async (id,title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
                method:"PUT",
                headers:{
                        'Content-Type':"application/json",
                        'auth-token':localStorage.getItem('token')
                },
                body:JSON.stringify({title,description,tag})
        });
        const json = await response.json();

        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
                const element = newNotes[index];
                if (element._id === id) {
                        newNotes[index].title = title;
                        newNotes[index].description = description;
                        newNotes[index].tag = tag
                        break;        
                }
                
        }
        setNote(newNotes);
  }
  return (
    <noteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
