import React from 'react';
import PropTypes from 'prop-types';

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
    if (this.state.sizeSelected === 'none') {
      this.setState({sizeSelected: e.target.value, quantitySelected: 1})
    } else {
      this.setState({sizeSelected: e.target.value})
    }
  }

  quantitySelectorOnChange(e) {
    this.setState({quantitySelected: e.target.value})
  }

  onButtonClick() {
    if (this.state.sizeSelected === 'none') {
      this.setState({noSizeSelectedMessageDisplay: 'block'})
      this.sizeSelector.current.focus();
    }
  }

  render() {
    return (
      <div className='add-to-cart'>
        <div className='size'>
          <div style={{'display': this.state.noSizeSelectedMessageDisplay, 'color': 'red'}}>Please select a size:</div>
          <select ref={this.sizeSelector} value={this.state.sizeSelected} className='size-selector' onChange={this.sizeSelectorOnChange} disabled={!this.props.selectedStyle || !(Object.entries(this.props.selectedStyle.skus).reduce((count, sku) => {
            return sku.quantity ? count + sku.quantity : count;
          }, 0))}>
            {(!this.props.selectedStyle || !(Object.entries(this.props.selectedStyle.skus).reduce((count, sku) => {
              return sku.quantity ? count + sku.quantity : count;
            }, 0))) ? <option value='none' disabled hidden>OUT OF STOCK</option> : <option value='none' disabled hidden>SELECT SIZE</option>}
            {this.props.selectedStyle ?
            Object.entries(this.props.selectedStyle.skus).map(sku => <option key={sku[0]} value={sku[1].size}>{sku[1].size}</option>)
            : ''}
          </select>
        </div>
        <div className='quantity'>
          <select disabled={this.state.sizeSelected === 'none' ? true : false} value={this.state.quantitySelected} className='quantity-selector' onChange={this.quantitySelectorOnChange}>
            <option value='none' disabled hidden> - </option>
            {this.props.selectedStyle ?
              new Array(Math.min(Object.values(this.props.selectedStyle.skus).reduce((matchingQuantity, sku) => {
                if (sku.size === this.state.sizeSelected) {
                  return sku.quantity;
                }
                return matchingQuantity;
              }, 0), 15)).fill(0).map((e, index) => <option key={index + 1} value={index + 1}>{index + 1}</option>)
              : ''}
          </select>
        </div>
        <button onClick={this.onButtonClick}>ADD TO CART</button>
      </div>
    );
  }
}

AddToCart.propTypes = {
  selectedStyle: PropTypes.object
}



export default AddToCart;