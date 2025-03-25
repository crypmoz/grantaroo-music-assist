
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ApplicationStatusChart } from "./ApplicationStatusChart";
import { GrantCategoryChart } from "./GrantCategoryChart";
import { MonthlyActivityChart } from "./MonthlyActivityChart";
import { CategoryAnalysis } from "./CategoryAnalysis";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export const StatisticsOverview = () => {
  const [statusData, setStatusData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { session } = useAuth();
  
  useEffect(() => {
    const fetchChartData = async () => {
      if (!session?.access_token) return;
      
      setIsLoading(true);
      
      try {
        // Fetch status chart data
        const statusResponse = await supabase.functions.invoke('get-chart-data', {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
          body: { chart: 'status' }
        });
        
        if (statusResponse.error) {
          console.error("Error fetching status data:", statusResponse.error);
        } else {
          setStatusData(statusResponse.data?.data || []);
        }
        
        // Fetch category chart data
        const categoryResponse = await supabase.functions.invoke('get-chart-data', {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
          body: { chart: 'category' }
        });
        
        if (categoryResponse.error) {
          console.error("Error fetching category data:", categoryResponse.error);
        } else {
          setCategoryData(categoryResponse.data?.data || []);
        }
        
        // Fetch monthly chart data
        const monthlyResponse = await supabase.functions.invoke('get-chart-data', {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
          body: { chart: 'monthly' }
        });
        
        if (monthlyResponse.error) {
          console.error("Error fetching monthly data:", monthlyResponse.error);
        } else {
          setMonthlyData(monthlyResponse.data?.data || []);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchChartData();
  }, [session]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
            <CardDescription>
              Distribution of your applications by status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ApplicationStatusChart data={statusData} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Grant Categories</CardTitle>
            <CardDescription>
              Distribution of grants by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GrantCategoryChart data={categoryData} />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Monthly Activity</CardTitle>
          <CardDescription>
            Application submissions over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MonthlyActivityChart data={monthlyData} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Category Analysis</CardTitle>
          <CardDescription>
            Success rates by grant category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CategoryAnalysis data={categoryData} />
        </CardContent>
      </Card>
    </div>
  );
};

