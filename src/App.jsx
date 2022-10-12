import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Loading from "./components/Loading";
import UsersForm from "./components/UsersForm";
import UsersList from "./components/UsersList";

function App() {
  const [users, setUsers] = useState();
  const [updateUser, setUpdateUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const URL = "https://users-crud1.herokuapp.com/users/";

    axios
      .get(URL)
      .then((res) => {
        setUsers(res.data);
        loadingTimeout();
      })
      .catch((err) => console.log(err));
  }, []);

  let intervalLoading;

  const loadingTimeout = () => {
    intervalLoading = window.setTimeout(changeLoading, 1300);
  };

  const changeLoading = () => {
    setIsLoading(false);
    intervalLoading = window.clearTimeout();
  };

  const getAllUsers = () => {
    const URL = "https://users-crud1.herokuapp.com/users/";

    axios
      .get(URL)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };

  const createUser = (data) => {
    const URL = "https://users-crud1.herokuapp.com/users/";

    axios
      .post(URL, data)
      .then((res) => getAllUsers())
      .catch((err) => console.log(err));
  };

  const formSlide = () => {
    const sidebar = document.querySelector(".aside__form").classList;
    sidebar.toggle("active");

    // const form = document.querySelector(".aside__form");
    // if (form.style.display === "flex") {
    //   form.style.display = "none";
    // } else {
    //   form.style.display = "flex";
    // }
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <section className="App">
        <article className="App__cards">
          <h1 className="App__title">CRUD | Usuarios</h1>
          <button onClick={formSlide} className="App__btn">
            + Create new user
          </button>
          <div className="App__container">
            {users?.map((user) => (
              <UsersList
                key={user.id}
                user={user}
                getAllUsers={getAllUsers}
                setUpdateUser={setUpdateUser}
              />
            ))}
          </div>
        </article>
        <UsersForm
          createUser={createUser}
          getAllUsers={getAllUsers}
          setUpdateUser={setUpdateUser}
          updateUser={updateUser}
        />
      </section>
    );
  }
}
export default App;
