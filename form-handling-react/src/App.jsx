import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/formikForm";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <RegistrationForm />
      <hr />
      <FormikForm />
    </div>
  );
}

export default App