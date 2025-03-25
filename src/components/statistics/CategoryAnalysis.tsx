
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CategoryItem {
  name: string;
  value: number;
  color: string;
}

interface CategoryAnalysisProps {
  data: CategoryItem[];
}

export const CategoryAnalysis = ({ data }: CategoryAnalysisProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Grant Categories Analysis</CardTitle>
        <CardDescription>
          Success rates by different grant categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {data.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{category.name}</span>
                <span className="text-sm">{category.value} applications</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full" 
                  style={{ 
                    backgroundColor: category.color,
                    width: `${Math.min(100, (category.value / 5) * 100)}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
