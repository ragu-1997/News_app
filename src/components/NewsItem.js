import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, publish, Author, source } = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{right: '50%' ,zIndex:'1'}}>
                        {source}
                    </span>
                    <img src={!imageUrl ? "https://image.cnbcfm.com/api/v1/image/106898677-16239318402020-05-18t000000z_2130291447_rc2oqg9e9avo_rtrmadp_0_china-economy-trade.jpeg?v=1686108760&w=1920&h=1080" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}
                        </h5>
                        <p className="card-text">{description}...</p>
                        <p className='card-text'><small className='text-muted'><strong>Date published : {publish} <br></br> Author : {Author ? Author : 'Anonymus'}</strong></small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
