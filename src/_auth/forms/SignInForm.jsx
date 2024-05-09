import React, { useEffect, useState } from 'react'
import { signInAccount } from '../../lib/api/api'
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from "../../context/AuthContext";
import './login.css'
// import styles from './login.module.css'

const SignInForm = () => {
    const { checkAuthUser } = useUserContext()
    const navigate = useNavigate()
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    async function handleSubmit() {
        if (email.trim().length > 0 && password.trim().length > 0) {
            try {
                const loggedIn = await signInAccount({ email, password });
                if (loggedIn) {
                    checkAuthUser(); // Check user is authenticated or not
                    navigate("/")
                } else {
                    alert("Invalid Email or Password")
                }
            } catch (err) {
                console.log(err)
            }
        } else {
            alert("Please enter all fields")
        }
    }
    useEffect(() => {
        document.getElementById("PreLoaderBar").classList.remove("show");
        document.getElementById("PreLoaderBar").classList.add("hide");
    }, [])

    return (

        <div className='loginPage' style={{ marginTop: "-100px", display: "flex", alignItems: "center", justifyContent: "center" }}>

            <section id="details-ctr" className='login_section'>
                <div id="login-ctr">
                    {/* <div id="errorBox" style={{display: "none", color: "red",zIndex: "2",fontSize: "small",margin: "-30px"}}></div> */}
                    <div class="card">
                        <h2>Conference</h2>

                        <div class="login_register ">
                            <a href="#" class="login auth_active" target="blank">Login</a>
                            <a href="/sign-up" class="register" target="blank">Signup</a>
                        </div>
                        <div id="myPopup" class="popup">
                            <div class="popup-content">
                                <label for="" class="text-bold">Wrong Credentials</label>
                                <button id="yesButton" class="formal-button">
                                    OK
                                </button>
                            </div>
                        </div>

                        {/* <!-- FORMULAIRE --> */}
                        <form class="auth_form" id="login_form" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button type="submit" class="login_btn" id="submit-btn" onClick={handleSubmit}>Login</button>
                        </form>

                        {/* <!-- BOUTTON LOGIN --> */}
                        <Link to={"/forgetpwd"} style={{ color: "grey" }}>Forgot password</Link>
                        <div class="footer_card">
                            <p>Not Registered</p>
                            <Link to={"/sign-up"}>Sign Up now</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default SignInForm