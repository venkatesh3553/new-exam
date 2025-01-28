import './index.css'

const UserForm = props => {
  const {
    userDetails,
    onDeleteUserDetails,
    onEditUserDetails,
    editTitle,
    errorMsg,
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
  const showInpuAndButton = () =>
    completed ? (
      <>
        <p className="edhit-pera">Edit This </p>
        <input
          type="text"
          onChange={onChangeTitle}
          defaultValue={title}
          className="edit-input"
          placeholder="Edit the title"
        />
        <button onClick={onEditUser} className="edit-button">
          Edit
        </button>
        {errorMsg && (
          <p className="error-msg">
            Please edit the title after update this title*
          </p>
        )}
      </>
    ) : null
  return (
    <>
      <li className="user-form-container">
        <h1 className="user-form-title">{title}</h1>
        <button onClick={onDeleteUser} className="delete-button">
          Delete
        </button>
        {showInpuAndButton()}
      </li>
    </>
  )
}
export default UserForm
