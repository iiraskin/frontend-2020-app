import React, { Component } from 'react';

import './NewArticle.css';
import LogOut from '../Articles/Articles';

const url = "http://localhost:3000/";

class NewArticle extends Component {
    render() {
        let login = true;
        if (localStorage.getItem("login") === "false") {
            login = false;
        }
        return (
            <div id="form">
                <div>
                    {login?<LogIn id={this.props.match.params.id}/> : <LogOut/>}
                </div>
            </div>
        )
    }
}

function fillInArticle(title, url, text, func) {
    return (
        <div>
            <div id={"article"}>
                <div id="title_header">Title<input type="text" defaultValue={title} id="title"/></div>
                <div id="image_url_header">Img<input type="text"  defaultValue={url} id="image_url"/></div>
                <div id="content_header">Content<input type="text"  defaultValue={text} id="content"/></div>
            </div>
            <button id="submit" onClick={func}>Submit</button>
        </div>
    )
}

class LogIn extends Component {
    handleSignOut() {
        localStorage.setItem("login", false);
        window.location=url;
    }

    handleSubmit() {
        fetch("http://abbyyfrontend2020.azurewebsites.net/articles", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('token')
            },
            body: JSON.stringify({
                'title': document.getElementById("title").value,
                'image_ur': document.getElementById("image_url").value,
                'content': document.getElementById("content").value
            })
        }).then(res => res.json())
            .then(res => {
                if (res.success) {
                    window.location=url + 'articles/'
                }
            });
    }

    render() {
        return (
            <div id="login">
                <button id="signout" onClick={this.handleSignOut}>Logout</button>
                {fillInArticle("", "", "", this.handleSubmit)}
                <p id="error_message"> </p>
            </div>
        )
    }
}


export default NewArticle;