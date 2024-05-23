import React, { useEffect, useState } from 'react'
import { register, signInAccount } from '../../lib/api/api'
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from "../../context/AuthContext";
import './login.css'
import { toast } from 'react-toastify';
// import styles from './login.module.css'

const SignUpForm = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [school, setSchool] = useState("")
    const [section, setSection] = useState("")
    const [rollno, setRollno] = useState("")
    const [course, setCourse] = useState("")
    const [name, setName] = useState("")
    const [fileName, setFileName] = useState("Upload your ID Card")
    const [idcard, setidcard] = useState("")
    let toastId;
    
    async function handleSubmit() {
        if (email.trim().length > 0 && password.trim().length > 0 && name.trim().length > 0 && school.trim().length > 0 && course.trim().length > 0 && section.trim().length > 0 && rollno.trim().length > 0 && idcard !== "") {
            try {
                toastId = toast.loading("Sending data...");
                const formData = new FormData();
                formData.append("name", name);
                formData.append("school", school);
                formData.append("course", course);
                formData.append("section", section);
                formData.append("rollno", rollno);
                formData.append("email", email);
                formData.append("password", password);
                formData.append("idcard", idcard);
                const res = await register(formData);
                if (res === true) {
                    toast.update(toastId, { isLoading: false, render: "Data Sent for verification", type: "success", hideProgressBar: false, closeButton: true, delay: 500, autoClose: true });
                    // navigate("/")
                }else{
                toast.update(toastId, { isLoading: false, render: "Something went wrong", type:"error", hideProgressBar: false, closeButton: true, delay: 500, autoClose: true });
                }
            } catch (err) {
                console.log(err);
                toast.update(toastId, { isLoading: false, render: "Something went wrong", type:"error", hideProgressBar: false, closeButton: true, delay: 500, autoClose: true });
            }
        } else {
            toast.warning("Enter all fields")
        }
    }

    const handleFile = (e) => {
        const file = e.target.files[0]
        setidcard(file)
        setFileName(file.name)
    }

    return (

        <div className='loginPage' style={{ marginTop: "-100px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <section id="details-ctr" className='login_section'>
                {/* <ToastContainer/> */}
                <div id="login-ctr">
                    {/* <div id="errorBox" style={{display: "none", color: "red",zIndex: "2",fontSize: "small",margin: "-30px"}}></div> */}
                    <div className="card">
                        <h2>Conference</h2>
                        <div className="login_register ">
                            <Link to="/sign-in" className="login " >Login</Link>
                            <Link to="/sign-up" className="register auth_active" >Signup</Link>
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

                        <form className="auth_form" id="register_form" onSubmit={(e) => e.preventDefault()}>
                            <input type="text" placeholder="Name" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                            <input type="text" placeholder="School" id="school" value={school} onChange={(e) => setSchool(e.target.value)} required />
                            <input type="text" placeholder="Course" id="course" value={course} onChange={(e) => setCourse(e.target.value)} required />
                            <input type="text" placeholder="Section" id="section" value={section} onChange={(e) => setSection(e.target.value)} required />
                            <input type="text" placeholder="RollNo" id="rollno" value={rollno} onChange={(e) => setRollno(e.target.value)} required />
                            <input type="email" placeholder="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <input type="password" placeholder="Password" id="password" value={password} minLength={8} onChange={(e) => setPassword(e.target.value)} required />
                            <input type="file" id="idcard" style={{ display: "none" }}
                                onChange={(e) => handleFile(e)} required />
                            <label htmlFor="idcard" id="fileLabel">
                                <p style={{ color: "rgb(59, 55, 55)" }}> {fileName}
                                    <span> <i style={{ margin: "0 10px" }} className='bx bx-upload'></i></span>
                                </p>
                            </label>
                            <button type="submit" className="login_btn" id="submit-btn" onClick={handleSubmit}>Send for Verification</button>
                        </form>

                        {/* <!-- BOUTTON LOGIN --> */}
                        <div className="footer_card">
                            <p>Already Registered</p>
                            <Link to={"/sign-in"}>Sign In now</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default SignUpForm