/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { deepOrange500 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Footer from './Footer';


const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500,
    },
});
let gradient = [{ "Grade": "grad-1" }, { "Grade": "grad-2" }, { "Grade": "grad-3" }, { "Grade": "grad-4" }, { "Grade": "grad-5" }];

class Main extends Component {
    constructor() {
        super();
        this.state = {
            quoteText: "",
            quoteAuthor: "",
        }
    }
    componentWillMount() {
        this.getNewQuote();
    }
    serialize(obj) {
        var str = [];
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        }
        return str.join("&");
    }

    getNewQuote() {
        fetch("https://crossorigin.me/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en&random=" + new Date().getTime(), {
                method: 'get',
                mode: 'cors',
            })
            .then(res => res.json())
            .then(data => {
                if (data.quoteAuthor !== "")
                    this.setState({ quoteText: data.quoteText, quoteAuthor: data.quoteAuthor });
                else
                    this.setState({ quoteText: data.quoteText, quoteAuthor: "Anonymous" });
            });
    }

    render() {

        let maincontentclass = "maincontent " + gradient[Math.floor(Math.random() * gradient.length)].Grade;
        return ( < MuiThemeProvider muiTheme = { muiTheme } >
            < div className = { maincontentclass } >
            < div className = "newquote" >
            < span > Random Quote Generator < /span> < span >
            < RaisedButton label = "New Quote"
            onClick = { this.getNewQuote.bind(this) }
            /></span >
            < /div> < div className = "content" >
            < p className = "quote" > { this.state.quoteText } < /p> < p className = "author" > --{ this.state.quoteAuthor } < /p> < /div> < Footer / >
            < /div>

            < /MuiThemeProvider>
        )
    }
}

export default Main;
