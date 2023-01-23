import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description,  imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div className='my-3'>
        <div className="card">
        {/* Adding Css for Sources of News like: News24 */}
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1'}}> {source} </span>

        {/* if imageUrl is null then this image: {https://yt3.ggpht.com/a/AGF-l78FExrMCq9cKjHazqRxroAfv55_7iVTNPpKqA=s900-c-k-c0xffffffff-no-rj-mo} will be shown */}
            <img src={!imageUrl ? "https://yt3.ggpht.com/a/AGF-l78FExrMCq9cKjHazqRxroAfv55_7iVTNPpKqA=s900-c-k-c0xffffffff-no-rj-mo" : imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title} 
                </h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">By {!author ? "Unknwon" : author} on {new Date(date).toGMTString()}</small></p>
                <a rel="noreferrer" href= {newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
