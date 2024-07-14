import {addToCart, cart, loadFromStorage, addedMessageTimeouts} from '../../data/cart.js';

describe('test suite: addToCart', () => {
  beforeEach(() => {

    const quantitySelectorMock = {
      value: '1'
    };

    const addedMessageMock = {
      classList: {
        add: jasmine.createSpy('add'),
      }
    };

    spyOn(document, 'querySelector').and.callFake((selector) => {
      if (selector.startsWith('.js-quantity-selector-')) {
        return quantitySelectorMock;
      }
      if (selector.startsWith('.js-added-to-cart-')) {
        return addedMessageMock;
      }
      return null;
    });

    spyOn(localStorage, 'setItem');
  });

  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });

  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });
});