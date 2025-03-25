import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TabsContent } from "@/components/ui/tabs";

export const DashboardProfile = () => {
  return (
    <TabsContent value="profile" className="pt-6">
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
          <CardDescription>
            View and update your profile information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/profile">
            <Button variant="outline">View & Edit Profile</Button>
          </Link>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
