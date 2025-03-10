import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  Building2,
  Calendar,
  ChartBarStacked,
  LayoutDashboard,
  Menu,
  Search,
  User,
  Users,
  X,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner"
import UserMenu from "@/components/UserMenu";
import { getTokenData } from "@/services/auth";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { role } = getTokenData();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItemsAdmin = [
    {
      title: "Programs",
      href: "/",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Courses",
      href: "/courses",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "Institutions",
      href: "/institutions",
      icon: <Building2 className="h-5 w-5" />,
    },
    {
      title: "Users",
      href: "/users",
      icon: <Users className="h-5 w-5" />,
    }
  ];
  const navItemsAdminStatistics = [
    {
      title: "Program Statistics",
      href: "/program-statistics",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Courses Statistics",
      href: "/course-statistics",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Institutions Statistics",
      href: "/institution-statistics",
      icon: <Building2 className="h-5 w-5" />,
    },
    {
      title: "Employee Statistics",
      href: "/employee-statistics",
      icon: <Users className="h-5 w-5" />,
    },
  ];
  const navItemsEmployee = [
    {
      title: "Add Treinee",
      href: "/add-trainee",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Search Treinee",
      href: "/search-trainee",
      icon: <Search className="h-5 w-5" />,
    },
    {
      title: "Statistics",
      href: "/user-statistics",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex h-full w-64 flex-col border-r bg-white transition-all duration-300 ease-in-out lg:static",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link to="/dashboard" className="flex items-center gap-2 font-bold text-xl">
            <Calendar className="h-6 w-6 text-primary" />
            <span>Training CH</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {(role === 'admin' ? navItemsAdmin : navItemsEmployee).map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    location.pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          {(role === 'admin') && (
           <DropdownMenu>
           <DropdownMenuTrigger asChild>
             <Button variant="outline" className='w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors text-muted-foreground hover:bg-muted hover:text-foreground'>
               <ChartBarStacked />
               Statistics
              </Button>
           </DropdownMenuTrigger>
           <DropdownMenuContent className="w-56">
             <DropdownMenuSeparator />
             <DropdownMenuRadioGroup>
                 <ul className="space-y-2">
                    {navItemsAdminStatistics.map((item) => (
                      <li key={item.href}>
                        <Link
                          to={item.href}
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                            location.pathname === item.href
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          {item.icon}
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                 </DropdownMenuRadioGroup>
               </DropdownMenuContent>
           </DropdownMenu>
          )}
        </nav>
        <UserMenu />
      </aside>

      {/* Main Content */}
      <div className={cn(
        "flex flex-1 flex-col overflow-hidden transition-all duration-300",
        isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
      )}>
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="left" 
                className="p-0 w-64"
                onInteractOutside={(e) => {
                  const formElements = document.querySelectorAll(
                    'form, input, button, select, textarea, label'
                  );
                  if (Array.from(formElements).some(el => el.contains(e.target))) {
                    e.preventDefault();
                  }
                }}
              >
                <SheetHeader>
                  <div className="flex h-16 items-center justify-between border-b px-4">
                    <SheetTitle asChild>
                      <Link to="/" className="flex items-center gap-2 font-bold text-xl">
                        <Calendar className="h-6 w-6 text-primary" />
                        <span>Training CH</span>
                      </Link>
                    </SheetTitle>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                  </div>
                </SheetHeader>
                <nav className="flex-1 overflow-y-auto p-4">
                  <ul className="space-y-2">
                    {(role === 'admin' ? navItemsAdmin : navItemsEmployee).map((item) => (
                      <li key={item.href}>
                        <Link
                          to={item.href}
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                            location.pathname === item.href
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          {item.icon}
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {(role === 'admin') && (
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className='w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors text-muted-foreground hover:bg-muted hover:text-foreground'>
                            <ChartBarStacked />
                            Statistics
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuSeparator />
                          <DropdownMenuRadioGroup>
                              <ul className="space-y-2">
                                 {navItemsAdminStatistics.map((item) => (
                                   <li key={item.href}>
                                     <Link
                                       to={item.href}
                                       className={cn(
                                         "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                         location.pathname === item.href
                                           ? "bg-primary text-primary-foreground"
                                           : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                       )}
                                     >
                                       {item.icon}
                                       {item.title}
                                     </Link>
                                   </li>
                                 ))}
                               </ul>
                              </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                     </DropdownMenu>
                  )}
                </nav>
                <UserMenu />
              </SheetContent>
            </Sheet>
            <div>
              <h1 className="text-lg md:text-2xl font-semibold">
                {(role === 'admin' ? navItemsAdmin : navItemsEmployee).find((item) => item.href === location.pathname)?.title || "Dashboard"}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {role === 'employee' && (
              <Link 
                to="/add-trainee" 
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  location.pathname === "/add-trainee"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <User className="mr-2 h-4 w-4" />
                New Trainee
              </Link>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 lg:p-6">
          <Outlet />
          <Toaster />
        </main>
      </div>
    </div>
  );
}