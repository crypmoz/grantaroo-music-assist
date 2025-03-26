
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { FileText, FileImage, FileArchive } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type DocTypeCount = {
  name: string;
  value: number;
  color: string;
};

export const DocumentStatistics = () => {
  const [docTypes, setDocTypes] = useState<DocTypeCount[]>([]);
  const [totalDocs, setTotalDocs] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    
    const fetchDocumentStats = async () => {
      setIsLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('grant_documents')
          .select('file_type');
          
        if (error) throw error;
        
        if (data.length === 0) {
          setDocTypes([]);
          setTotalDocs(0);
          return;
        }
        
        // Count document types
        const typeCounts: Record<string, number> = {};
        data.forEach(doc => {
          const type = getGeneralFileType(doc.file_type);
          typeCounts[type] = (typeCounts[type] || 0) + 1;
        });
        
        // Convert to array for chart
        const typeData: DocTypeCount[] = Object.entries(typeCounts).map(([name, value]) => ({
          name,
          value,
          color: getColorForType(name)
        }));
        
        setDocTypes(typeData);
        setTotalDocs(data.length);
      } catch (error) {
        console.error("Error fetching document stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDocumentStats();
  }, [user]);

  const getGeneralFileType = (mimeType: string): string => {
    if (mimeType.includes('pdf')) {
      return 'PDF';
    } else if (mimeType.includes('word') || mimeType.includes('document')) {
      return 'Word';
    } else if (mimeType.includes('text')) {
      return 'Text';
    } else {
      return 'Other';
    }
  };

  const getColorForType = (type: string): string => {
    switch (type) {
      case 'PDF':
        return '#ff5b5b';
      case 'Word':
        return '#3b82f6';
      case 'Text':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const renderFileTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <FileText className="h-4 w-4 text-red-500" />;
      case 'Word':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'Text':
        return <FileText className="h-4 w-4 text-green-500" />;
      default:
        return <FileArchive className="h-4 w-4 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Document Statistics</CardTitle>
          <CardDescription>Overview of your grant resources</CardDescription>
        </CardHeader>
        <CardContent className="h-[200px] flex items-center justify-center">
          <Skeleton className="h-[180px] w-[180px] rounded-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Statistics</CardTitle>
        <CardDescription>Overview of your grant resources</CardDescription>
      </CardHeader>
      <CardContent>
        {totalDocs === 0 ? (
          <div className="text-center py-6">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No documents uploaded yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-[200px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={docTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {docTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="text-center mb-2">
                <h4 className="text-3xl font-bold">{totalDocs}</h4>
                <p className="text-sm text-muted-foreground">Total Documents</p>
              </div>
              <div className="space-y-2">
                {docTypes.map((type, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {renderFileTypeIcon(type.name)}
                      <span>{type.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{type.value}</span>
                      <span className="text-muted-foreground text-sm">
                        ({((type.value / totalDocs) * 100).toFixed(0)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
