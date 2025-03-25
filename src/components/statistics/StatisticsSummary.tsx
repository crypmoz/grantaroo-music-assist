
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatisticsSummaryProps {
  successRate: {
    percentage: number;
    approvedCount: number;
    totalCount: number;
  };
  totalFunding: {
    amount: string;
    description: string;
  };
  applications: {
    count: number;
    description: string;
  };
}

export const StatisticsSummary = ({
  successRate,
  totalFunding,
  applications
}: StatisticsSummaryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Success Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold text-center mb-3 text-blue-600">
            {successRate.percentage}%
          </div>
          <p className="text-center text-sm text-muted-foreground">
            {successRate.approvedCount} out of {successRate.totalCount} applications approved
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Total Funding</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold text-center mb-3 text-green-600">
            {totalFunding.amount}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            {totalFunding.description}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Grant Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold text-center mb-3">
            {applications.count}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            {applications.description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
