import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import InputGroup from '../components/InputGroup'

function Details() {

  const [form, setForm] = useState({});
  const { id } = useParams();
  const navigate = useNavigate()
  const [errors, setErrors] = useState({});

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.put(`/api/users/${id}`, form)
      .then(res => {
        navigate('/')
      })
      .catch(err => setErrors(err.response.data))

  }

  useEffect(async () => {
    await axios.get(`/api/users/${id}`).then((res) => {
      setForm(res.data);
    });
  }, []);
  return (
    <div className="container mt-4 col-12 col-lg-4">
      <form onSubmit={onSubmitHandler}>
        <InputGroup
          label="Email"
          type="text"
          name="Email"
          onChangeHandler={onChangeHandler}
          errors={errors.Email}
          value={form.Email}
        />
        <InputGroup
          label="Name"
          type="text"
          name="Name"
          onChangeHandler={onChangeHandler}
          errors={errors.Name}
          value={form.Name}
        />
        <InputGroup
          label="DOB"
          type="date"
          name="DOB"
          onChangeHandler={onChangeHandler}
          errors={errors.DOB}
          value={form.DOB}
        />
        <button className="btn btn-primary" type="submit">Add user</button>
      </form>
    </div>
  )
}

export default Details