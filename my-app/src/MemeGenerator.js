import React from 'react'
import './index.css'

 
class MemeGenerator extends React.Component {
    constructor() {
        super()
        this.state = {
            topText: "The App sounds easy will be done in no time",
            bottomText: "12hrs later.....",
            randomImage: "https://i.imgflip.com/4t0m5.jpg",
            alt: "",
            pastedUrl: "",
            memeImages: "",
            color: "#000000",
            rangeTop: 24,
            rangeBottom: 24
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.generateRandom = this.generateRandom.bind(this)
        this.addDefaultSrc = this.addDefaultSrc.bind(this)
    }

    componentDidMount(){
        /* fetch the meme from the api and assign it to allMemeImgs */
        fetch("https://api.imgflip.com/get_memes")
            .then(Response => Response.json())
            .then(data => {
                this.setState({
                memeImages: data.data.memes
            })})
    }

    /* generate random meme imageUrl and description */
    generateRandom(){
        /* random image & description*/
        const randomNumber = Math.floor(Math.random() * this.state.memeImages.length);
        const description = this.state.memeImages[randomNumber].name
        const memeImageUrl = this.state.memeImages[randomNumber].url 

        return {
            description: description,
            memeImageUrl: memeImageUrl
        }
    }

    /* Get random meme image & description*/
    handleSubmit(event){
        /* prevent reload of page when button is clicked */
        event.preventDefault();
        /*  Get random imageUrl & description*/
        const newUrlAndDesc = this.generateRandom()

        /* update state of randomImage & alt */
        this.setState({
            randomImage: newUrlAndDesc.memeImageUrl,
            alt: newUrlAndDesc.description 
        })
    }

    handleChange(event){
        const name = event.target.name
        const value = event.target.value
        /*if url is pasted */
        if(name === "pastedUrl"){
            this.setState({
                randomImage: value
            })
            
        }     
        this.setState({
            [name]: value,
        })
    }

    /* display default image if imageUrl gives error */
    addDefaultSrc(event){
        event.target.src = "https://previews.dropbox.com/p/thumb/AAZdZzS_F-3FrSEemuswLIjUNFiFQmaZHZ6S76x4_txPdEW86Pgpd0QmSQzNC_IUbFgI9iZBjTa7VNi-_5mAxHlIIKROfbGkfpMfjliX1cg97swC7TtELMtX8uJdqaxY29PXddxNnMUlXp_lTPXFsXRDZ5XET2GAVl8orUUYB3Bs-UkenkX8AwGLXEgalN1e3mZva3gIjj2DDzrRq6M5WeOidXUcvJHaF9f5Jpy8HN9djbCEhCCYKY8w47ZuRF0rbufqIMrerjQsELWBRQqLydCpir54BRR9En91AbpSjW-kCXhyd49quw_pZ3rsDyUDA7Ncrp3ComwN2VcxtPyN-gG_/p.jpeg"
      }

    render() {
        return(
            <div className="main">
            <div className="form">
                <h1>MemeGenerator</h1>
                <form onSubmit={this.handleSubmit}>
                    <p>Top Text</p>
                    <input 
                        type="text"
                        placeholder="Top Text"
                        name="topText"
                        onChange={this.handleChange}
                        value={this.state.topText}
                    />
                    <p>Bottom Text</p>
                    <input 
                        type="text"
                        placeholder="Bottom Text"
                        name="bottomText"
                        onChange={this.handleChange}
                        value={this.state.bottomText}
                    />
                    <br />
                    <p>Insert Image-Url Or <button>Generate</button></p>
                    <input 
                        type="url"
                        pattern="https?://.+"
                        placeholder="Insert Url"
                        name="pastedUrl"
                        onChange={this.handleChange}
                        value={this.state.pastedUrl}
                    />
                    <p>Text Color</p>
                    <div className="typeColor" style={{backgroundColor: this.state.color}}>
                        <input 
                            type="color"
                            name="color"
                            value={this.state.color}
                            onChange={this.handleChange}
                        />
                    </div>
                    <p> Top Text Font Size: <span>{this.state.range}px</span></p>
                    <input 
                        type="range"
                        name="rangeTop"
                        min="2" 
                        max="100" 
                        step="2"
                        value={this.state.rangeTop}
                        onChange={this.handleChange}
                    />
                    <p> Bottom Text Font Size: <span>{this.state.range}px</span></p>
                    <input 
                        type="range"
                        name="rangeBottom"
                        min="2" 
                        max="100" 
                        step="2"
                        value={this.state.rangeBottom}
                        onChange={this.handleChange}
                    />
                     
                </form>
            </div>
                <div className="meme">
                    <img src={this.state.randomImage} onError={this.addDefaultSrc} alt={this.state.alt}/>
                    <p style={{color: this.state.color, fontSize: this.state.rangeTop + "px"}} className="topText">{this.state.topText}</p>
                    <p style={{color: this.state.color, fontSize: this.state.rangeBottom + "px"}} className="bottomText">{this.state.bottomText}</p>                   
                </div>
            </div>
        )
    }
}

export default MemeGenerator