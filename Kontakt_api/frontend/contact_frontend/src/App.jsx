import './App.css'
import { useState, useEffect } from 'react';
import axios from "axios"

function App() {
  const[contacts, setContacts] = useState([])
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get("/api/contacts");
        console.log(res)
        setContacts(res.data);
      } catch (err) {
        console.error("res funktioniert nicht", err);
      }
    };
    fetchContacts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const firstName = e.target.elements.firstName.value;
    const lastName = e.target.elements.lastName.value;
    const phone = e.target.elements.phone.value;
    try {
      const res = await axios.post("/api/contacts", { firstName, lastName, phone });
      console.log(res.data);
      setContacts([...contacts, res.data]);
      e.target.reset();
    } catch (err) {
      setErrors(err.res.data.errors);
    }
  };

  const deleteContact = async (postId) => {
    try {
        const { data } = await axios.delete(`/api/contacts/${postId}`)
        console.log(data)
        // setRefresh(prev => !prev)
    } catch (err) {
        console.log(err)
    }
}

  // const deleteContact = async (id) => {
  //   try {
  //     axios.delete(`/api/contacts/${id}`);
  //     setContacts((prevContacts) =>
  //       prevContacts.filter((contact) => contact.id !== id)
  //     );
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  // console.log(contacts);

  // const updateContactHandle = async (id, firstName, lastName, phone) => {
  //   try {
  //     await axios.put(`/api/contacts/${id}`, { firstName, lastName, phone });
  //     const updateContact = contacts.map((contact) => {
  //       if (contact.id === id) {
  //         return {
  //           ...firstName,
  //           lastName,
  //           phone,
  //         };
  //       }
  //       return contact;
  //     });
  //     setContacts(updateContact);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <section>
      {/* <CreatePostForm setRefresh={setRefresh} /> */}
        <h1>Kontakt API</h1>

        <article className="contacts-form">
          <h2>Kontakt hinzufügen:</h2>
          <form onSubmit={handleSubmit}>
            <label>Vorname:</label>
            <input type="text" id="firstName" />
            <label>Nachname:</label>
            <input type="text" id="lastName" />
            <label>Telefon:</label>
            <input type="text" id="phone" />
            <small>{errors?.name?.message}</small>
            <br />
            <button type="submit">Erstellen</button>
          </form>
        </article>

        <article className="contacts-gallery-container">
          <h2>Deine Kontakte:</h2>

          <article className="contacts-gallery">
            {contacts?.map(contact=> {
              console.log(contact)
              return (
                <div key={contact._id} className="contact">
                  <h3>Vorname:</h3>
                  <p>{contact.firstName}</p>
                  <h3>Nachname:</h3>
                  <p>{contact.lastName}</p>
                  <h3>Telefon:</h3>
                  <p>{contact.phone}</p>
                  {/* <button onClick={() => updateContactHandle(contact.id)}>Ändern</button> */}
                  <button onClick={() => deleteContact(contact._id)}>Löschen</button>
                </div>
              );
            })}
          </article>

        </article>

      </section>
  )
}

export default App
