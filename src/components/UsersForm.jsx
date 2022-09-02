import React, { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const defaultValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  birthday: "",
};

const UsersForm = ({ createUser, getAllUsers, updateUser, setUpdateUser }) => {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (updateUser) {
      reset(updateUser);
    }
  }, [updateUser]);

  const submit = (data) => {
    const form = document.querySelector(".aside__form");
    if (updateUser) {
      const URL = `https://users-crud1.herokuapp.com/users/${updateUser.id}/`;

      axios
        .patch(URL, data)
        .then((res) => {
          getAllUsers();
          reset(defaultValues);
          setUpdateInfo();
        })
        .catch((err) => console.log(err));
      setUpdateUser();
      form.style.display = "none";
    } else {
      createUser(data);
      reset(defaultValues);
      form.style.display = "none";
    }
  };

  return (
    <aside className="aside__form">
      <h2 className="aside__title">New User</h2>
      <form className="form" onSubmit={handleSubmit(submit)}>
        <label htmlFor="first_name">First name: </label>
        <input
          {...register("first_name")}
          className="form__input"
          type="text"
          placeholder="First name"
          id="first_name"
          required
        />
        <label htmlFor="last_name">Last name: </label>
        <input
          {...register("last_name")}
          className="form__input"
          type="text"
          placeholder="Last name"
          id="last_name"
          required
        />
        <label htmlFor="email">Email: </label>
        <input
          {...register("email")}
          className="form__input"
          type="email"
          placeholder="Email"
          id="email"
          required
        />
        <label htmlFor="password">Password: </label>
        <input
          {...register("password")}
          className="form__input"
          type="password"
          placeholder="Password"
          id="password"
          required
        />
        <label htmlFor="birthday">Birthday: </label>
        <input
          {...register("birthday")}
          className="form__birthday"
          type="date"
          id="birthday"
          min="1960-01-01"
          max="2020-01-01"
          required
        />
        <button className="form__btn">
          {updateUser ? "Update user" : "Create user"}
        </button>
      </form>
      <footer>
        <h5 className="footer">Miguel Muñiz | Academlo</h5>
      </footer>
    </aside>
  );
};

export default UsersForm;
