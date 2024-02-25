import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap"; // Import Form and FormGroup from react-bootstrap

import List from "./List";
import { ChangeEvent, useState } from "react";
import axios from "axios";



const Home = () => {

  const [userField, setUserField] = useState({
    name: '',
    email: '',
    password: '',
  });

  const changeUserFieldHandler=(e:ChangeEvent<HTMLInputElement>)=>{
    setUserField({
      ...userField,
      [e.target.name]: e.target.value
  });
  console.log(userField);
  }
  const [loading,setLoading]=useState<boolean>(false)
  const onSubmitChange=async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault();
    try{
      const response = await axios.post(
        "http://127.0.0.1:5000/newuser",
        userField
      );
      console.log(response);
      setLoading(true);
    }catch(err){
        console.log("Something Wrong")
    }
  }
  if(loading){
    return <Home/>
  }
  return (
    <div className="container">
      <h2 className="w-100 d-flex justify-content-center p3">React Js python Flask REST API CRUD(create,Read,Update,Delete)| Axios Mysql</h2>
      <div className="row">
        <div className='col-md-4'>
          <h3>Add Your Detail</h3>
          <Form> {/* Use Form from react-bootstrap */}
            <div className="mb-3 mt-3">
              <label className="form-label">Full Name:</label>
              <input type="text" className="form-control" id="name" placeholder="Enter your Full name" name="name" onChange={(e)=>changeUserFieldHandler(e)} required/>
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder="Enter your Email" name="email" onChange={(e)=>changeUserFieldHandler(e)} required/>
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Enter your password" name="password" onChange={(e)=>changeUserFieldHandler(e)} required/>
            </div>

            <Button type="submit" className="btn btn-primary" onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onSubmitChange(e)}>Add User</Button>
          </Form>
        </div>
        <div className="col-md-8">
            <List/>
        </div>
      </div>
    </div>
  )
}

export default Home;
