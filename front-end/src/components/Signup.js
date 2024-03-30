import { useState } from "react"

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
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <span>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" onChange={handleChange}/>
            </span>
            <span>
            <label htmlFor="email">Email:</label>
                <input type="email" name="email" onChange={handleChange}/>
            </span>
            <span>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" autoCompletet="true" onChange={handleChange}/>
            </span>
            <input type="submit" value="Sign Up"/>
        </form>
    </div>
  )
}

export default Signup