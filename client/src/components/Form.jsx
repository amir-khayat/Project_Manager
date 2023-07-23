import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
    });

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/product/create', formData)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        setFormData({
            title: '',
            price: '',
            description: '',
        });
        console.log('Form submitted');
    };

    return (
        <div className="container-fluid">
            <h1 className="my-4">Form</h1>
            <form onSubmit={submitHandler} method="POST">
                <div className="form-group mt-3">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" className="form-control" value={formData.title} onChange={changeHandler} />
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" name="price" className="form-control" value={formData.price} onChange={changeHandler} />
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" className="form-control" value={formData.description} onChange={changeHandler} />
                </div>

                <button type="submit" className="btn btn-primary mt-3">Create</button>
            </form>
        </div>
    );
};

export default Form;