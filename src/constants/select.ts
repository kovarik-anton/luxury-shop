export const reviewSelect = {
  id: true,
  review: true,
  rating: true,
  size: true,
  variant: true,
  product: true,
  user: {
    select: {
      name: true,
      picture: true,
    },
  },
};

export const sizeSelect = {
  price: true,
  discount: true,
  size: true,
  stock: true,
};

export const sizeSelectWithId = {
  id: true,
  ...sizeSelect,
};
