import React, { Component } from 'react'
import css from "./Movies.module.css";
import axios from "axios";

export default class Movies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movieArray1:[]
        }
    }
    componentDidMount(){
        axios.get("https://www.omdbapi.com/?apikey=45f0782a&s=war")
        .then(response=>{
            this.setState({movieArray1:response.data})

        })
        .catch(err=>{
            console.log(err.message)
        })
    }
    handleChange=(e)=>{
        console.log(e.target.value) 
        let title = e.target.value;
        axios.get(`https://www.omdbapi.com/?apikey=45f0782a&s=${title===""?"war":title}`)
        .then(response=>{
            this.setState({movieArray1:response.data})
        })
        .catch(err=>{
            console.log(err.message)
        })    
    }
    render() {
        console.log(this.state.movieArray1)
        let {Search} = this.state.movieArray1;
        console.log(Search)
        return (
            <div>
                <div id="input-wrapper">
                    <h1>Movie Search Website </h1><br/>
                    <input onChange={this.handleChange} type="text" placeholder="Search for Movie Title" id={css.input}/>
                </div>
                <div id={css.container}>
                {Search !== undefined ? Search.map((item,pos)=>{
                    return <article key={`${item.imdbID}${pos}`} className={css.card}>
                                <img src={item.Poster} alt="movieImage"/>
                                <p>{item.Title}</p>
                            </article>
                }): <h3>Movie Not Found...<br/>Enter a Valid Name..!</h3> }
                </div>
                <footer>
                    <h4>@2022 Surya sai teja</h4>
                </footer>
            </div>
        )
    }
}
