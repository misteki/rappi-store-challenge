import React from 'react';
import Modal from 'simple-react-modal';
import PropTypes from 'prop-types';

import './AddToCartModal.css';

class AddToCartModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
    };
    this.confirm = this.confirm.bind(this);
  }

  updateAmount(amount) {
    this.setState({
      amount,
    });
  }

  confirm(product, productAmount) {
    const { onConfirm } = this.props;
    this.setState({
      amount: 0,
    });
    onConfirm(product, productAmount);
  }

  render() {
    const {
      product,
      open,
      onClose,
    } = this.props;

    const { amount } = this.state;

    return (
      <Modal
        containerClassName="edit-product-modal-container"
        closeOnOuterClick
        show={open}
        onClose={() => { onClose(); }}
      >
        <p>Cuantas unidades deseas agregar al carrito?</p>
        {product
          && (
          <p>
            Actualmente hay
            {' '}
            <b>{product.quantity}</b>
            {' '}
            en stock.
          </p>
          )
        }
        <input
          className="amount-input"
          type="number"
          name="amount"
          id="amount"
          min={0}
          max={product ? product.quantity : 0}
          step={1}
          value={amount}
          onChange={(e) => { this.updateAmount(e.target.value); }}
        />
        <button
          type="button"
          title="Confirmar cantidad"
          className="confirm-button"
          disabled={amount < 1 || amount > product.quantity}
          onClick={() => { this.confirm(product, amount); }}
        >
        Agregar al carrito
        </button>
      </Modal>
    );
  }
}

AddToCartModal.propTypes = {
  open: PropTypes.bool,
  product: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

AddToCartModal.defaultProps = {
  open: false,
  product: null,
};

export default AddToCartModal;
