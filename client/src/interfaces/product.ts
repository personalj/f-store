interface ProductInterface {
    id: number;
    title: string;
    description: string;
    price: number;
    color_id: number;
    quantity: number;
    // rating: {
    //     rate: number;
    //     count: number;
    // }
    rate: number,
    image: string;
  }

export default ProductInterface;
