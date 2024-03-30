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

            </span>
            <span>
                
            </span>
        </form>
    </div>
  )
}

export default Signup