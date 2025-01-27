import './index.css'

const UserForm = props => {
  const {
    userDetails,
    onDeleteUserDetails,
    onEditUserDetails,
    editTitle,
    editForm,
  } = props
  const {title, id, completed} = userDetails
  const onDeleteUser = () => {
    onDeleteUserDetails(id)
  }
  const onEditUser = () => {
    onEditUserDetails(id)
  }
  const onChangeTitle = e => {
    editTitle(e, id)
  }
  const show = () =>
    completed ? (
      <>
        <input
          type="text"
          onChange={onChangeTitle}
          defaultValue={title}
          className="edit-input"
        />
        <button onClick={onEditUser} className="edit-button">
          Edit
        </button>
      </>
    ) : null
  return (
    <>
      <li className="user-form-container">
        <h1 className="user-form-title">{title}</h1>
        <button onClick={onDeleteUser} className="delete-button">
          Delete
        </button>
        {show()}
      </li>
    </>
  )
}
export default UserForm
