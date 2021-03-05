import React from 'react';
import PropTypes from 'prop-types';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIndexInFocus: 0,
      firstThumbnailIndexShown: 0,
    };
    this.previousImage = this.previousImage.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.thumbnailOnClick = this.thumbnailOnClick.bind(this);
    this.previousThumbnail = this.previousThumbnail.bind(this);
    this.nextThumbnail = this.nextThumbnail.bind(this);
  }

  previousImage() {
    const { imageIndexInFocus, firstThumbnailIndexShown } = this.state;
    this.setState({ imageIndexInFocus: imageIndexInFocus - 1 });
    if (imageIndexInFocus - 1 < firstThumbnailIndexShown) {
      this.setState({ firstThumbnailIndexShown: imageIndexInFocus - 1 });
    }
  }

  nextImage() {
    const { imageIndexInFocus, firstThumbnailIndexShown } = this.state;
    this.setState({ imageIndexInFocus: imageIndexInFocus + 1 });
    if (imageIndexInFocus + 1 > firstThumbnailIndexShown + 4) {
      this.setState({ firstThumbnailIndexShown: imageIndexInFocus - 3 });
    }
  }

  thumbnailOnClick(e) {
    this.setState({ imageIndexInFocus: Number(e.target.name) });
  }

  previousThumbnail() {
    const { firstThumbnailIndexShown } = this.state;
    this.setState({ firstThumbnailIndexShown: firstThumbnailIndexShown - 1 });
  }

  nextThumbnail() {
    const { firstThumbnailIndexShown } = this.state;
    this.setState({ firstThumbnailIndexShown: firstThumbnailIndexShown + 1 });
  }

  render() {
    const { images } = this.props;
    const { imageIndexInFocus, firstThumbnailIndexShown } = this.state;
    return (
      <>
        <div className="carousel">
          <button type="button" className="changeImage previous" style={imageIndexInFocus ? {} : { display: 'none' }} onClick={this.previousImage} onKeyDown={this.previousImage}>{'<'}</button>
          <button type="button" className="changeImage next" style={imageIndexInFocus === images.length - 1 ? { display: 'none' } : {}} onClick={this.nextImage} onKeyDown={this.nextImage}>{'>'}</button>
          {images.map((photo, index) => (
            index === imageIndexInFocus ? <img key={photo.url} alt="" className="in-focus" src={photo.url} /> : null
          ))}
        </div>
        <div className="thumbnails">
          <button type="button" className="changeThumbnails previous" style={firstThumbnailIndexShown ? {} : { display: 'none' }} onClick={this.previousThumbnail} onKeyDown={this.previousThumbnail}>˄</button>
          <div className="images">
            {images.map((photo, index) => (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              (index >= firstThumbnailIndexShown && index <= firstThumbnailIndexShown + 4) ? <img alt="" key={photo.url} name={index} className={index === imageIndexInFocus ? 'thumbnail selected' : 'thumbnail'} onClick={this.thumbnailOnClick} onKeyDown={this.thumbnailOnClick} src={photo.thumbnail_url} /> : null
            ))}
          </div>
          <button type="button" className="changeThumbnails next" style={firstThumbnailIndexShown >= images.length - 5 ? { display: 'none' } : {}} onClick={this.nextThumbnail} onKeyDown={this.nextThumbnail}>˅</button>
        </div>
      </>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.instanceOf(Array).isRequired,
};

export default Carousel;
