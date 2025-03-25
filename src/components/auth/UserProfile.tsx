
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  LogOut, 
  User, 
  CreditCard, 
  LayoutDashboard, 
  FileText, 
  Settings,
  Sparkles 
} from "lucide-react";
import { Link } from "react-router-dom";

export const UserProfile = () => {
  const { user, logout, isPaidUser, completePayment } = useAuth();
  
  if (!user) return null;
  
  const initials = user.name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="flex items-center gap-2 cursor-pointer">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link to="/applications" className="flex items-center gap-2 cursor-pointer">
            <FileText className="h-4 w-4" />
            My Applications
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
            <User className="h-4 w-4" />
            Profile Settings
          </Link>
        </DropdownMenuItem>
        
        {isPaidUser && (
          <DropdownMenuItem asChild>
            <Link to="/assistant" className="flex items-center gap-2 cursor-pointer">
              <Sparkles className="h-4 w-4" />
              Grant Assistant
            </Link>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          <span>{isPaidUser ? "Premium Member" : "Free Account"}</span>
        </DropdownMenuItem>
        
        {!isPaidUser && (
          <DropdownMenuItem 
            onClick={completePayment} 
            className="text-blue-600 font-medium"
          >
            Upgrade to Premium
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={logout}
          className="text-red-600"
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
