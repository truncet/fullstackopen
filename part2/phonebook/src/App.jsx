import { useState, useEffect } from 'react'
import './index.css'
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

const Notification = ({ message, className }) => {
  if (message === null) {
    return null
  }

    return (
      <div className={className}>
        {message}
      </div>
    )
  // }


}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [showAll, setShowVal] = useState(true);
  const [errorMessage, setErrorMessage] = useState('')
  const [className, setClassName] = useState('')


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
          setErrorMessage(
            `${person.name} already deleted from server`
            )        
            setTimeout(() => {          
              setErrorMessage(null)        
            }, 5000)
          setClassName('success');
        })
        .catch(err => {
          setErrorMessage(
            `Could not delete ${person.name} from server`
            )        
            setTimeout(() => {          
              setErrorMessage(null)        
            }, 5000)
          setClassName('error');
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
              setErrorMessage(
                `${person.name}'s number updated in server`
                )        
                setTimeout(() => {          
                  setErrorMessage(null)        
                }, 5000)
              setClassName('success');
            }
          ).catch(err => {
            setErrorMessage(
              err.response.data.error
              )        
              setTimeout(() => {          
                setErrorMessage(null)        
              }, 5000)
            setClassName('error');
          })
        }
        found = true
      }

    })
    if (found) return;
    const maxId = persons.reduce((max, person) => {
      return person.id > max ? person.id : max;
    }, 0);
    
    let new_id = maxId + 1;
    const person = {
      name: newName,
      number: newPhone,
      id: new_id
    }
    
    personService.create(person).then(response => {
      setPersons(persons.concat(person));
      setNewName('');
      setNewPhone('');
      setErrorMessage(
        `${person.name} added to server`
        )        
        setTimeout(() => {          
          setErrorMessage(null)        
        }, 5000)
      setClassName('success');
    }).catch(err => {
      setErrorMessage(
        err.response.data.error
        ) 
        setTimeout(() => {          
          setErrorMessage(null)        
        }, 5000)
        setClassName('error');
    })

  }

  return (
    <div>
      
      <h2>Phonebook</h2>
      <Notification message={errorMessage} className={className}/>
      <Filter searchValue={searchValue} handleChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm addNewName={addNewName} newName={newName} newPhone={newPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} />
      <h2>Numbers</h2>
      <Persons personToShow={personToShow} deleteChange={deletePersons}/>
    </div>
  )
}

export default App