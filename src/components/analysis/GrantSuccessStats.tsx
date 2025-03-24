
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { successfulApplications } from "@/data/successfulGrantsData";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A259FF'];

export const GrantSuccessStats = () => {
  // Calculate success by career stage
  const careerStageData = successfulApplications.reduce((acc, app) => {
    const stage = app.applicantType.split('(')[0].trim();
    const existing = acc.find(item => item.name === stage);
    
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: stage, value: 1 });
    }
    
    return acc;
  }, [] as { name: string; value: number }[]);
  
  // Extract common success factors
  const allFactors = successfulApplications.flatMap(app => app.successFactors);
  const factorFrequency: Record<string, number> = {};
  
  allFactors.forEach(factor => {
    const key = factor.split(' ').slice(0, 2).join(' '); // Simplified key
    factorFrequency[key] = (factorFrequency[key] || 0) + 1;
  });
  
  const factorData = Object.entries(factorFrequency)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5); // Top 5 factors
  
  // Grant success by type
  const grantSuccessData = successfulApplications.reduce((acc, app) => {
    const existing = acc.find(item => item.name === app.grantId);
    
    if (existing) {
      existing.value += 1;
    } else {
      const grantName = app.grantId.split('-').join(' ').toUpperCase();
      acc.push({ name: grantName, value: 1 });
    }
    
    return acc;
  }, [] as { name: string; value: number }[]);
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Ontario Music Grant Success Analysis</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Success by Career Stage</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={careerStageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {careerStageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Top Success Factors</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={factorData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8">
                    {factorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Key Insights from Successful Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li className="text-sm">
              <span className="font-medium">Clear artistic vision</span> appears in 80% of successful applications
            </li>
            <li className="text-sm">
              <span className="font-medium">Community engagement</span> is highlighted in 65% of Toronto Arts Council grants
            </li>
            <li className="text-sm">
              <span className="font-medium">Detailed budget allocation</span> with specific percentages is common in FACTOR applications
            </li>
            <li className="text-sm">
              <span className="font-medium">Previous track record</span> is emphasized more heavily for established artists
            </li>
            <li className="text-sm">
              <span className="font-medium">Cultural significance</span> is a key factor for Canada Council grants
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
