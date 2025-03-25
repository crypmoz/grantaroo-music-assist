
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create supabase admin client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get user ID from request
    const authHeader = req.headers.get("Authorization")?.replace("Bearer ", "");
    
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "No authorization header" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
      );
    }

    // Verify the JWT
    const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader);
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
      );
    }

    // Get the chart type from the URL
    const url = new URL(req.url);
    const chartType = url.searchParams.get("chart") || "status";
    
    // Get applications for this user
    const { data: applications, error: fetchError } = await supabase
      .from("applications")
      .select("status, created_at, grant:grant_id(category)")
      .eq("user_id", user.id);
    
    if (fetchError) {
      return new Response(
        JSON.stringify({ error: fetchError.message }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    // Process data based on chart type
    let chartData;
    
    switch (chartType) {
      case "status":
        const statusCounts = {
          draft: 0,
          submitted: 0,
          approved: 0,
          rejected: 0
        };
        
        applications.forEach(app => {
          if (app.status in statusCounts) {
            statusCounts[app.status as keyof typeof statusCounts]++;
          }
        });
        
        chartData = Object.keys(statusCounts).map(status => ({
          name: status.charAt(0).toUpperCase() + status.slice(1),
          value: statusCounts[status as keyof typeof statusCounts]
        }));
        break;
        
      case "category":
        const categoryCounts: Record<string, number> = {};
        
        applications.forEach(app => {
          const category = app.grant?.category || "Uncategorized";
          categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });
        
        chartData = Object.keys(categoryCounts).map(category => ({
          name: category,
          value: categoryCounts[category]
        }));
        break;
        
      case "monthly":
        const monthlyData: Record<string, number> = {};
        const now = new Date();
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(now.getMonth() - 5);
        
        // Initialize last 6 months
        for (let i = 0; i < 6; i++) {
          const d = new Date(sixMonthsAgo);
          d.setMonth(sixMonthsAgo.getMonth() + i);
          const monthYear = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
          monthlyData[monthYear] = 0;
        }
        
        // Count applications by month
        applications.forEach(app => {
          if (app.created_at) {
            const date = new Date(app.created_at);
            const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            if (monthYear in monthlyData) {
              monthlyData[monthYear]++;
            }
          }
        });
        
        chartData = Object.keys(monthlyData).sort().map(month => {
          const [year, monthNum] = month.split('-');
          const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const monthName = monthNames[parseInt(monthNum) - 1];
          return {
            name: `${monthName} ${year}`,
            applications: monthlyData[month]
          };
        });
        break;
        
      default:
        chartData = [];
    }

    // Return the processed data
    return new Response(
      JSON.stringify({ data: chartData }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
