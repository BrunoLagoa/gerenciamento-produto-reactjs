import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class ProdutosNovo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    };

    this.handleNewProduto = this.handleNewProduto.bind(this);
  }

  handleNewProduto() {
    const produto = {
      produto: this.refs.produto.value,
      categoria: this.refs.categoria.value
    };
    this.props
      .createProduto(produto)
      .then(res =>
        this.setState({ redirect: "/produtos/categoria/" + produto.categoria })
      );
  }

  render() {
    const { categorias } = this.props;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div>
        <h2>Novo Produto</h2>
        <div className="row">
          <div className="form-group col-sm-6">
            <select ref="categoria" className="form-control">
              {categorias.map(c => (
                <option key={c.id} value={c.id}>
                  {c.categoria}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="form-group col-sm-6">
            <input
              ref="produto"
              className="form-control"
              placeholder="Nome do novo produto"
            />
          </div>
        </div>

        <button onClick={this.handleNewProduto} className="btn btn-info">
          Salvar
        </button>
      </div>
    );
  }
}

export default ProdutosNovo;
