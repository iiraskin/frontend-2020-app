import React, { Component } from 'react';

import './Login.css';

const url = "http://localhost:3000/";

class Login extends Component {
    constructor(props) {
        super(props);
        localStorage.setItem("login", false);
        this.state = {
            signin: true,
            signup: false
        };
    }

    switchCond (word){
        let signup, signin;
        if(word === "signup"){
            signup = true;
            signin = false;
        }
        else{
            signin = true;
            signup = false;
        }
        return this.setState({
            signin:signin,
            signup:signup
        })
    }

    render() {
        return (
            <div id="form">
                <div>
                    <div id="buttons">
                        <p id="signupButton" onClick={this.switchCond.bind(this,"signup")}
                           className={this.state.signup ? "green":"blue"}>Sign Up</p>
                        <p id="signinButton" onClick={this.switchCond.bind(this,"signin")}
                           className={this.state.signin ? "green":"blue"}> Login</p>
                    </div>

                    {this.state.signup?<SignUp/> : null}
                    {this.state.signin? <SignIn/> : null}
                </div>
            </div>
        )
    }
}


class SignIn extends Component {
    handleInput() {
        fetch("http://abbyyfrontend2020.azurewebsites.net/login", {
            method : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                    'username' : document.getElementById("username").value,
                    'password' : document.getElementById("password").value
            })
        }).then( res => res.json())
            .then( res => {
                if (res.success) {
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("login", true);
                    window.location=url + 'articles/';
                } else {
                    document.getElementById("error_message").innerHTML = res.errors;
                }
            });
    }

    render() {
        return (
            <div>
                <div id="signin">
                    <input type="text" id="username" placeholder="Name"/>
                    <input type="password" id="password" placeholder="Password"/>
                    <button id="send" onClick={this.handleInput}>Send</button>
                    <p id="error_message"> </p>
                </div>
            </div>
        )
    }
}


class SignUp extends Component {
    handleInput() {
        let password = document.getElementById("password").value;
        let confirm = document.getElementById("confirm").value;
        if (password !== confirm) {
            document.getElementById("error_message").innerHTML = "Passwords mismatch";
            return;
        }
        fetch("http://abbyyfrontend2020.azurewebsites.net/register", {
            method : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'username' : document.getElementById("username").value,
                'password' : password
            })
        }).then( res => res.json())
            .then( res => {
                if (res.success) {
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("login", true);
                    window.location=url + 'articles/';
                } else {
                    document.getElementById("error_message").innerHTML = res.errors;
                }
            });
    }

    render() {
        return (
            <div>
                <div id="signup">
                    <input type="username" id="username" placeholder="Name"/>
                    <input type="password" id="password" placeholder="Password"/>
                    <input type="password" id="confirm" placeholder="Confirm Password"/>
                    <button id="send" onClick={this.handleInput}>Send</button>
                    <p id="error_message"> </p>
                </div>
            </div>
        )
    }
}


export default Login;