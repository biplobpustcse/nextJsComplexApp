import { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import Layout from '../components/Layout';
import React, { useEffect,useState } from "react"; 


const Signup = (props) =>{
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         name: '',
    //         email_or_phone: '',
    //         password: '',
    //         passowrd_confirmation: 0,
    //         register_by: ''
    //     }
    // }

    // handleChange = e => {
    //     if(e.target.name.toString()=="passowrd_confirmation"){
    //         console.log("pass",e.target.name)
    //     }
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     })
    // }

    // handleSubmit(event) {
    //     event.preventDefault();
    //     this.props.register({
    //         name: this.state.name,
    //         email_or_phone: this.state.email_or_phone,
    //         password: this.state.password,
    //         passowrd_confirmation: this.state.passowrd_confirmation,
    //     }, 'signup');
    // }
    const [inputValues, setInputValue] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    const [validation, setValidation] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    
    
  
    //handle submit updates
    function handleChange(event) {
      const { name, value } = event.target;
      setInputValue({ ...inputValues, [name]: value });

      checkValidation();
    }
    
    const checkValidation = () => {
        let errors = validation;
    
        //first Name validation
        if (inputValues.name.length==0) {
          errors.name = "First name is required";
        } else {
          errors.name = "";
        }
        
        // email validation
        const emailCond =
          "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/";
        if (!inputValues.email.trim()) {
          errors.email = "Email is required";
        } else {
            console.log('email',inputValues.email)
          errors.email = "";
        }
    
        //password validation
        // const cond1 = "/^(?=.*[a-z]).{6,20}$/";
        // const cond2 = "/^(?=.*[A-Z]).{6,20}$/";
        // const cond3 = "/^(?=.*[0-9]).{6,20}$/";
        const password = inputValues.password;
        if (!password) {
          errors.password = "password is required";
        } else if (password.length < 6) {
          errors.password = "Password must be longer than 6 characters";
        } else if (password.length >= 20) {
          errors.password = "Password must shorter than 20 characters";
        }
        //  else if (!password.match(cond1)) {
        //   errors.password = "Password must contain at least one lowercase";
        // } else if (!password.match(cond2)) {
        //   errors.password = "Password must contain at least one capital letter";
        // } else if (!password.match(cond3)) {
        //   errors.password = "Password must contain at least a number";
        // } 
        else {
          errors.password = "";
        }
    
        //matchPassword validation
        if (!inputValues.confirmPassword) {
          errors.confirmPassword = "Password confirmation is required";
        } else if (inputValues.confirmPassword !== inputValues.password) {
            
          errors.confirmPassword = "Password does not match confirmation password";
          console.log(inputValues.confirmPassword,inputValues.password)
        } else {
            console.log('dd',inputValues.confirmPassword,inputValues.password)
          errors.confirmPassword = "";
        }
    
        setValidation(errors);
      };
      // useEffect(() => {
      //   checkValidation()
        
      // }, [checkValidation,inputValues]);
    
      const handleSubmit = (e) => {
        e.preventDefault();
      };
    
    
        return (
            <Layout title = "Sign Up">
                <h2>Sign Up</h2>
                <form
                    id="registrationForm"
                    action="/"
                    method="POST"
                    onSubmit={handleSubmit}
                    className="container"
                >
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Name"
                            name="name"
                            id='name'
                            onChange={(e) => handleChange(e)}
                            value={inputValues.name}
                            // value={this.state.name}
                            // onChange={this.handleChange}
                        />
                        { Object.keys(validation.name).length>0 && <p>{validation.name}</p>}
                    </div>
                    
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="email"
                            placeholder="Email or Phone"
                            id='email'
                            name='email'
                            onChange={(e) => handleChange(e)}
                            value={inputValues.email}
                        />
                         {validation.email && <p>{validation.email}</p>}
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="password"
                            id='password'
                            name='password'
                            onChange={(e) => handleChange(e)}
                            value={inputValues.password}
                        />
                        {validation.password && <p>{validation.password}</p>}
                    </div>
                    {/* <div className="form-group">
                        <select 
                            className="form-control"
                            required
                            name="gender"
                            onChange={this.handleChange}
                            value={this.state.gender}
                        >
                            <option value="0">Male</option>
                            <option value="1">Female</option>
                            <option value="2">Transgender</option>
                            <option value="3">Transsexual</option>
                            <option value="4">Rather Not To say</option>
                            <option value="5">Other</option>
                        </select>
                    </div> */}
                    
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            id='confirmPassword'

                            name='confirmPassword'
                            onChange={(e) => handleChange(e)}
                            value={inputValues.confirmPassword}
                        />
                         {validation.confirmPassword && <p>{validation.confirmPassword}</p>}
                    </div>
                    
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Sign Up
                        </button>
                    </div>
                </form>
            </Layout>
        )
}
Signup.getInitialProps = function(ctx) {
    initialize(ctx);
};
export default connect(state => state, actions)(Signup);