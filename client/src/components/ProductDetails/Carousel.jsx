/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIndexInFocus: 0,
      firstThumbnailIndexShown: 0,
      modalDisplay: 'none',
      modalZoom: false,
      top: 'auto',
      left: 'auto',
    };
    this.imageOnClick = this.imageOnClick.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.modalImageOnClick = this.modalImageOnClick.bind(this);
    this.modalOnMouseMove = this.modalOnMouseMove.bind(this);
    this.iconOnClick = this.iconOnClick.bind(this);
    this.previousImage = this.previousImage.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.thumbnailOnClick = this.thumbnailOnClick.bind(this);
    this.previousThumbnail = this.previousThumbnail.bind(this);
    this.nextThumbnail = this.nextThumbnail.bind(this);
  }

  imageOnClick() {
    this.setState({ modalDisplay: 'flex' });
  }

  modalClose() {
    this.setState({ modalDisplay: 'none' });
  }

  modalImageOnClick() {
    const { modalZoom } = this.state;
    if (modalZoom) {
      this.setState({ modalZoom: !modalZoom, top: 'auto', left: 'auto' });
    } else {
      this.setState({ modalZoom: !modalZoom });
    }
  }

  modalOnMouseMove(e) {
    const { modalZoom } = this.state;
    if (modalZoom) {
      if ((e.target.width * 2.5) > window.innerWidth) {
        this.setState({ left: `calc(${((e.target.width * 2.5) - window.innerWidth) / 2}px - ${((e.target.width * 2.5) - window.innerWidth) * (e.pageX / window.innerWidth)}px` });
      }
      if ((e.target.height * 2.5) > window.innerHeight) {
        this.setState({ top: `calc(${((e.target.height * 2.5) - window.innerHeight) / 2}px - ${((e.target.height * 2.5) - window.innerHeight) * (e.pageY / window.innerHeight)}px` });
      }
    }
  }

  iconOnClick(e) {
    this.setState({ imageIndexInFocus: Number(e.target.name) });
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
    const {
      imageIndexInFocus, firstThumbnailIndexShown, modalDisplay, modalZoom, top, left,
    } = this.state;
    return (
      <>
        <div className="carousel">
          {/* button to see previous image in default view */}
          <button type="button" className="changeImage previous" style={imageIndexInFocus ? {} : { display: 'none' }} onClick={this.previousImage} onKeyDown={this.previousImage}>{'<'}</button>
          {/* button to see next image in default view */}
          <button type="button" className="changeImage next" style={imageIndexInFocus === images.length - 1 ? { display: 'none' } : {}} onClick={this.nextImage} onKeyDown={this.nextImage}>{'>'}</button>
          {/* button to expand view */}
          <i className="fas fa-expand-arrows-alt expandImage" role="button" onClick={this.imageOnClick} onKeyDown={this.imageOnClick} tabIndex={0} aria-label="Expand Image" />
          {/* image in focus for default view */}
          {images.map((photo, index) => (
            index === imageIndexInFocus ? <img key={photo.url} alt="" className="in-focus" src={photo.url} onClick={this.imageOnClick} onKeyDown={this.imageOnClick} /> : null
          ))}
          {/* modal for expanded view */}
          <div className="modal" style={{ display: modalDisplay }}>
            {/* button to close expanded view */}
            <button type="button" style={modalZoom ? { display: 'none' } : {}} className="close" onClick={this.modalClose}>X</button>
            {/* button to see previous image in expanded view */}
            <button type="button" className="changeModalImage previous" style={imageIndexInFocus && !modalZoom ? {} : { display: 'none' }} onClick={this.previousImage} onKeyDown={this.previousImage}>{'<'}</button>
            {/* button to see next image in expanded view */}
            <button type="button" className="changeModalImage next" style={imageIndexInFocus === images.length - 1 || modalZoom ? { display: 'none' } : {}} onClick={this.nextImage} onKeyDown={this.nextImage}>{'>'}</button>
            {/* icons for expanded view */}
            <div className="icons">
              {images.map((image, index) => <button aria-label="Change Modal Image" key={index} type="button" name={index} className={index === imageIndexInFocus ? 'selected' : ''} style={modalZoom ? { display: 'none' } : {}} onClick={this.iconOnClick} onKeyDown={this.iconOnClick} />)}
            </div>
            {/* image in focus for expanded view */}
            <div className="container">
              <img
                className={modalZoom ? 'image zoom' : 'image'}
                alt=""
                onClick={this.modalImageOnClick}
                onKeyDown={this.modalImageOnClick}
                src={images[imageIndexInFocus] ? images[imageIndexInFocus].url : ''}
                style={{ top, left }}
                onMouseMove={this.modalOnMouseMove}
              />
            </div>
          </div>
        </div>
        {/* thumbnails for default view - have to be outside of "carousel" div for styling */}
        <div className="thumbnails">
          {/* button to see previous thumbnail */}
          <button type="button" className="changeThumbnails previous" style={firstThumbnailIndexShown ? {} : { display: 'none' }} onClick={this.previousThumbnail} onKeyDown={this.previousThumbnail}>˄</button>
          {/* button to see next thumbnail */}
          <button type="button" className="changeThumbnails next" style={firstThumbnailIndexShown >= images.length - 5 ? { display: 'none' } : {}} onClick={this.nextThumbnail} onKeyDown={this.nextThumbnail}>˅</button>
          {/* thumbnails */}
          <div className="images">
            {images.map((photo, index) => (
              (index >= firstThumbnailIndexShown && index <= firstThumbnailIndexShown + 4) ? <img alt="" key={photo.url} name={index} className={index === imageIndexInFocus ? 'thumbnail selected' : 'thumbnail'} onClick={this.thumbnailOnClick} onKeyDown={this.thumbnailOnClick} src={photo.thumbnail_url} /> : null
            ))}
          </div>
        </div>
      </>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.instanceOf(Array).isRequired,
};

export default Carousel;
