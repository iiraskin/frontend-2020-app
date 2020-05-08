import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";

import './Articles.css';
import Article from '../Article/Article';

const url = "http://localhost:3000/";

const Articles = () => (
    <div>
        <Switch>
            <Route exact path='/articles' component={ArticlesList}/>
            <Route path='/articles/:id' component={Article}/>
        </Switch>
    </div>
);


class ArticlesList extends Component {
    render() {
        let login = true;
        if (localStorage.getItem("login") === "false") {
            login = false;
        }
        return (
            <div id="form">
                <div>
                    {login?<LogIn/> : <LogOut/>}
                </div>
            </div>
        )
    }
}


class LogIn extends Component {
    articles_loaded = false;

    constructor(props) {
        super(props);
        this.state = {
            articles: []
        };
    }

    handleSignOut() {
        localStorage.setItem("login", false);
        window.location=url;
    }

    openArticle(id) {
        window.location=url + 'articles/' + id;
    }

    handleNewArticle() {
        window.location=url + 'new-article/'
    }

    render() {
        if (!this.articles_loaded) {
            fetch("http://abbyyfrontend2020.azurewebsites.net/articles", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }).then(res => res.json())
                .then(res => {
                    if (res.success) {
                        this.setState({articles: res.data.articles});
                    }
                });
            this.articles_loaded = true;
        }

        return (
            <div id="login">
                <button id="signout" onClick={this.handleSignOut}>Logout</button>
                <div id={"articles"}>
                    {this.state.articles.map(article => (
                        <div id="article" onClick={() => this.openArticle(article.id)}
                             key={article.title}>{article.title}</div>
                    ))}
                </div>
                <button id="new_article" onClick={this.handleNewArticle}>Add new article</button>
            </div>
        )
    }
}


class LogOut extends Component {
    render() {
        return (
            <div>
                <div id="logout">
                    <p id="message">Login or Sign up, please</p>
                </div>
            </div>
        )
    }
}


export default Articles;