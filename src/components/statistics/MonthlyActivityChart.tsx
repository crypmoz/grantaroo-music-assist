
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MonthlyActivityChartProps {
  data: Array<{
    name: string;
    applications: number;
    approvals: number;
  }>;
}

export const MonthlyActivityChart = ({ data }: MonthlyActivityChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Activity</CardTitle>
        <CardDescription>
          Your grant application activity over time
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="applications" fill="#2196F3" name="Applications" />
            <Bar dataKey="approvals" fill="#4CAF50" name="Approvals" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
