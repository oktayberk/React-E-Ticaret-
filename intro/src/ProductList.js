import React, { Component } from "react";
import { Table,Button } from "reactstrap"; //3.button reactstrapten geldigi için buraya ekliyoruz.

export default class ProductList extends Component {
   

  render() {
    return (
      <div>
        <h3>
          {this.props.info.title}-{this.props.currentCategory}
        </h3>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity Per Unit</th>
              <th>Units In Stock</th>
              <th></th> {/* 1 buton için boş bir kolon ekledik */}
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product) => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>{product.productName}</td>
                <td>{product.unitPrice}</td>
                <td>{product.quantityPerUnit}</td>
                <td>{product.unitsInStock}</td>
                <td><Button onClick={()=>this.props.addToCart(product)} color="info" >Add</Button> </td> {/* 2 butonu ekliyoruz!!!6-this.props diyerek add to cart ı eklıyoruz */}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
