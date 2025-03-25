
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, FileText, Clock, CalendarClock } from "lucide-react";

type Application = {
  id: string;
  created_at: string;
  updated_at: string;
  status: string;
  project_description: string;
  timeline: string;
  budget: any;
  grant: {
    id: string;
    title: string;
    organization: string;
    deadline: string;
  } | null;
};

type RecentApplicationsListProps = {
  applications: Application[];
  isLoading: boolean;
};

export const RecentApplicationsList = ({ applications, isLoading }: RecentApplicationsListProps) => {
  // Format date to readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get status badge style
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (applications.length === 0) {
    return (
      <div className="text-center p-6">
        <FileText className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
        <p className="text-muted-foreground mb-4">No applications yet</p>
        <Link to="/new-application">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Start New Application
          </Button>
        </Link>
      </div>
    );
  } 

  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <div key={app.id} className="flex items-center justify-between border-b pb-4">
          <div>
            <div className="font-medium">
              {app.grant?.title || "Custom Application"}
            </div>
            <div className="text-sm text-muted-foreground">
              {app.grant?.organization || "Personal Project"}
            </div>
            <div className="flex items-center gap-4 text-xs mt-1">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Updated {formatDate(app.updated_at)}
              </span>
              {app.grant?.deadline && (
                <span className="flex items-center gap-1">
                  <CalendarClock className="h-3 w-3" />
                  Due {formatDate(app.grant.deadline)}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-xs px-2 py-1 rounded ${getStatusClass(app.status)}`}>
              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
            </span>
            <Link to={`/edit-application/${app.id}`}>
              <Button variant="outline" size="sm">
                Continue
              </Button>
            </Link>
          </div>
        </div>
      ))}
      
      <div className="pt-2">
        <Link to="/new-application">
          <Button variant="outline" className="w-full flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Start New Application
          </Button>
        </Link>
      </div>
    </div>
  );
};
