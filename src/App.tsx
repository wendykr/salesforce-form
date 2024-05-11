import './App.scss'
import { Form } from './components/Form/Form'

function App() {

  return (
    <div className="container">
      <img className="logo" src="/logo-salesforce.svg" />
      <h1 className="title">Change Your Password</h1>
      <Form />
    </div>
  )
}

export default App
