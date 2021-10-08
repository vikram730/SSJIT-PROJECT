import React, {useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import GoogleLogin from 'react-google-login'
import Dashboard from './Dashboard'
import axios from 'axios'
import Common, { setUserSession } from '../Common/Common'

const TeacherPopUpLogin = (props) => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errmsg, setErrmsg] = useState('');

    const loginTeacherBtn= async(e)=>{
        e.preventDefault();

        const res = await fetch('/loginTeacher', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })   
        }).then(res => {
            console.log(res.status);
            var new1 =  res.json()
            console.log(new1);
        // });.then(json =>{
        //     console.log(json.token)
        //     setUserSession(json.token , json.teacher);
        //     history.push('/dashboard');

        }).catch(error => {
            // setLoading(false);
            console.log(error)
            if(error.response.status === 401){
                setErrmsg(error.response.data.message);
            }else{
                setErrmsg('Something went wrong. Please try agin later.');
            }
            
        })
    }

    // const res = await fetch('/loginTeacher', {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         email, password
    //     })   
    // }).then(res => {
    //    return res.json();
    // }).then(res => {
    //     console.log(res);
    // })

    // }
    // Login with Google
    const responseSuccessGoogle = (response) => {
        console.log(response);
        const res = axios({
          method:"POST",
          url: "http://localhost:80/googleLogin",
          data: {tokenId: response.tokenId}
        })
        
        // console.log(res.data);
        // const data = res.json();
        
        // console.log(data);
        if(res.status === 200 ){
            // console.log(data)
            document.getElementById("modalCloseBtn").click();   
            history.push("/");
        }else{
            document.getElementById("modalCloseBtn").click();
            history.push("/dashboard");
        }

      }
    
      const responseErrorGoogle = (response) => {
        console.log(response);
    }


    return (
        <div>
            <div class="modal fade"  id={props.id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div className="row">
                            <div className="col-12 col-sm-6 col-md-6">
                                <img src="https://source.unsplash.com/350x350/?study" alt="" height="100%" width="100%" />
                            </div>
                            <div className="col-12 col-sm-6 col-md-6">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Teacher login</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" id= "modalCloseBtn" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form method="POST">
                                        <div class="mb-3">
                                            <label class="form-label">Email Address</label>
                                            <input type="text" class="form-control" value={email} onChange={(e) =>setEmail(e.target.value)} id="email" name="email" placeholder="Email" />
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Password</label>
                                            <input type="password" class="form-control" value={password} onChange={(e) =>setPassword(e.target.value)} id="password" name="password" placeholder="Password" />
                                        </div>
                                        <div class="mb-3 form-check">
                                            <input type="checkbox" class="form-check-input" id="rememberMe" />
                                            <label class="form-check-label" for="rememberMe">Remember me</label>
                                        </div>
                                        
                                        {/* Login with Google */}
                                        <div class="mb-3 form-check">
                                            <GoogleLogin
                                                clientId="692159986395-b09gatkl3s8t3rhc99thg0jgm26d7jc9.apps.googleusercontent.com"
                                                buttonText="Login with Google"
                                                onSuccess={responseSuccessGoogle}
                                                onFailure={responseErrorGoogle}
                                                cookiePolicy={'single_host_origin'}
                                            />

                                        </div>

                                        <div class="modal-footer d-block">
                                            <p class="float-start">Not yet account <a href="#">Sign Up</a></p>
                                            <button type="submit" class="btn btn-warning float-end" onClick={loginTeacherBtn}>Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherPopUpLogin;
