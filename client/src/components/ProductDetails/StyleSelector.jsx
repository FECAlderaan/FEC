import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import AddToCart from './AddToCart'

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: [],
      selected: 0
    }
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.getStyles();
  }

  getStyles() {
    $.ajax({
      type: 'GET',
      url: `http://localhost:8080/atelier/products/${this.props.productId}/styles`,
      success: (data) => {
        this.setState({styles: data.results});
      },
      error: (err) => {
        console.log('error!', err);
      }
    })
  }

  onClick(e) {
    this.setState({selected: e.target.name});
  }

  render() {
    return (
      <div className='style-selector'>
        <div className='price'>
          {this.state.styles[this.state.selected] && this.state.styles[this.state.selected].sale_price ?
            <><span className='sale-price'>{'$' + this.state.styles[this.state.selected].sale_price}</span>
            <span className='original-price-strikethrough'>{'$' + this.state.styles[this.state.selected].original_price}</span></>
          :
            <span className='original-price' style={{'marginLeft': '5px'}}>{this.state.styles[this.state.selected] ? '$' + this.state.styles[this.state.selected].original_price : ''}</span>}
        </div>
        <div className='style-name'>
          <span>STYLE: </span>
          <span>{this.state.styles[this.state.selected] ? this.state.styles[this.state.selected].name.toUpperCase() : ''}</span>
        </div>
        {this.state.styles ? this.state.styles.map((style, index) => {
          return (
            <>
            <span className='style-option' key={style.style_id}>
              {index === Number(this.state.selected) ? <span className='checkmark'>✔️</span> : ''}
              <img className={index === Number(this.state.selected) ? 'selected-thumbnail' : ''} src={style.photos[0].thumbnail_url} name={index} onClick={this.onClick}></img>
            </span>
            {((index + 1) % 4) ? '' : <br/>}
            </>
          )
        }) : ''}
        <AddToCart selectedStyle={this.state.styles[this.state.selected]}/>
      </div>
    )
  }
}

StyleSelector.propTypes = {
  productId: PropTypes.number
}

export default StyleSelector;