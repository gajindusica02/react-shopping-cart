import React, { Component } from 'react';
import formatCurrency from "../util";
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

export default class Products extends Component {
  constructor(props){
    super(props);
    this.state = {
      productForModal: null,
    };
  }

  openModal = (product) =>{
    this.setState({
      productForModal:product
    })
  }

  closeModal = () =>{
    this.setState({
      productForModal: null
    });
  }

  render() {
    const {productForModal} = this.state;
    return (
      <div>
        <Fade bottom cascade >
         
          <ul className="products">
            {this.props.products.map((product)=>(
              <li key={product.id}>
                <div className="product">
                    <a 
                         href={"#" + product._id} 
                         onClick={() => this.openModal(product)}>
                      <img src={product.image} alt={product.title}></img>
                      <p>{product.title}</p>
                    </a>
                    <div className="product-price">
                        <div>{formatCurrency(product.price)}</div> 
                        <button className="button primary" onClick={() => this.props.addToCart(product)}>
                          Add to Cart
                        </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          </Fade>
          {
            productForModal && (
              <Modal 
              isOpen={true}
              onRequestClose={this.closeModal}

              >
                <Zoom>
                  
                  <div className="product-details">
                  <button className="close-modal" onClick={this.closeModal}>x</button>
                    <img src={productForModal.image} alt={productForModal.title}></img>
                  
                  <div className="product-details-description">
                     <strong><p>{productForModal.title}</p></strong>
                     <p>{productForModal.description}</p>
                     <p>
                       Available sizes {" "}
                        {productForModal.availableSizes.map((size) =>(
                          <span><button className="button">{size}</button></span>
                        ))}
                     </p>
                     <div className="product-price">
                        {formatCurrency(productForModal.price)}
                      </div>
                      <button className="button primary" onClick={() =>{
                        this.props.addToCart(productForModal); 
                        this.closeModal();
                        }}>
                          Add To Cart
                     </button>        
                     </div>
                  </div>
                </Zoom>
              </Modal>
            )
          }
      </div>
    )
  }
}
