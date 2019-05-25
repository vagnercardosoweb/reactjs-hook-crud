import React from "react";
import PropTypes from "prop-types";

function List({ users, loadCurrentUser, handleRemoveUser }) {
  return (
    <table className="table table-striped table-bordered">
      <thead className="thead-dark">
        <tr>
          <th>Name</th>
          <th>E-mail</th>
          <th>Status</th>
          <th>-</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map(user => (
            <tr
              key={user.id}
              className={user.status === "offline" ? "table-danger" : ""}
              style={{ cursor: "pointer" }}
            >
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td
                className={
                  user.status === "offline" ? "text-danger" : "text-success"
                }
              >
                {user.status}
              </td>
              <td>
                <button
                  className="btn btn-primary btn-sm mr-2"
                  onClick={() => loadCurrentUser(user)}
                >
                  Editar
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveUser(user)}
                >
                  Remover
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No result.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

List.propTypes = {
  users: PropTypes.array.isRequired,
  loadCurrentUser: PropTypes.func.isRequired,
  handleRemoveUser: PropTypes.func.isRequired
};

export default List;
