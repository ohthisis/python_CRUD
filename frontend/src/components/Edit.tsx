import axios from 'axios';
import React, { ChangeEvent, useState } from 'react';
import { useParams,useNavigate} from 'react-router-dom';

const Edit = () => {
    const { id } = useParams();
    const navigate=useNavigate();

    const toBackHandler=()=>{
        navigate('/');
    }
    const [userField, setUserField] = useState({
        name: '',
        email: '',
        password: '',
    });

    const changeUserFieldhandler = (e: ChangeEvent<HTMLInputElement>) => { 
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
    };
    // const changeUserFieldhandler = (e: ChangeEvent<HTMLInputElement>) => { 
    //     const { name, value } = e.target;
    //     setUserField(prevState => ({
    //         ...prevState,
    //         [name]: name === 'password' ? value : value // Update password field separately
    //     }));
    // };
    
    const onSubmitChange= async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        try{
            await axios.put('http://127.0.0.1:5000/userupdate/'+id,userField)
        }catch(err){
            console.log("Something Wrong")
        }
    }
    
    return (
        <div className='container'>
            <h1>Edit Form</h1>
            <form>
                <div className="mb-3 mt-3">
                    <label className="form-label">ID</label>
                    <input type="text" className="form-control" id="id" name='id' value={id} disabled />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" placeholder="Enter your Full Name" name="name" onChange={changeUserFieldhandler} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter your Email" name="email" onChange={changeUserFieldhandler} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter your password" name="password" onChange={changeUserFieldhandler} />
                </div>
                <button type="submit" className="btn btn-primary mr-3" onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onSubmitChange(e)}>Update</button>
            </form>
            <div className='container d-flex justify-content-center mt-3'>
                <div>
                    <button className='btn btn-primary' onClick={toBackHandler}>Back To Home</button>
                </div>
            </div>
        </div>
    )
}
export default Edit;
