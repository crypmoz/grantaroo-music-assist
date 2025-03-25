import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PaywallScreen } from "@/components/PaywallScreen";
import { useAuth } from "@/context/AuthContext";
import { TabsContent } from "@/components/ui/tabs";

export const DashboardStatistics = () => {
  const { isPaidUser } = useAuth();

  if (!isPaidUser) {
    return (
      <TabsContent value="statistics" className="pt-6">
        <PaywallScreen />
      </TabsContent>
    );
  }

  return (
    <TabsContent value="statistics" className="pt-6">
      <Card>
        <CardHeader>
          <CardTitle>Grant Success Statistics</CardTitle>
          <CardDescription>
            View analytics about your grant applications and success rate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/stats">
            <Button variant="outline">View Detailed Statistics</Button>
          </Link>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
