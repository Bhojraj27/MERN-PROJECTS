import './signup.css';
import { useState } from 'react';
const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setcpassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, email, password, cpassword);

    }
  
    return (
        <div className='signup'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    className='inputField'
                    onSubmit={(e)=>setName(e.target.value)}
                    type="text"
                    placeholder="Enter Name"
                />
                <input className='inputField' onSubmit={(e)=>setEmail(e.target.value)}type="text" placeholder="Enter Email" />
                <input className='inputField' onSubmit={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter Password" />
                <input className='inputField' onSubmit={(e)=>setcpassword(e.target.value)} type="password" placeholder="Enter Password" />
                <input className='button' onChange={handleSubmit} type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default SignUp;