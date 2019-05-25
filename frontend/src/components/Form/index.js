import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import UserService from "../../services/UserService";

function Form({ currentUser, handleSaveUser }) {
  const [newUser, setNewUser] = useState({ ...currentUser });
  const [alert, setAlert] = useState({ type: "", message: "" });

  useEffect(() => {
    setNewUser({ ...currentUser });
  }, [currentUser]);

  function _handleInputChange({ target }) {
    setNewUser({ ...newUser, [target.name]: target.value });
  }

  function _handleSaveUser(event) {
    event.preventDefault();

    try {
      if (!newUser.name || !newUser.email || !newUser.status) {
        throw new Error("Preencha todos os dados corretamente.");
      }

      handleSaveUser(newUser);
      setNewUser({ ...UserService.columns() });
      setAlert({
        type: "success",
        message: `Usuário ${
          newUser.id ? "atualizado" : "adicionado"
        } com sucesso.`
      });
    } catch (e) {
      setAlert({ type: "danger", message: e.message });
    }
  }

  return (
    <form onSubmit={_handleSaveUser}>
      <div className="form-group row">
        <label className="col-md-2 col-form-label" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-control col-md-10"
          value={newUser.name}
          onChange={_handleInputChange}
        />
      </div>

      <div className="form-group row">
        <label className="col-md-2 col-form-label" htmlFor="email">
          E-mail
        </label>
        <input
          type="text"
          name="email"
          id="email"
          className="form-control col-md-10"
          value={newUser.email}
          onChange={_handleInputChange}
        />
      </div>

      <div className="form-group row">
        <label className="col-md-2 col-form-label" htmlFor="name">
          Status
        </label>
        <select
          name="status"
          id="status"
          className="form-control col-md-10"
          value={newUser.status}
          onChange={_handleInputChange}
        >
          <option>Selecione</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </div>

      {alert.message && (
        <div className={`alert alert-${alert.type}`}>{alert.message}</div>
      )}

      <button className="btn btn-success">
        {newUser.id ? "Atualizar" : "Adicionar"}
      </button>
    </form>
  );
}

Form.propTypes = {
  currentUser: PropTypes.object.isRequired,
  handleSaveUser: PropTypes.func.isRequired
};

export default Form;
