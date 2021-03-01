import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeSelected: 'none',
      quantitySelected: 'none',
      noSizeSelectedMessageDisplay: 'none'
    };
    this.sizeSelectorOnChange = this.sizeSelectorOnChange.bind(this);
    this.quantitySelectorOnChange = this.quantitySelectorOnChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.sizeSelector = React.createRef();
  }

  sizeSelectorOnChange(e) {
    this.state.sizeSelected === 'none' ? this.setState({sizeSelected: e.target.value, quantitySelected: 1}) : this.setState({sizeSelected: e.target.value});
  }

  quantitySelectorOnChange(e) {
    this.setState({quantitySelected: e.target.value})
  }

  onButtonClick() {
    if (this.state.sizeSelected === 'none') {
      this.setState({noSizeSelectedMessageDisplay: 'block'})
      this.sizeSelector.current.focus();
    } else {
      console.log(this.props.selectedStyle.reduce((match, sku) => {
        if (sku[1].size === this.state.sizeSelected) {
          return sku[0];
        }
        return match;
      }, 0));
      var skuID = this.props.selectedStyle.reduce((match, sku) => {
        if (sku[1].size === this.state.sizeSelected) {
          return sku[0];
        }
        return match;
      }, 0);
      $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/atelier/cart',
        data: JSON.stringify({sku_id: skuID}),
        contentType: 'application/json',
        success: () => {
          console.log('added to cart!')
        },
        error: (err) => { console.log('err:', err) }
      })
    }
  }

  render() {
    return (
      <div className='add-to-cart'>
        <div className='size'>
          <div style={{'display': this.state.noSizeSelectedMessageDisplay, 'color': 'red'}}>Please select a size:</div>
          <select ref={this.sizeSelector} className='size-selector'
          value={this.state.sizeSelected}
          disabled={!(this.props.inStock)}
          onChange={this.sizeSelectorOnChange}>
            {!(this.props.inStock) ? <option value='none' disabled hidden>OUT OF STOCK</option> : <option value='none' disabled hidden>SELECT SIZE</option>}
            {this.props.selectedStyle.map(sku => <option key={sku[0]} value={sku[1].size}>{sku[1].size}</option>)}
          </select>
        </div>
        <div className='quantity'>
          <select className='quantity-selector'
          value={this.state.quantitySelected}
          disabled={this.state.sizeSelected === 'none' ? true : false}
          onChange={this.quantitySelectorOnChange}>
            <option value='none' disabled hidden> Qty: - </option>
            {new Array(Math.min(this.props.skus[this.state.sizeSelected] || 0, 15)).fill(0).map((e, index) => <option key={index + 1} value={index + 1}>{index + 1}</option>)}
          </select>
        </div>
        <button onClick={this.onButtonClick} hidden={!(this.props.inStock)}><i className='fas fa-shopping-cart'></i> ADD TO CART</button>
      </div>
    );
  }
}

AddToCart.propTypes = {
  selectedStyle: PropTypes.array,
  inStock: PropTypes.number,
  skus: PropTypes.object
}

export default AddToCart;