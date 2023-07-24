import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Form = (props) => {

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
    });

    const [errors, setErrors] = useState({});
    

    const { products, setProducts } = props;

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/product/create', formData)
            .then((res) =>{
                console.log(res);
                setProducts([...products, res.data]);
                setFormData({
                    title: '',
                    price: '',
                    description: '',
                });
            })
            .catch((err) =>{
                console.log(err);
                console.log("There was an error")
                setErrors(err.response.data.errors);
            } 
            );
        console.log('Form submitted');
    };

    useEffect(() => {
        console.log('Form loaded');
        axios
            .get('http://localhost:8000/api/product')
            .then((res) => {
                console.log(res);
                setProducts(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="my-4">Form</h1>
            <form onSubmit={submitHandler}>
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

                <button type="submit" className="btn btn-primary mt-3">
                    Create
                </button>
            </form>
            <br />
            <h2>All Products</h2>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>
                                <Link to={`/products/${product._id}`}>
                                    {product.title}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Form;