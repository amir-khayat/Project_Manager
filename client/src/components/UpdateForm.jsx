import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateForm = () => {
    const [updateFormData, setUpdateFormData] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setUpdateFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/product/update/${id}`, updateFormData)
            .then((res) =>{
                console.log(res);
                setUpdateFormData({});
                navigate('/');
            })
            .catch((err) => console.log(err));
        console.log('Form submitted');
    };

    useEffect(() => {
        console.log('Form loaded');
        axios
            .get(`http://localhost:8000/api/product/${id}`)
            .then((res) => {
                console.log(res);
                setUpdateFormData(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="my-4">Form</h1>
            <form onSubmit={submitHandler}>

                <input type="hidden" id="_id" name="_id" className="form-control" value={updateFormData._id} onChange={changeHandler} />

                <div className="form-group mt-3">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" className="form-control" value={updateFormData.title} onChange={changeHandler} />
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" name="price" className="form-control" value={updateFormData.price} onChange={changeHandler} />
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" className="form-control" value={updateFormData.description} onChange={changeHandler} />
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                    Update
                </button>
            </form>
        </div>
    );
};

export default UpdateForm;