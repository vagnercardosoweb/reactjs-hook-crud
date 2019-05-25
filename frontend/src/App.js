import React, { useState, useEffect } from "react";

import Form from "./components/Form";
import List from "./components/List";

import UserService from "./services/UserService";

function App() {
  const [currentUser, setCurrentUser] = useState(UserService.columns());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  function loadUsers() {
    UserService.getUsers().then(users => setUsers(users));
  }

  function handleSaveUser(user) {
    UserService.saveUser(user).then(() => loadUsers());
  }

  function handleRemoveUser(user) {
    let confirmRemove = window.confirm(
      `Deseja realmente remover o usuário ${user.name}?`
    );

    if (confirmRemove === true) {
      UserService.removeUser(user).then(() => loadUsers());
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center display-3 mt-2">ReactJS Hooks Crud</h1>
        </div>
      </div>
      <hr />

      <div className="row">
        <div className="col-md-6">
          <Form currentUser={currentUser} handleSaveUser={handleSaveUser} />
        </div>

        <div className="col-md-6">
          <List
            users={users}
            loadCurrentUser={setCurrentUser}
            handleRemoveUser={handleRemoveUser}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
