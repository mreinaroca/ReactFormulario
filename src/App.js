import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';

function App() {
  // Logic states
  const [formValues, setFormValues] = useState({email:"", password:"", favClass:"1"});
  const validationStates = {emailState: true, passwordState: true};
  const [validatedForm, setValidatedForm] = useState({emailState: true, passwordState: true});
  // React states
  const [email, setEmail] = React.useState("form-control");
  const [password, setPasswordChange] = React.useState("form-control");

  const handleEmailChange = ((e) => {
    setFormValues({...formValues, email: e.target.value});
    console.log(e.target.value);
    console.log(validatedForm.emailState);
  });


  const handlePasswordChange = ((e) => {
    setFormValues({...formValues, password:e.target.value});
    console.log(e.target.value);
  })

  const handleSelectChange = ((e) => {
    setFormValues({...formValues, favClass: e.target.value});
  })


  
  const validateEmail = () => {
    let email = formValues.email;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    let isValid = emailRegex.test(email);
    validationStates.emailState = isValid;
    setEmail(isValid ? "form-control" : "form-control is-invalid");
    setValidatedForm({...validatedForm, emailState: isValid});
    return isValid;
  }

  const validatePassword = () => {
    let password = formValues.password;
    let isValid = password.length >=9 && password.match(/[0-9]/) && password.match(/[a-zA-Z]/);
    validationStates.passwordState = isValid;
    setPasswordChange(isValid ? "form-control" : "form-control is-invalid")
    setValidatedForm({...validatedForm, passwordState: isValid});
    return isValid;
  }

  const validateForm = () => {
    return validationStates.emailState && 
      validationStates.passwordState &&
      formValues.email.length > 0 &&
      formValues.password.length > 0;
  }
  
  const showEmailAsOk = () => {
    setValidatedForm({...validatedForm, emailState: true});
    setEmail("form-control");
  }

  const showPasswordAsOk = () => {
    setValidatedForm({...validatedForm, passwordState: true});
    setPasswordChange("form-control");
  }

  const clickSubmit= (() => {
    if(validateForm()){
      alert("Formulario OK. Datos: "+JSON.stringify(formValues));
    } else {
      alert("Formulario con errores. Por favor revise los datos ingresados");
    }
  })

  return (
    <div>
      <h1>Ejemplo de formularios!</h1>
      <Form>

        <Form.Group className="mb-6" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            className={email} // cambio de color
            placeholder="Enter email" 
            onChange={handleEmailChange} 
            onFocus={showEmailAsOk}
            onBlur={validateEmail}
            value={formValues.email}
          />
          { 
            !validatedForm.emailState && 
            <Form.Text className="text-danger">
              Your email should contain at least one "@" and "." have no spaces and at least 3 characters long
            </Form.Text>
          }


        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            className={password} //cambio de color
            placeholder="Password" 
            onChange={handlePasswordChange} 
            onFocus={showPasswordAsOk}
            onBlur={validatePassword}
            value={formValues.password}
          />
          { 
            !validatedForm.passwordState && 
            <Form.Text className="text-danger">
              Your password should have numbers and letters and should be at least 9 characters long
            </Form.Text>
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckBox"/>
          <Form.Label>Favorite Class</Form.Label>
          <Form.Select onChange={handleSelectChange}>
            <option value="1">ISIS3710</option>
            <option value="2">Programación con tecnologías web</option>
          </Form.Select>
        <Form.Group/>
        
        <Button variant="primary" onClick={clickSubmit}>
          Submit
        </Button>

      </Form>
    </div>
  );
}



export default App;
