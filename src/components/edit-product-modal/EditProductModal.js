import React from 'react';
import Modal from 'simple-react-modal';
import PropTypes from 'prop-types';

import './EditProductModal.css';

class EditProductModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
    };
    this.confirm = this.confirm.bind(this);
  }

  componentDidMount() {
    const { product } = this.props;
    if (product && product.amount) {
      this.setState({
        amount: product.amount,
      });
    }
  }

  updateAmount(amount) {
    this.setState({
      amount,
    });
  }

  confirm(product, productAmount) {
    const { onAdd, onEdit, mode } = this.props;
    this.setState({
      amount: 0,
    });
    if (mode === 'add') {
      onAdd(product, productAmount);
    } else {
      onEdit(product, productAmount);
    }
  }

  remove(product) {
    const { onRemove } = this.props;
    this.setState({
      amount: 0,
    });
    onRemove(product);
  }

  render() {
    const {
      product,
      open,
      mode,
      onClose,
    } = this.props;

    const { amount } = this.state;

    return (
      <Modal
        containerClassName="edit-product-modal"
        closeOnOuterClick
        show={open}
        onClose={() => { onClose(); }}
      >
        <header>
          <h2>{product.name}</h2>
        </header>
        <section className="edit-product-modal__body">
          <p>
            {
            mode === 'add'
              ? '¿Cuántas unidades deseas agregar al carrito?'
              : `Hay ${product.amount} unidades de este producto en tu carrito. Puedes editar la cantidad.`
            }
          </p>
          <p>
            Actualmente hay
            {' '}
            <b>{product.quantity}</b>
            {' '}
            en stock.
          </p>
          <input
            className="edit-product-modal__amount_input"
            type="number"
            name="amount"
            id="amount"
            min={0}
            max={product.quantity || 0}
            step={1}
            value={amount}
            onChange={(e) => { this.updateAmount(parseInt(e.target.value, 10)); }}
          />
        </section>
        <footer className="edit-product-modal__footer">
          { mode === 'remove'
            && (
            <button
              type="button"
              title="Eliminar producto"
              className="edit-product-modal__cancel-button"
              onClick={() => { this.remove(product); }}
            >
                  Eliminar producto
            </button>
            )
        }
          <button
            type="button"
            title={mode === 'add' ? 'Agregar al carrito' : 'Confirmar'}
            className="edit-product-modal__confirm-button"
            disabled={amount < 1 || amount > product.quantity}
            onClick={() => { this.confirm(product, amount); }}
          >
            {mode === 'add' ? 'Agregar al carrito' : 'Confirmar'}
          </button>
        </footer>
      </Modal>
    );
  }
}

EditProductModal.propTypes = {
  open: PropTypes.bool,
  product: PropTypes.object.isRequired,
  mode: PropTypes.oneOf(['add', 'edit']).isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

EditProductModal.defaultProps = {
  open: false,
};

export default EditProductModal;
