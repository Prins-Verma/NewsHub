import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 21,
        category: 'general',
      }

      static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
      }


    // Function for Capitalizing Category 
        capitalizingFirstLetter = (string) => {
                 return string.charAt(0).toUpperCase() + string.slice(1);
             }
    constructor(props) {
        super(props);
        // console.log("constructor called in News Component!");
        //settng constructor in state
        this.state = {
            articles: [],
            loading: false,         //spinner while loading 
            page: 1                    //for switching pages
        }
        document.title= `NewsHub- ${this.capitalizingFirstLetter(this.props.category)}`;
    }
    

    async updateNews() {
        const url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f1d46b4a1eb5406fa2d45cdb722207ce&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json()
        console.log(parseData);
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults }) 
    }
    async componentDidMount() {
        // console.log("hello props", this.props)
        // console.log("componentDidMount called!");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f1d46b4a1eb5406fa2d45cdb722207ce&page=1&pageSize=${this.props.pageSize}`;
        // let data = await fetch(url);
        // let parseData = await data.json()
        // console.log(parseData);
        // this.setState({ articles: parseData.articles, totalResults: parseData.totalResults })
        this.updateNews();
    }

    

    handlePrevious = async () => {
        console.log("Previos clicked!");

        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f1d46b4a1eb5406fa2d45cdb722207ce&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // let data = await fetch(url);
        // let parseData = await data.json()

        // console.log(parseData);
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parseData.articles

        // })
        this.setState({page: this.state.page - 1})
        this.updateNews();

    }

    handleNext = async () => {
        console.log("Next clicked!");

        // Math.ceil() will return the next largest number after the decimal point like: 0.1 will be 1, 0.6=1
        // if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

        // }
        // else {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f1d46b4a1eb5406fa2d45cdb722207ce&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     let data = await fetch(url);
        
        //     let parseData = await data.json()

        //     console.log(parseData);
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parseData.articles
        //     })
        // }
        this.setState({page: this.state.page + 1})
        this.updateNews();

    }
    
    render() {
        //console.log("render called!")
         return (
            <div className="container my-3">
                <h1 className="text-center" style={{margin: '30px 0px'}}>NewsHub- Trending {this.capitalizingFirstLetter(this.props.category)} Headlines </h1>

            
             {/* adding spinner  */}
                {
                   
                    this.state.articles.length > 0 ? (<div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""}
                                    imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source= {element.source.name}/>

                                {/* <NewsItem  title={element.title.slice(0, 60) ?  element.title : ""} description= {element.description.slice(0,88) ? element.description : ""} 
                                imageUrl= {element.urlToImage} newsUrl= {element.url} /> */}
                            </div>

                        })}
                    </div>) : (<Spinner />)
                }


                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevious}> &larr; Previous </button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}> Next &rarr; </button>

                </div>
            </div>
        )
    }
}

export default News
