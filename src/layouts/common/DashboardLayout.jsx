import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  Building2,
  Calendar,
  Menu,
  User,
  Users,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import UserMenu from "@/components/UserMenu";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
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
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-10 flex h-full w-64 flex-col border-r bg-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link to="/dashboard" className="flex items-center gap-2 font-bold text-xl">
            <Calendar className="h-6 w-6 text-primary" />
            <span>Training CH</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
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
        </nav>
        <UserMenu/>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
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
              <SheetContent side="left" className="p-0 w-64">
                <div className="flex h-16 items-center justify-between border-b px-4">
                  <Link to="/" className="flex items-center gap-2 font-bold text-xl">
                    <Calendar className="h-6 w-6 text-primary" />
                    <span>Training CH</span>
                  </Link>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                </div>
                <nav className="flex-1 overflow-y-auto p-4">
                  <ul className="space-y-2">
                    {navItems.map((item) => (
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
                </nav>
                <UserMenu/>
              </SheetContent>
            </Sheet>
            <div className="lg:hidden">
              <h1 className="text-lg font-semibold">
                {navItems.find((item) => item.href === location.pathname)?.title || "Dashboard"}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/add-trainee" variant="outline" size="sm"
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              location.pathname === "/add-trainee"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}>
              <User className="mr-2 h-4 w-4" />
              New Trainee
            </Link>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}