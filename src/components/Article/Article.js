import React, { Component } from 'react';

import './Article.css';
import LogOut from '../Articles/Articles';

const url = "http://localhost:3000/";

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

class Article extends Component {
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

class LogIn extends Component {
    article_loaded = false;

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            delete: false,
            update: false,
            title: "",
            author: "",
            image_url: "",
            content: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    }

    handleSignOut() {
        localStorage.setItem("login", false);
        window.location=url;
    }

    handleDeleteConfirm() {
        fetch("https://abbyyfrontend2020.azurewebsites.net/articles/" + this.state.id, {
            method : 'DELETE',
            headers : {
                'Authorization' : localStorage.getItem('token')
            }
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.success) {
                    window.location=url + 'articles/'
                } else {
                    this.setState({delete: false});
                    document.getElementById("error_message").innerHTML = res.errors;
                }
            });
    }

    handleUpdate() {
        this.setState({update: true});
    }

    handleDelete() {
        this.setState({delete: true});
    }

    handleBack() {
        window.location=url + 'articles/'
    }

    handleSubmit() {
        fetch("http://abbyyfrontend2020.azurewebsites.net/articles/" + this.state.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('token')
            },
            body: JSON.stringify({
                'title': document.getElementById("title").value,
                'image_url': document.getElementById("image_url").value,
                'content': document.getElementById("content").value
            })
        }).then(res => res.json())
            .then(res => {
                if (res.success) {
                    this.setState({delete: false});
                }
            });
    }

    render() {
        if (!this.article_loaded) {
            fetch("http://abbyyfrontend2020.azurewebsites.net/articles/" + this.state.id, {
                method : 'GET',
                headers : {
                    'Accept': 'application/json',
                    'Content-Type' : 'application/json',
                }
            }).then(res => res.json())
                .then(res => {
                    if (res.success) {
                        this.setState({
                            title: res.data.article.title,
                            author: res.data.article.user.username,
                            image_url: res.data.article.image_url,
                            content: res.data.article.content
                        });
                    }
                });

            this.article_loaded = true;
        }

        return (
            <div id="login">
                <button id="signout" onClick={this.handleSignOut}>Logout</button>
                <button id="back" onClick={this.handleBack}>Back</button>
                {this.state.update?
                    <div>{fillInArticle(this.state.title, this.state.url, this.state.content, this.handleSubmit)}</div>:
                    <div>
                        <div id={"article"}>
                            <div id="title">{this.state.title}</div>
                            <div id="username">{this.state.author}</div>
                            <img id="image_url" src={this.state.image_url} alt="article-img"/>
                            <div id="content">{this.state.content}</div>
                        </div>
                        <button id="update" onClick={this.handleUpdate}>Update article</button>
                        {this.state.delete?
                            <button id="delete_confirm" onClick={this.handleDeleteConfirm}>Confirm deletion</button>:
                            <button id="delete" onClick={this.handleDelete}>Delete article</button>}
                            <p id="error_message"> </p></div>}
                    </div>
        )
    }
}


export default Article;