interface ProductInterface {
    id: number;
    title: string;
    description: string;
    price: number;
    amount: number;
    image: string;
    color: string;
    categories: string[];
    rating: {
        rate: number;
        count: number;
    }
    quantity?: number | undefined;
  }

export default ProductInterface;
