import {Component} from 'react'
import UserForm from '../UserForm'
import './index.css'

class UserList extends Component {
  state = {
    userDetails: [],
    title: '',
    completed: true,
    userInputTilte: '',
    editForm: false,
    isLoding: true,
  }

  componentDidMount() {
    this.getData()
  }
  onChangeName = event => {
    this.setState({title: event.target.value})
  }

  getData = async () => {
    const url = 'https://jsonplaceholder.typicode.com/todos'
    const response = await fetch(url)
    const data = await response.json()
    this.setState({userDetails: data, isLoding: false})
  }

  onDeleteUserDetails = async id => {
    this.setState(prevState => ({
      userDetails: prevState.userDetails.filter(eachUser => eachUser.id !== id),
    }))
  }

  onAddUser = event => {
    event.preventDefault()
    const {title, completed} = this.state
    const url = 'https://jsonplaceholder.typicode.com/todos'
    const newUser = {
      id: Math.floor(Math.random() * 1000),
      title,
      completed,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    fetch(url, options)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
    this.setState(prevState => ({
      userDetails: [...prevState.userDetails, newUser],
    }))
  }

  editTitle = (e, id) => {
    this.setState(prevState => ({userInputTilte: e.target.value}))
  }

  onEditUserDetails = async id => {
    const {userDetails, userInputTilte} = this.state

    const updatedData = userDetails.map(eachUser => {
      if (eachUser.id === id) {
        return {...eachUser, title: userInputTilte}
      }
      return eachUser
    })
    this.setState({userDetails: updatedData})
  }
  render() {
    const {userDetails, userInputTilte, editForm, isLoding} = this.state
    console.log(userDetails)

    return (
      <div className="user-container">
        {isLoding && <h1 className="loding">Fetching Data...</h1>}
        {!isLoding && (
          <>
            <form onSubmit={this.onAddUser} className="user-add-form-container">
              <h1 className="new-add-user">Add New User </h1>
              <input
                type="text"
                placeholder="Name"
                id="nameId"
                onChange={this.onChangeName}
                className="intut-box"
              />
              <button type="submit" className="add-button">
                Add User
              </button>
            </form>
            <ul className="user-list-container">
              {userDetails.map(eachUser => (
                <UserForm
                  key={eachUser.id}
                  userDetails={eachUser}
                  onDeleteUserDetails={this.onDeleteUserDetails}
                  onEditUserDetails={this.onEditUserDetails}
                  editTitle={this.editTitle}
                  userInputTilte={userInputTilte}
                  editForm={editForm}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }
}
export default UserList
