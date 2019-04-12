import React from 'react'

/**
     * Create a method that, when the "Gen" button is clicked, chooses one of the
     * memes from our `allMemeImgs` array at random and makes it so that is the
     * meme image that shows up in the bottom portion of our meme generator site (`.url`)
     */

class MemeGenerator extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        /* fetch the meme from the api and assign it to allMemeImgs */
        fetch("https://api.imgflip.com/get_memes")
            .then(Response => Response.json())
            .then(data => {
                this.setState({
                allMemeImgs: data.data.memes
            })})
    }

    handleChange(event) {
        /* asssign name=event.target.name, value=event.target.value */
        const {name, value} = event.target
        /* update the state with typed value */
        this.setState({[name]: value});
      }

    handleSubmit(event){
        /* prevent reload of page when button is clicked */
        event.preventDefault();
        /* Get a random number based on number of memems (100) */
        const randomNumber = Math.floor(Math.random() * this.state.allMemeImgs.length);
        /* Get random meme based on random number */
        const randomMeme = this.state.allMemeImgs[randomNumber]
        /* get random meme image url */
        const memeImgUrl = randomMeme.url
        /* set/change randomImage to new random url */
        this.setState({
            randomImage: memeImgUrl
        })
        
    }

    render(){
        return(
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        name="topText" 
                        placeholder="Top text"
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />
                    <input 
                        type="text" 
                        name="bottomText" 
                        placeholder="Bottom text"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    />
                    <button>Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImage} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator