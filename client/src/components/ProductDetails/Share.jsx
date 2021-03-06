/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import PropTypes from 'prop-types';

const Share = ({ productId }) => (
  <div className="share">
    <div className="fb-share-button" data-href={`http://127.0.0.1:8080/products/${productId}`} data-layout="button" data-size="small">
      <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2F127.0.0.1%3A8080%2Fproducts%2F19092&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">Share</a>
    </div>

    <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-url={`http://127.0.0.1:8080/products/${productId}`} data-hashtags="Catwalk" data-show-count="false">Tweet</a>

    <a href="https://www.pinterest.com/pin/create/button/" data-pin-do="buttonBookmark" className="pinterest-share-button" aria-label="Pin on Pinterest">Pin</a>
  </div>
);

Share.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default Share;
