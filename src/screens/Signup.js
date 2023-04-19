import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
        geolocation: '',
    });
    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation}),
            });
            const data = await response.json();
            if (data.success) {
                console.log('User created successfully!');
                console.log(data)
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to create user');
        }
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='name' className='form-label'>
                        Name
                    </label>
                    <input
                        type='text'
                        className='form-control'
                        name='name'
                        value={credentials.name}
                        onChange={handleChange}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>
                        Email address
                    </label>
                    <input
                        type='email'
                        className='form-control'
                        name='email'
                        value={credentials.email}
                        onChange={handleChange}
                        aria-describedby='emailHelp'
                    />
                    <div id='emailHelp' className='form-text'>
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>
                        Password
                    </label>
                    <input
                        type='password'
                        className='form-control'
                        name='password'
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='geolocation' className='form-label'>
                        Address
                    </label>
                    <input
                        type='text'
                        className='form-control'
                        name='geolocation'
                        value={credentials.geolocation}
                        onChange={handleChange}
                    />
                </div>
                <button type='submit' className='m-3 btn btn-success'>
                    Submit
                </button>
                <Link to='/login' className='m-3 btn btn-danger'>
                    Already a User
                </Link>
            </form>
        </div>
    );
};

export default Signup;
