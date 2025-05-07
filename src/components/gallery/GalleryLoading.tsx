
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function GalleryLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(8).fill(null).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="aspect-[3/4] bg-gray-100 animate-pulse" />
          <CardContent className="p-4">
            <div className="h-4 bg-gray-100 rounded animate-pulse mb-2" />
            <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
