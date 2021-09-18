import React, {Component} from 'react';
import axios from 'axios';
import Jokes from './Jokes';
import './Jokelist.css';
import { v4 as uuidv4 } from 'uuid';

const APi_Url ='https://icanhazdadjoke.com/';

class Jokelist extends Component{
    static defaultProps= {
        numOfJoke: 10,
        loading:false

    };
    constructor(props){
        super(props)
        this.state = {
            jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]')
        }
        this.seenJokes = new Set(this.state.jokes.map(j => j.text))
        console.log(this.seenJokes)
        this.handleClick = this.handleClick.bind(this)
    }

    async componentDidMount(){
        // function only runs if there no jokes in array
        if(this.state.jokes.length === 0) this.getJokes()
        
    }

    handleVote(id, delta){
    
        this.setState(st => ({
            jokes: st.jokes.map(j=>
                j.id === id ?{...j, votes: j.votes + delta} : j)
        }),
        () => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
        )

    }


    async getJokes(){
        try{
            let jokes = [];

        while(jokes.length <= this.props.numOfJoke){
            let res = await axios.get(APi_Url, {headers: {Accept:'application/json'}});
            let newJoke = res.data.joke;
            // search for duplicate jokes
            if (!this.seenJokes.has(newJoke)){
                jokes.push({text :newJoke, votes: 0, id: uuidv4() })
            } else{
                console.log('found duplicate!!');
                console.log(newJoke)
            }
            
        }
        this.setState(st => ({
            loading: false,
            jokes: [...st.jokes, ...jokes]
        }),
        () => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
        )
        // Adding Joke to local storage
        window.localStorage.setItem('jokes', JSON.stringify(jokes))
        }catch(e){
            alert(e);
            this.setState({loading: false})
        }
        
    }

    handleClick(){
        this.setState({loading: true} )
        this.getJokes()
    }

    render(){  
        if(this.state.loading) {
            return(
                <div className='JokeList-spinner'> 
                    <i className='far fa-8x fa-laugh fa-spin' />
                    <h1 className='JokeList-title'> Loading...</h1>
                </div>
            )
        } 
        // Sort jokes from most votes to least 
        let jokes = this.state.jokes.sort((a,b) => b.votes - a.votes);
        return (
            <div className='JokeList'> 
                <div className='JokeList-sidebar'>
                    <h1 className='JokeList-title'> <span> Dad </span> Jokes</h1>
                    <i className="em em-laughing JokeList-emoji" />
                    <button className='Jokelist-getmore'  onClick={this.handleClick}> Fetch Jokes</button>
                </div>
                
                <div className='JokeList-jokes'>
                    {jokes.map(
                        j =>(
                            <Jokes
                            votes={j.votes}
                            text={j.text}
                            key= {j.id}
                            upvote= {()=> this.handleVote(j.id, +1)}
                            downvote= {()=> this.handleVote(j.id, -1)}
                            />
                        )
                    )}
                </div>
                
            </div>
        )
    }
}

export default Jokelist;