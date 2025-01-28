import {Component} from 'react'
import UserForm from '../UserForm'
import ErrorBoundry from '../ErrorBoundry'
import './index.css'

const apiStattus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  proces: 'PROCES',
  fail: 'FAIL',
}

class UserList extends Component {
  state = {
    userDetails: [],
    title: '',
    completed: true,
    userInputTilte: '',
    editForm: false,
    apiStattusIs: apiStattus.initial,
    errorMsg: false,
    errorMsgForAddUser: false,
  }

  componentDidMount() {
    this.getData()
  }

  onChangeName = event => {
    this.setState({title: event.target.value})
  }

  getData = async () => {
    this.setState({apiStattusIs: apiStattus.proces})
    const url = 'https://jsonplaceholder.typicode.com/todos'
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
      this.setState({userDetails: data, apiStattusIs: apiStattus.success})
    } else {
      this.setState({apiStattusIs: apiStattus.fail})
    }
  }

  onDeleteUserDetails = async id => {
    this.setState(prevState => ({
      userDetails: prevState.userDetails.filter(eachUser => eachUser.id !== id),
    }))
  }

  onAddUser = event => {
    event.preventDefault()
    const {title, completed, errorMsgForAddUser} = this.state
    console.log(errorMsgForAddUser)
    if (title === '') {
      this.setState({errorMsgForAddUser: true})
    } else {
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
        title: '',
        errorMsgForAddUser: false,
      }))
    }
  }

  editTitle = (e, id) => {
    this.setState({userInputTilte: e.target.value})
  }

  onEditUserDetails = async id => {
    const {userDetails, userInputTilte} = this.state
    if (userInputTilte === '') {
      this.setState({errorMsg: true})
    } else {
      const updatedData = userDetails.map(eachUser => {
        if (eachUser.id === id) {
          return {...eachUser, title: userInputTilte}
        }
        return eachUser
      })
      this.setState({userDetails: updatedData, errorMsg: false})
    }
  }

  onSuccessApi = () => {
    const {
      userDetails,
      userInputTilte,
      editForm,
      title,
      errorMsg,
      errorMsgForAddUser,
    } = this.state
    return (
      <div className="user-container">
        <form onSubmit={this.onAddUser} className="user-add-form-container">
          <h1 className="new-add-user">Add New User </h1>

          <input
            type="text"
            placeholder="Enter Title"
            id="nameId"
            onChange={this.onChangeName}
            className="intut-box"
            value={title}
          />
          <button type="submit" className="add-button">
            Add User
          </button>
          {errorMsgForAddUser && (
            <p className="error-msg">Please Enter Title*</p>
          )}
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
              errorMsg={errorMsg}
            />
          ))}
        </ul>
      </div>
    )
  }

  onFailApi = () => <ErrorBoundry />

  onApiProcess = () => <h1 className="loding">Fetching Data...</h1>

  showApiRender = () => {
    const {apiStattusIs} = this.state
    switch (apiStattusIs) {
      case apiStattus.success:
        return this.onSuccessApi()
      case apiStattus.proces:
        return this.onApiProcess()
      case apiStattus.fail:
        return this.onFailApi()
      default:
        return null
    }
  }

  render() {
    return <>{this.showApiRender()}</>
  }
}
export default UserList
