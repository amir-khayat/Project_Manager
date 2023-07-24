import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/product/${id}`)
            .then((res) => {
                console.log(res);
                setProduct(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/product/delete/${id}`)
            .then(() => {
                console.log('Product deleted successfully');
                navigate('/');
                
            })
            .catch((err) => console.log(err));
    };

    if (Object.keys(product).length === 0) {
        return <div><h1 className="my-4">Product Details</h1> Please go back and click again :/</div>;
    }

    return (
        <div className="container-fluid">
            <h1 className="my-4">Product Details</h1>
            <table className="table table-hover">
                <tbody>
                    <tr>
                        <td>Title:</td>
                        <td>{product.title}</td>
                    </tr>
                    <tr>
                        <td>Price:</td>
                        <td>{product.price}</td>
                    </tr>
                    <tr>
                        <td>Description:</td>
                        <td>{product.description}</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button className="btn btn-danger me-2" onClick={handleDelete}>Delete</button>
                <Link to={`/products/update/${product._id}`} className="btn btn-warning">Update</Link>
            </div>
        </div>
    );
};

export default ProductDetails;