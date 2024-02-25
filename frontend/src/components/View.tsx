import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams,useNavigate} from 'react-router-dom';

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

const View = () => {
    const { id } = useParams();
    const [user, setUser] = useState<User>({ id: 0, name: '', email: '', password: '' });
    const navigate=useNavigate();

    useEffect(() => {
        fetchUser();
    }, [id]);

    const fetchUser = async () => {
        try {
            const response = await axios.get<User>(`http://127.0.0.1:5000/userdetails/${id}`);
            setUser(response.data);
        } catch (err) {
            console.log("Something went wrong");
        }
    };

    const clickToBackHandler=()=>{
        navigate('/');
    }

    return (
        <div>
            <div className='row'>
                <div className='col-md-12'>
                    <h1>User Details</h1>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>S No.</th>
                                <th>Full Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='container d-flex justify-content-center'>
                <div><button className='btn btn-primary' onClick={clickToBackHandler}>Back To Home</button></div>
            </div>
        </div>
    );
};

export default View;
