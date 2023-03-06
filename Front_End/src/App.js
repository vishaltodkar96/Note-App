import React, { useEffect, useState } from "react";
import axios from 'axios';
import Header from "./components/Header";
import Note from "./components/Note";
import Footer from "./components/Footer";
import { IoIosAdd } from "react-icons/io";
import './App.css';


function App() {
    const [notes, setNotes] = useState([]);

    const [isExpanded, setExpanded] = useState(false);

    const [note, setNote] = useState({
        title: "",
        content: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setNote((preValue) => {
            return {
                ...preValue,
                [name]: value,
            };
        });
    }

    function handleExpanded() {
        setExpanded(true);
    }

    function submitButton(event) {

        event.preventDefault();

        axios.post("http://baatcheet.online/api/insert", { note_title: note.title, note_content: note.content, }).then(() => {
            setNotes([...notes, { note_title: note.title, note_content: note.content, }])
        })

        setNote({
            title: "",
            content: "",
        });

        setExpanded(false);
    }

    function deleteNotes(id) {
        axios.delete(`http://baatcheet.online/api/delete/${id}`).then((response) =>{
            setNotes(notes.filter((val) =>{
                return val.id !== id;
            }))
        })
    }

    useEffect(() => {

        axios.get("http://baatcheet.online/api/get").then((response) => {
            setNotes(response.data)
        })
    }, [notes])

    return (
        <div className="App">
            <Header />

            <div>
                <form>
                    {isExpanded && (
                        <input
                            value={note.title}
                            type="text"
                            placeholder="Title"
                            name="title"
                            onChange={handleChange}
                        />
                    )}
                    <p>
                        <textarea
                            value={note.content}
                            onClick={handleExpanded}
                            name="content"
                            placeholder="Take a note..."
                            onChange={handleChange}
                            rows={isExpanded ? 3 : 1}
                        ></textarea>
                    </p>
                    {isExpanded && <button onClick={submitButton}>
                        <IoIosAdd size={35} />
                    </button>}
                </form>
            </div>

            {notes.map((note, index) => (
                <Note
                    key={index}
                    id={note.id}
                    title={note.note_title}
                    content={note.note_content}
                    onDelete={deleteNotes}
                />
            ))}

            <Footer />
        </div>
    );
}

export default App;
