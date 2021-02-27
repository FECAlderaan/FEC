import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productInfo: {}
    }
  }

  componentDidMount() {
    this.getProductInfo();
  }

  getProductInfo() {
    $.ajax({
      type: 'GET',
      url: `http://localhost:8080/atelier/products/${this.props.productId}`,
      success: (data) => {
        this.setState({productInfo: data})
      },
      error: (err) => {
        console.log('error!', err);
      }
    })
  }

  render() {
    return (
      <>
        <div className='info'>
          <div className='category'>{this.state.productInfo.category}</div>
          <div className='name'>{this.state.productInfo.name}</div>
        </div>
        <div className='description'>{this.state.productInfo.description}</div>
      </>
    )
  }
}

ProductInfo.propTypes = {
  productId: PropTypes.number
}

export default ProductInfo;