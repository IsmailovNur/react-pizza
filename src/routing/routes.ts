export const AppRoutes = {
  main: '/',
  createDish: '/admin/create-dish',
  editDish: '/admin/create-dish/:id',
  adminDishes: '/admin/dishes',
  adminOrders: '/admin/orders',
  notFound: '*',
} as const;