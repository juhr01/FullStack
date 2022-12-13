import { useState, useEffect } from 'react'
import AddPerson from './components/AddPerson'
import FilterPersons from './components/FilterPersons'
import Persons from './components/Persons'
import axios from 'axios'
import Server from './services/personDB'
import personDB from './services/personDB'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
      Server
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }

    if (
      persons.filter(p => p.name === person.name).length > 0
      )
       {
      window.alert(`${newName} is already added to the phonebook`)
    } else {
      Server
      .addNumber(person)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleDeletePerson = (name, id) => {
    return () => {
      if(window.confirm(`Delete ${name} ?`)) {
        Server
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setNewName('')
          setNewFilter('')
        })
        .catch(error => {
          setPersons(persons.filter(p => p.name !== name))
          window.alert(`User ${name} is not on the server`)
        })

      }
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <br />
      <AddPerson addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <br />
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} handleDeletePerson={handleDeletePerson}/>
      <br/>
      <FilterPersons newFilter={newFilter} handleFilterChange={handleFilterChange} />
    </div>
  )

}

export default App