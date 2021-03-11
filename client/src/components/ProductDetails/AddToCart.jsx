/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeSelected: 'none',
      quantitySelected: 'none',
      noSizeSelectedMessageDisplay: 'none',
    };
    this.sizeSelectorOnChange = this.sizeSelectorOnChange.bind(this);
    this.quantitySelectorOnChange = this.quantitySelectorOnChange.bind(this);
    this.addToCartOnClick = this.addToCartOnClick.bind(this);
    this.sizeSelector = React.createRef();
  }

  addToCartOnClick() {
    const { sizeSelected } = this.state;
    let { quantitySelected } = this.state;
    const { selectedStyle, getCart } = this.props;
    if (sizeSelected === 'none') {
      this.setState({ noSizeSelectedMessageDisplay: 'block' });
      this.sizeSelector.current.focus();
    } else {
      const skuID = selectedStyle.reduce((match, sku) => {
        if (sku[1].size === sizeSelected) {
          return sku[0];
        }
        return match;
      }, 0);
      while (quantitySelected > 0) {
        let successCB;
        if (quantitySelected === 1) {
          successCB = getCart;
        } else {
          successCB = () => {};
        }
        $.ajax({
          type: 'POST',
          url: '/atelier/cart',
          data: JSON.stringify({ sku_id: skuID }),
          contentType: 'application/json',
          success: successCB,
        });
        quantitySelected -= 1;
      }
    }
  }

  sizeSelectorOnChange(e) {
    const { sizeSelected } = this.state;
    this.setState({ sizeSelected: e.target.value, noSizeSelectedMessageDisplay: 'none' });
    if (sizeSelected === 'none') {
      this.setState({ quantitySelected: 1 });
    }
  }

  quantitySelectorOnChange(e) {
    this.setState({ quantitySelected: e.target.value });
  }

  render() {
    const { noSizeSelectedMessageDisplay, sizeSelected, quantitySelected } = this.state;
    const { inStock, selectedStyle, skus } = this.props;
    return (
      <div className="add-to-cart">
        <div className="size">
          <div style={{ display: noSizeSelectedMessageDisplay, color: 'red', marginLeft: '5px' }}>Please select a size:</div>
          <select
            ref={this.sizeSelector}
            className="size-selector"
            value={sizeSelected}
            disabled={!(inStock)}
            onChange={this.sizeSelectorOnChange}
          >
            {!(inStock) ? <option value="none" disabled hidden>OUT OF STOCK</option> : <option value="none" disabled hidden>SELECT SIZE</option>}
            {selectedStyle.map((sku) => <option key={sku[0]} value={sku[1].size}>{sku[1].size}</option>)}
          </select>
        </div>
        <div className="quantity">
          <div style={{ display: noSizeSelectedMessageDisplay, color: 'rgba(0,0,0,0)' }}>shift down</div>
          <select
            className="quantity-selector"
            value={quantitySelected}
            disabled={sizeSelected === 'none'}
            onChange={this.quantitySelectorOnChange}
          >
            <option value="none" disabled hidden> Qty: - </option>
            {new Array(Math.min(skus[sizeSelected] || 0, 15)).fill(0).map((e, index) => <option key={index + 1} value={index + 1}>{index + 1}</option>)}
          </select>
        </div>
        <button type="button" onClick={this.addToCartOnClick} hidden={!(inStock)}>
          <i className="fas fa-shopping-cart" />
          <span>ADD TO CART</span>
        </button>
      </div>
    );
  }
}

AddToCart.propTypes = {
  selectedStyle: PropTypes.instanceOf(Array).isRequired,
  inStock: PropTypes.number.isRequired,
  skus: PropTypes.instanceOf(Object).isRequired,
  getCart: PropTypes.func.isRequired,
};

export default AddToCart;
