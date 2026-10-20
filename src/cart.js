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

function changeQuantity(cart, id, count) {
  if (count <= 0) throw new RangeError('не принимает нулевое количество');
  const item = cart.find((item) => item.id === id);
  if (!item) return cart;
  if (count > item.stock) throw new RangeError('не позволяет указать количество больше остатка');
  return cart.map((el) => el.id === id ? { ...el, quantity: count} : el);
}

function removeFromCart(cart, id) {
  return cart.filter((el) => el.id !== id);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((sum, acc) => sum + acc.price * acc.quantity, 0);
}

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);
  let discount = 0;
  const delivery = subtotal >= 50000 ? 0 : 30000;
  if (promoCode === 'SAVE10' && subtotal >= 20000) {
    discount = subtotal * 0.1;
  }
  const total = subtotal + delivery - discount;
  return { subtotal, discount, delivery, total};
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
