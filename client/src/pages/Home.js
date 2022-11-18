import React, { useEffect, useState } from "react";
import InputGroup from "../components/InputGroup";
import RowDetails from "../components/RowDetails";
import axios from "axios";
import Alert from "../components/Alert";


function Home() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.post('/api/users', form)
      .then(res => {
        setMessage(res.data.message)
        /* hide form after save */
        setForm({})
        /* hide errors after save */
        setErrors({})
        setShow(true)
        setTimeout(() => {
          setShow(false)
        }, 4000);
      })
      .catch(err => setErrors(err.response.data))

  }

  /* delete */
  const OnDelete = (id__) => {
    if (window.confirm("are you sure to delete this user")) {

      axios.delete(`/api/users/${id__}`)
        .then(res => {
          setMessage(res.data.message)
          setShow(true)
          setTimeout(() => {
            setShow(false)
          }, 4000);
        })
    }
  }
  /* find all users */
  useEffect(async () => {
    await axios.get("/api/users").then((res) => {
      setUsers(res.data);
    });
  });
  return (
    <div className="row p-4">
      <Alert message={message} show={show} />
      <div className="mt-4">
        <h2>Users Management</h2>
      </div>
      <div className="col-12 col-lg-4">
        <form onSubmit={onSubmitHandler}>
          <InputGroup
            label="Email"
            type="text"
            name="Email"
            onChangeHandler={onChangeHandler}
            errors={errors.Email}
          />
          <InputGroup
            label="Name"
            type="text"
            name="Name"
            onChangeHandler={onChangeHandler}
            errors={errors.Name}
          />
          <InputGroup
            label="DOB"
            type="date"
            name="DOB"
            onChangeHandler={onChangeHandler}
            errors={errors.DOB}
          />
          <button className="btn btn-primary" type="submit">Add user</button>
        </form>
      </div>
      <div className="col-12 col-lg-7">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Name</th>
              <th scope="col">DOB</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ Email, Name, DOB, _id }) => (
              <RowDetails
                Email={Email}
                Name={Name}
                DOB={DOB}
                Id={_id}
                OnDelete={OnDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
