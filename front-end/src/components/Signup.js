import { useState } from "react"
import { Button } from "react-bulma-components"


const Signup = (props) => {
    const [form, setForm] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        props.handleSignUp(form)
    }
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

  return (
    <div className="form-container">
        <div className="login-heading">
        <h1>Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username"/>
                <input type="text" name="username" placeholder="Username" onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="email"/>
                <input type="email" name="email" placeholder="Email" onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="password"/>
                <input type="password" name="password" autoComplete="true" placeholder="Password" onChange={handleChange}/>
            </div>
            <Button type="submit" className="popup-button" value="Login">Submit</Button>
        </form>
    </div>
  )
}

export default Signup