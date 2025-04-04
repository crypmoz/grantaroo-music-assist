
import { Link } from "react-router-dom";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FileText, BookOpen, Brain } from "lucide-react";

export function NavBar() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationMenu className="max-w-full w-full justify-start">
      <NavigationMenuList className="space-x-2">
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/about">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to="/resources"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span className="text-sm font-medium leading-none">Grant Resource Hub</span>
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Useful tools and information for grant applicants
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to="/faq"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm font-medium leading-none">FAQs</span>
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Common questions about music grants in Canada
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li className="md:col-span-2">
                <NavigationMenuLink asChild>
                  <Link
                    to="/grant-assistant"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium leading-none">AI Grant Assistant</span>
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Get personalized AI assistance with your grant application
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {isAuthenticated && (
          <NavigationMenuItem>
            <Link to="/dashboard">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <LayoutDashboard className="h-4 w-4 mr-1" />
                Dashboard
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
