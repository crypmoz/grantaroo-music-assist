import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, FileText } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { TabsContent } from "@/components/ui/tabs";

export const DashboardApplications = () => {
  return (
    <TabsContent value="applications" className="pt-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>My Applications</CardTitle>
            <Link to="/new-application">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Application
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center p-6">
            <FileText className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground mb-4">View all your applications in one place</p>
            <Link to="/applications" className="block">
              <Button variant="secondary" className="w-full">
                View All Applications
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
