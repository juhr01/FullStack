import { useState } from 'react'

const Person = (props) => {
  return (
    <p>{props.name}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName
    }

    setPersons(persons.concat(person))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
      <br />
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <Person key={person.name} name={person.name} />
        )}
      </div>
    </div>
  )

}

export default App