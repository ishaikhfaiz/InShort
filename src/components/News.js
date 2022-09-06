import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string

    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults:0
        }
        document.title = `${this.props.category} - InShort`;
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d85bc67aca664770ad912de825982b3a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        this.props.setProgress(30);
        let data = await fetch(url)
        let parsedData = await data.json()
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);

    }

    async componentDidMount() {
        this.updateNews();
    }

    // handlePrevclick = async () => {
    //     this.setState({ page: this.state.page - 1 })
    //     this.updateNews();
    // }

    // handleNextclick = async () => {
    //     this.setState({ page: this.state.page + 1 })
    //     this.updateNews();
    // }

    fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d85bc67aca664770ad912de825982b3a&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({page: this.state.page + 1});
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })

      };

    render() {
        return (
            <div className='container my-3'>
                <h1 className="text-center" style={{ margin: '35px', marginTop:'90px' }} >InShort- Top {this.props.category} Headlines</h1>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                >
                    <div className="container">
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-3" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} descryption={element.description ? element.description.slice(0, 87) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author}
                                    date={element.publishedAt} />
                            </div>
                        })}

                    </div>
                    </div>
                </InfiniteScroll>
               
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevclick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextclick}>Next &rarr;</button>
                </div> */}
            </div>
        )
    }
}

export default News