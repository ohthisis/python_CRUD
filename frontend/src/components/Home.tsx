import { Button } from "react-bootstrap";
import { Form, FormGroup } from "react-bootstrap"; // Import Form and FormGroup from react-bootstrap

import List from "./List";

const Home = () => {
  return (
    <div className="container">
      <h2 className="w-100 d-flex justify-content-center p3">React Js python Flask REST API CRUD(create,Read,Update,Delete)| Axios Mysql</h2>
      <div className="row">
        <div className='col-md-4'>
          <h3>Add Your Detail</h3>
          <Form> {/* Use Form from react-bootstrap */}
            <div className="mb-3 mt-3">
              <label className="form-label">Full Name:</label>
              <input type="text" className="form-control" id="name" placeholder="Enter your Full name" name="name" />
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder="Enter your Email" name="email" />
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Password</label>
              <input type="text" className="form-control" id="password" placeholder="Enter your password" name="password" />
            </div>

            <Button type="submit" className="btn btn-primary">Add User</Button>
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
