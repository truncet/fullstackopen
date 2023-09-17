import { useState } from 'react'


const Filter = ({searchValue, handleChange}) => {
  return (
    <p>filter shown with a <input value={searchValue} onChange={handleChange}/></p>
  )
}

const PersonForm = ({addNewName, newName, newPhone, handleNameChange, handlePhoneChange}) => {
  return (
    <form onSubmit={addNewName}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        phone: <input value={newPhone} onChange={handlePhoneChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
  </form>
  )
}

const Persons = ({personToShow}) => {
  return (
        
      personToShow.map(person => <p key={person.name}> {person.name} {person.number}</p>)
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [showAll, setShowVal] = useState(true);

  const personToShow = showAll
  ? persons
  : persons.filter((person) => person.name.toLowerCase().includes(searchValue.toLowerCase()));

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  }
  const handleSearchChange = (event) => {
    var newFilter = event.target.value;
    setSearchValue(newFilter);
    setShowVal(newFilter === "")
  }

  const addNewName = (event) => {
    event.preventDefault();
    var found = false;
    persons.map((person)=> {
      if (person.name === newName){
        alert(`${newName} already exists in you contanct list`)
        found = true
      }

    })
    if (found) return;
    const person = {
      name: newName,
      number: newPhone
    }
    setPersons(persons.concat(person));
    setNewName('');
    setNewPhone('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchValue={searchValue} handleChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm addNewName={addNewName} newName={newName} newPhone={newPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} />
      <h2>Numbers</h2>
      <Persons personToShow={personToShow} />
    </div>
  )
}

export default App