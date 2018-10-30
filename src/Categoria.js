import React, { Component } from "react";
import { Link } from "react-router-dom";

class Categoria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      produtos: [],
      categoria: {},
      id: null
    };

    this.loadData = this.loadData.bind(this);
    this.renderProduto = this.renderProduto.bind(this);
  }

  loadData(id) {
    this.setState({ id });
    this.props.loadProdutos(id);
    this.props.loadCategoria(id);
  }

  componentDidMount() {
    const id = this.props.match.params.catId;
    this.loadData(id);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.match.params.catId !== this.state.id) {
      this.loadData(newProps.match.params.catId);
    }
  }

  renderProduto(produto) {
    return (
      <p className="well" key={produto.id}>
        {produto.produto}
        <button
          onClick={() => {
            this.props
              .removeProduto(produto)
              .then(res => this.loadData(this.props.match.params.catId));
          }}
          style={{ marginLeft: "10px" }}
          className="btn btn-sm btn-danger"
        >
          Excluir
        </button>
        <Link
          to={"/produtos/editar/" + produto.id}
          style={{ marginLeft: "3px" }}
          className="btn btn-sm btn-warning"
        >
          Editar
        </Link>
      </p>
    );
  }

  render() {
    return (
      <div>
        <h1>{this.props.categoria && this.props.categoria.categoria}</h1>
        {this.props.produtos.length === 0 && (
          <p className="alert alert-danger">Nenhum produto cadastrado.</p>
        )}
        {this.props.produtos.map(this.renderProduto)}
      </div>
    );
  }
}

export default Categoria;
