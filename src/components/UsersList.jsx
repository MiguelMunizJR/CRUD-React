import React from "react";
import axios from "axios";

const UsersList = ({ user, getAllUsers, setUpdateUser }) => {
  const deleteUser = (ID) => {
    const URL = `https://users-crud1.herokuapp.com/users/${ID}/`;
    axios
      .delete(URL)
      .then((res) => getAllUsers())
      .catch((err) => console.log(err));
  };

  const updateUser = () => {
    const form = document.querySelector(".aside__form");
    form.style.display = "flex";
    setUpdateUser(user);
  };

  return (
    <article className="card">
      <div className="card__container">
        <h2 className="card__name">
          {user["first_name"]} {user["last_name"]}
        </h2>
        <ul className="card__list">
          <li className="card__email">
            <i class="fa-solid fa-envelope"></i>
            Email: <br />
            <span>{user.email}</span>
          </li>
          <li className="card__birthday">
            <i class="fa-solid fa-cake-candles"></i>
            Birthday: <br />
            <span>{user.birthday}</span>
          </li>
        </ul>
        <div className="card__btns">
          <button
            className="card__btn delete"
            onClick={() => deleteUser(user.id)}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
          <button className="card__btn update" onClick={updateUser}>
            <i className="fa-solid fa-pencil"></i>
          </button>
        </div>
      </div>
    </article>
  );
};

export default UsersList;
