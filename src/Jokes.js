import { Component } from "react";
import './Jokes.css'

class Jokes extends Component {
    getColor(){
        if(this.props.votes >= 15){
            return '#01FF14'
        }
        else if(this.props.votes >=12){
            return '#74F77E'
        }
        else if(this.props.votes >=9){
            return '#EEF760'
        }
        else if(this.props.votes >=6){
            return '#E6F31D'
        }
        else if(this.props.votes >=3){
            return 'orange'
        }
        else if(this.props.votes > 0){
            return '#D50808'
        }
        else if(this.props.votes < 0){
            return '#D50808'
        }
       

    }


    getEmoji(){
        if(this.props.votes >= 15){
            return "em em-rolling_on_the_floor_laughing"
        }
        else if(this.props.votes >=12){
            return "em em-laughing" 
        }
        else if(this.props.votes >=9){
            return 'em em-smiley'
        }
        else if(this.props.votes >=6){
            return "em em-smirk"
        }
        else if(this.props.votes >=3){
            return 'em em-face_with_rolling_eyes'
        }
        else if(this.props.votes >= 0){
            return "em em-anguished" 
        }
        else if(this.props.votes < 0){
            return 'em em-angry'
        }

    }
    
    render(){
        return(
            <div className='Joke'>
                <div className='Joke-buttons'>
                    <i className='fas fa-arrow-up' onClick={this.props.upvote}></i>
                    <span className='Joke-vote' style={{borderColor: this.getColor()}}>{this.props.votes}</span>
                    <i className='fas fa-arrow-down' onClick={this.props.downvote}></i>
                </div>
                <div className='Joke-text'>
                    {this.props.text}
                </div>
                <div className='Joke-smiley'>
                <i className={this.getEmoji()}/>
                </div>

            </div>
        )
    }
}

export default Jokes;