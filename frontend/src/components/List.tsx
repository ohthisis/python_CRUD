import React ,{ useEffect, useState } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
  }
const List=()=>{

    const [userData,setData]=useState<User[]>([]);
    useEffect(()=>{
        fetchData();
    },[])

    const fetchData=async()=>{
        try{
            const results=await axios("http://127.0.0.1:5000/users");
            setData(results.data)
        }catch(err){
            console.log("something wrong");
        }
    }

    const handleDelete=async(id:number)=>{
        console.log(id);
        await axios.delete('http://127.0.0.1:5000/userdelete/'+id)
        const newUserdata=userData.filter((item)=>{
            return(
                item.id!==id
            )
        });
        setData(newUserdata)
    }
    return(
        <div className="container">
            <h3>User Details</h3>
            <table className="table table-bordered">
            <thead>
                <tr>
                    <th>5 No</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    userData.map((user,i)=>{
                        return(
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>
                                    <NavLink to={`/view/${user.id}`} className="btn btn-success mx-2">View</NavLink>
                                    <NavLink to={`/edit/${user.id}`} className="btn btn-info mx-2">Edit</NavLink>
                                    <button onClick={() => handleDelete(user.id)} className='btn btn-danger'>Delete</button>
                                </td>
                                
                            </tr>
                        )
                    })
                }
            </tbody>
            </table>
        </div>
    )
}

export default List;