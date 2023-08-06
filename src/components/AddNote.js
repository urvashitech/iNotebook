import React, { useContext, useState } from 'react';
import noteContext from '../components/context/notes/noteContext';

function AddNote() {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: '', description: '', tag: '' });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    console.log(note.title, note.description, note.tag);
    setNote({ title: '', description: '', tag: '' });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className='container my-4'>
        <h3>Add a Note</h3>
        <form className='my-4'>
          <div className='mb-3'>
            <label htmlFor='title' className='form-label'>
              Title
            </label>
            <input
              type='text'
              className='form-control'
              id='title'
              name='title'
              value={note.title}
              minLength='5'
              required
              onChange={onChange}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='description' className='form-label'>
              Description
            </label>
            <input
              type='text'
              className='form-control'
              id='description'
              name='description'
              value={note.description}
              minLength='5'
              required
              onChange={onChange}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='tag' className='form-label'>
              Tag
            </label>
            <input
              type='text'
              className='form-control'
              id='tag'
              name='tag'
              value={note.tag}
              minLength='5'
              required
              onChange={onChange}
            />
          </div>
          <button type='submit' className='btn btn-primary' onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNote;


