export interface Equipment {
  id: string;
  name: string;
  image: string;
  monthlyPrice: number;
  originalPrice: number;
  discount: number;
  deliveryTime: string;
  isNew?: boolean;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
} 