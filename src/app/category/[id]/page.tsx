import { Metadata } from 'next';
import CategoryPageClient from './CategoryPageClient';
import equipmentData from '@/data/equipment.json';

type CategoryPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata(
  { params }: CategoryPageProps
): Promise<Metadata> {
  const category = equipmentData.categories.find(cat => cat.id === params.id);
  return {
    title: `${category?.name || 'Category'} Equipment - Gym Z`,
    description: `Browse our selection of ${category?.name.toLowerCase() || 'gym'} equipment for rent.`
  };
}

export default function CategoryPage(props: CategoryPageProps) {
  const { id } = props.params;
  const category = equipmentData.categories.find(cat => cat.id === id);
  const categoryName = category ? category.name : 'Category';
  const equipment = equipmentData.equipment;

  return (
    <CategoryPageClient 
      categoryName={categoryName} 
      equipment={equipment} 
      categoryId={id} 
    />
  );
} 