
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.23.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { chart } = await req.json();
    
    // Create Supabase client with Admin privileges
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );
    
    // Get user ID from JWT
    const {
      data: { user },
    } = await supabaseAdmin.auth.getUser();
    
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    let data = [];
    
    if (chart === 'status') {
      // Sample status data for demonstration
      data = [
        { name: 'Draft', value: 2, color: '#94a3b8' },
        { name: 'Submitted', value: 3, color: '#3b82f6' },
        { name: 'Under Review', value: 2, color: '#eab308' },
        { name: 'Approved', value: 1, color: '#22c55e' },
        { name: 'Rejected', value: 1, color: '#ef4444' }
      ];
    } else if (chart === 'category') {
      // Sample category data
      data = [
        { name: 'Research', value: 3, color: '#3b82f6' },
        { name: 'Education', value: 2, color: '#22c55e' },
        { name: 'Community', value: 2, color: '#eab308' },
        { name: 'Arts', value: 1, color: '#ec4899' },
        { name: 'Technology', value: 1, color: '#8b5cf6' }
      ];
    } else if (chart === 'monthly') {
      // Sample monthly data
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      data = months.map((month, index) => {
        // Generate some sample data with a realistic pattern
        let count = 0;
        if (index < 6) {
          // Past months have some data
          count = Math.floor(Math.random() * 3);
        } else if (index === 6 || index === 7) {
          // Current month has more activity
          count = Math.floor(Math.random() * 4) + 1;
        }
        
        return {
          name: month,
          count: count
        };
      });
    }
    
    return new Response(
      JSON.stringify({ data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error("Error in get-chart-data function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
