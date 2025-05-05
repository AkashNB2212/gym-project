import { Metadata } from 'next';
import CategoryPageClient from './CategoryPageClient';
import equipmentData from '@/data/equipment.json';

interface PageProps {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = equipmentData.categories.find(cat => cat.id === params.id);
  return {
    title: `${category?.name || 'Category'} Equipment - Gym Z`,
    description: `Browse our selection of ${category?.name.toLowerCase() || 'gym'} equipment for rent.`
  };
}

export default function CategoryPage({ params }: PageProps) {
  // Find category name and equipment data
  const category = equipmentData.categories.find(cat => cat.id === params.id);
  const categoryName = category ? category.name : 'Category';
  const equipment = equipmentData.equipment;

  return <CategoryPageClient categoryName={categoryName} equipment={equipment} categoryId={params.id} />;
} 