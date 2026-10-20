const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

describe('sortProductsByPrice', () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    expect(sortProductsByPrice(products, 'asc').map((prod) => prod.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });
  test("все товары без направления сортируются как [3, 6, 5, 4, 2, 1]", () => {
    expect(sortProductsByPrice(products).map((prod) => prod.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });
  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    const selectProd = products.filter((prod) => [1, 3, 4].includes(prod.id));
    expect(sortProductsByPrice(selectProd, 'asc').map((prod) => prod.id)).toEqual([3, 4, 1]);
  });
  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    expect(sortProductsByPrice(products, 'desc').map((prod) => prod.id)).toEqual([1, 2, 4, 5, 6, 3]);
  });
  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    const selectProd = products.filter((prod) => [3, 1, 4].includes(prod.id));
    expect(sortProductsByPrice(selectProd, 'desc').map((prod) => prod.id)).toEqual([1, 4, 3]);
  });
  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    const selectProd = products.filter((prod) => [5, 2, 6].includes(prod.id));
    expect(sortProductsByPrice(selectProd, 'desc').map((prod) => prod.id)).toEqual([2, 5, 6]);
  });
  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const arrOfSelectedProducts = products.filter((prod) => [1, 3, 4].includes(prod.id));
    sortProductsByPrice(arrOfSelectedProducts, 'asc');
    expect(arrOfSelectedProducts).toEqual(
      products.filter((item) => [1, 3, 4].includes(item.id))
    );
  });
  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const arrOfSelectedProducts = products.filter((prod) => [1, 3, 4].includes(prod.id));
    sortProductsByPrice(arrOfSelectedProducts, 'desc');
    expect(arrOfSelectedProducts).toEqual(
      products.filter((item) => [1, 3, 4].includes(item.id))
    );
  });
  test("направление по умолчанию не меняет исходный массив всех товаров", () => {
    sortProductsByPrice(products);
    expect(products.map((prod) => prod.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
