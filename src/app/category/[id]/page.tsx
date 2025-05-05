import CategoryPageClient from './CategoryPageClient';
import equipmentData from '@/data/equipment.json';

interface PageProps {
  params: {
    id: string;
  };
}

export default function CategoryPage({ params }: PageProps) {
  // Find category name and equipment data
  const category = equipmentData.categories.find(cat => cat.id === params.id);
  const categoryName = category ? category.name : 'Category';
  const equipment = equipmentData.equipment;

  return <CategoryPageClient categoryName={categoryName} equipment={equipment} categoryId={params.id} />;
} 