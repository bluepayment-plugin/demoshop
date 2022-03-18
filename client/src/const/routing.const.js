export const ROUTING = {
  start: '/',
  product: '/produkt',
  cart: '/koszyk',
  delivery: '/dostawa-i-platnosc',
  summary: '/podsumowanie',
  return: '/powrot-z-bramki'
}

export const routes = [
  {
    path: ROUTING.start,
    name: 'Products',
    component: () => import('../views/ProductsView')
  },
  {
    path: ROUTING.product,
    name: 'Products',
    component: () => import('../views/ProductView')
  },
  {
    path: ROUTING.cart,
    name: 'Cart',
    component: () => import('../views/Cart')
  },
  {
    path: ROUTING.delivery,
    name: 'Delivery',
    component: () => import('../views/Delivery')
  },
  {
    path: ROUTING.summary,
    name: 'Delivery',
    component: () => import('../views/Summary')
  },
  {
    path: ROUTING.return,
    name: 'Return',
    component: () => import('../views/Return')
  },
  {
    path: '*',
    redirect: ROUTING.start
  }
]
