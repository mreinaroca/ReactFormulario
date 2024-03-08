import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';

function App() {
  // Logic states
  const [formValues, setFormValues] = useState({email:"", password:"", favClass:"1"});
  const [validationStates, setValidationStates] = useState({ emailState:true, password: true });
  // React states
  const [email, setEmail] = React.useState("form-control");
  const {password, setPassword} = React.useState("form-control");

  const handleEmailChange = ((e) => {
    setFormValues({...formValues, email: e.target.value});
    let isValid = validateEmail(e.target.value);
    setValidationStates({...validationStates, emailState: isValid});
    setEmail(isValid ? "form-control" : "form-control is-invalid");
  });

  const handlePasswordChange = ((e) => {
    setFormValues({...formValues, password:e.target.value});
    let isValid = validatePassword(e.target.value);
    setValidationStates({...validationStates, passwordState: validatePassword(isValid)});
    setPassword(isValid ? "form-control" : "form-control is-invalid");
  })

  const handleSelectChange = ((e) => {
    setFormValues({...formValues, favClass: e.target.value});
  })

  const validateEmail = (email) => {
    return email.includes('@') && email.includes('.') && email.length > 5;
  }

  const validatePassword = (password) => {
    return password.length >=9 && password.match(/[0-9]/) && password.match(/[a-zA-Z]/);
  }

  const validateForm = () => {
    return validationStates.emailState && validationStates.passwordState;
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
          <Form.Control type="email" className={email} placeholder="Enter email" onChange={handleEmailChange} value={formValues.email}/>
          { !validationStates.emailState && <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}/>
          { !validationStates.passwordState && <Form.Text className="text-muted">Your password should have numbers and letters and should be at least 9 characters long</Form.Text>}
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
