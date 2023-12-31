import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from "../components/context/notes/noteContext";
import Noteitems from './Noteitems';
import AddNote from './AddNote';
import { useNavigate } from "react-router-dom";
function Notes(props) {
  const context = useContext(noteContext);
  let  navigate = useNavigate()
  const { notes, getNotes,editNote } = context;
  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    }
    else{
      navigate("/login")
    }
    
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id:currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const ref = useRef(null);
  const refClose = useRef(null);
  const handleClick = (e) => {
      console.log("Updating the note...",note)
      editNote(note.id,note.etitle,note.edescription,note.etag);
      refClose.current.click();
      e.preventDefault();
      props.showAlert("Updated Suceesfully","success");
    // addNote(note.etitle, note.edescription, note.etag);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-4">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={note.etitle}
                    onChange={onChange}
                    minLength={5} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose}type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h3>Your Notes</h3>
        <div className='container mx-2'>
            {notes.length ===0 && "No notes to display"}

        </div>
        {notes.map((note) => (
          <Noteitems key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
        ))}
      </div>
    </>
  )
}

export default Notes;



