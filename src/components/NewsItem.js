import React from 'react'

const NewsItem = (props) => {
    let { title, descryption, imageUrl, newsUrl, author, date } = props;
    return (
        <div className='my-3'>
            <div className="card">
                <img src={imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{descryption}...</p>
                    <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} <br></br>{new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>

        </div>
    )
}

export default NewsItem