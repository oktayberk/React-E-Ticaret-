import React, { Component } from "react";
import CategoryList from "./CategoryList";
import Navi from "./Navi";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";

export default class App extends Component {
  state = { currentCategory: "", products: [], cart:[] }; //5cart sepet demek statede bir cart olusturuyoruz

  componentDidMount() {
    this.getProducts();
  }

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };

  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };
  addToCart=(product)=>{  //4buraya bir  addto cart operasyonu ekliyoruz
    let newCart=this.state.cart; //4this.state deki cartı newCart olarak atadık
    var addedItem=newCart.find(c=>c.product.id===product.id); //4daha once eklenmişmi diye bakıyoruz
    if(addedItem){//eger daha once eklenmişse
      addedItem.quantity+=1 ; //hiç yeniden ekleme quantitysini +=1 yap dıyoruz
    }else{//eger eklenmemişse push işlemini yap diyoruz
      newCart.push({product:product,quantity:1}); //4newcart arrayıne yeni bir eleman ekledik push ile 
    }
    this.setState({cart:newCart});//4statei de bu şekilde set ettik
}

  render() {
    let productInfo = { title: "Product List" };
    let categoryInfo = { title: "Category List" };
    return (
      <div>
        <Container>
          <Navi cart={this.state.cart} /> {/* 7-olusan cartı naviye bu şekilde gonderiyoruz ve this.statedeki cart oldugunu soyluyoruz. Yani o degiştikce navinin yanında yazacak */}
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              <ProductList
                products={this.state.products}
                addToCart={this.addToCart} //5 productlist.js  bir fonksiyon gonderiyoruz bunu soyluyoruz
                currentCategory={this.state.currentCategory}
                info={productInfo}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
