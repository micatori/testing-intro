function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, count) {
  if (count <= 0) {
    throw new RangeError();
  }
  const itemInCart = cart.find((item) => item.id === product.id);
  const addCount = itemInCart ? itemInCart.quantity + count : count;
  if (addCount > product.stock) {
    throw new RangeError();
  }
  if (itemInCart) {
    return cart.map((item) =>
      item.id === product.id ? {...item, quantity: addCount} : item
    )
  }
  return [...cart, {...product, quantity: count}];
}

function changeQuantity() { return notImplemented(); }
function removeFromCart() { return notImplemented(); }
function calculateCartSubtotal() { return notImplemented(); }
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
