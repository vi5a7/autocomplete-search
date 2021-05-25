import './App.css';
import './custom.css'
import axios from 'axios'
import {useState, useEffect} from 'react'

function App() {
  const [users, setUsers] = useState([])
  const [text, setText] = useState('')
  const [suggestions, setSuggestions] = useState([])
  useEffect(() => {
    const loadUsers = async() => {
      const response = await axios.get('https://reqres.in/api/users')
      setUsers(response.data.data)
    }
    loadUsers()
  }, [])

  const onChangeHandler = (text) => {
    let matches =[]
    if(text.length>0){
      matches = users.filter(user => {
        const regex = new RegExp(`${text}`, 'gi')
        return user.email.match(regex)
      })
    }
    setSuggestions(matches)
    setText(text)
  } 

  const onSuggestHandler = (text) => {
    setText(text)
    setSuggestions([])
  }

  return (
    <div className="App">
      <input 
        type='text'
        className="col-md-12 input" 
        onChange={e => onChangeHandler(e.target.value)} 
        value={text}
        style={{marginTop: 10}}
        onBlur={() => {
          setTimeout(() => {
            setSuggestions([])
          }, 100);
        }}
      />
      {suggestions && suggestions.map((suggestion, i) => 
        <div 
          key={i} 
          onClick={() => onSuggestHandler(suggestion.email)}
          className='suggestion col-md-12 justify-content-md-center'>{suggestion.email}</div>
      )}
    </div>
  );
}

export default App;
