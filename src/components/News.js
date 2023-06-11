import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types';
// import Spinner from '/Spinner';


export class News extends Component {
    static defaultProps = {
        country:'in',
        pageSize:8,
        category:'general',
    }

    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category: PropTypes.string,
    }


    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f4ac3ecf0ff849dfa07f6cabd1c20ef6&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })
    }

    handleNextClick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f4ac3ecf0ff849dfa07f6cabd1c20ef6&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json()
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }
    }

    handlePreviousClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f4ac3ecf0ff849dfa07f6cabd1c20ef6&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })
        this.setState({
            page: this.state.page - 1
        })
    }

    render() {

        return (
            <div className='container my-3'>
                <h2 className='text-center' style={{margin:'35px 0px' , marginTop:'90px'}}>News Hunter - Top HeadLines</h2>
                <div className='row'>
                    {this.state.articles.map((element) => {
                        return <div className='col-md-4' key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} publish={element.publishedAt.slice(0,10)} Author={element.author} source={element.source.name} />
                        </div>
                    })}
                </div>
                <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
                    <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News