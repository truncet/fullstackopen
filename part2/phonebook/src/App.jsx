import { useState, useEffect } from 'react'
import personService from './services/person'

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

const Persons = ({personToShow, deleteChange}) => {
  return (    
      personToShow.map(person => <p key={person.name}> {person.name} {person.number} <button value={person.name} onClick={deleteChange}>Delete</button></p> )
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [showAll, setShowVal] = useState(true);


useEffect(() => {
  personService.getAll().then (response => setPersons(response))
}, [])

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
  
  const getPersonByname = (name) => {
    return persons.find(person => person.name == name);

  }

  const deletePersons = (event) => {
    var name = event.target.value;
    var person = getPersonByname(name);
    console.log(person);
    if (person){
      if(confirm(`Do you want to delete ${person.name}`)){
        personService.deleteEntries(person.id).then(response => {
          setPersons(persons.filter((person) => person.name != name))
        })
      }
    }
  }

  const addNewName = (event) => {
    event.preventDefault();
    var found = false;
    persons.map((person)=> {
      if (person.name === newName){
        if(confirm(`${person.name} is already in phonebook. Do you want to replace their old number with new one?`)){
          let updatedPerson = {
            name: person.name,
            number: newPhone,
            id: person.id
          }
          personService.update(person.id, updatedPerson).then(
            response => {
              setPersons(persons.map(existingPerson => updatedPerson.id != existingPerson.id ? existingPerson: updatedPerson))
            }
          )
        }
        found = true
      }

    })
    if (found) return;
    let new_id = persons.length + 1;
    const person = {
      name: newName,
      number: newPhone,
      id: new_id
    }
    
    personService.create(person).then(response => {
      setPersons(persons.concat(person));
      setNewName('');
      setNewPhone('');
    })

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchValue={searchValue} handleChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm addNewName={addNewName} newName={newName} newPhone={newPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} />
      <h2>Numbers</h2>
      <Persons personToShow={personToShow} deleteChange={deletePersons}/>
    </div>
  )
}

export default App