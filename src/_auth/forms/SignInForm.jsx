import React, { useEffect, useState } from 'react'
import { signInAccount } from '../../lib/api/api'
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from "../../context/AuthContext";
import { toast } from 'react-toastify';
import './login.css'
// import styles from './login.module.css'

const SignInForm = () => {
    let toastId;

    const { checkAuthUser } = useUserContext()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    async function handleSubmit() {
        if (email.trim().length > 0 && password.trim().length > 0) {
            try {
                toastId = toast.loading("Loading Please Wait...");
                const loggedIn = await signInAccount({ email, password });
                if (loggedIn) {
                    toast.dismiss()
                    checkAuthUser(); // Check user is authenticated or not
                    navigate("/")
                } else {
                    toast.update(toastId, { isLoading: false, render: "Invalid Email/Password", type:"error", hideProgressBar: false, closeButton: true, delay: 500, autoClose: true });
                }
            } catch (err) {
                console.log(err)
                toast.error("Something went wrong")
            }
        } else {
            toast.warning("Enter all fields")

        }
    }
   
    return (

        <div className='loginPage' style={{ marginTop: "-100px", display: "flex", alignItems: "center", justifyContent: "center" }}>

            <section id="details-ctr" className='login_section'>
                <div id="login-ctr">
                    {/* <div id="errorBox" style={{display: "none", color: "red",zIndex: "2",fontSize: "small",margin: "-30px"}}></div> */}
                    <div className="card">
                        <h2>Conference</h2>

                        <div className="login_register ">
                            <Link to="#" className="login auth_active" >Login</Link>
                            <Link to="/sign-up" className="register" >Signup</Link>
                        </div>
                        <div id="myPopup" className="popup">
                            <div className="popup-content">
                                <label htmlFor="" className="text-bold">Wrong Credentials</label>
                                <button id="yesButton" className="formal-button">
                                    OK
                                </button>
                            </div>
                        </div>

                        {/* <!-- FORMULAIRE --> */}
                        <form className="auth_form" id="login_form" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button type="submit" className="login_btn" id="submit-btn" onClick={handleSubmit}>Login</button>
                        </form>

                        {/* <!-- BOUTTON LOGIN --> */}
                        <Link to={"/forgetpwd"} style={{ color: "grey" }}>Forgot password</Link>
                        <div className="footer_card">
                            <p>Not Registered?</p>
                            <Link to={"/sign-up"}>Sign Up now</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default SignInForm