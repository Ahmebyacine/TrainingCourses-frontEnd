import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  BookCheck,
  BookOpen,
  Building2,
  Calendar,
  ChartBarStacked,
  CoinsIcon,
  Contact,
  FileCheck,
  FileClock,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Search,
  User,
  Users,
  Users2,
  X,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import UserMenu from "@/components/UserMenu";
import { getTokenData } from "@/services/auth";
import { ModeToggle } from "@/components/modeToggle";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { role } = getTokenData();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItemsAdmin = [
    {
      title: "البرامج",
      href: "/",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "الدورات",
      href: "/courses",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "المؤسسات",
      href: "/institutions",
      icon: <Building2 className="h-5 w-5" />,
    },
    {
      title: "المستخدمين",
      href: "/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "المدربين",
      href: "/trainers",
      icon: <Contact className="h-5 w-5" />,
    },
  ];

  const navItemsAdminStatistics = [
    {
      title: "إحصائيات البرامج",
      href: "/program-statistics",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "إحصائيات الدورات",
      href: "/course-statistics",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "إحصائيات المؤسسات",
      href: "/institution-statistics",
      icon: <Building2 className="h-5 w-5" />,
    },
    {
      title: "إحصائيات الموظفين",
      href: "/employee-statistics",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "إحصائيات المصاريف",
      href: "/expenses-statistics",
      icon: <CoinsIcon className="h-5 w-5" />,
    },
  ];

  const navItemsEmployee = [
    {
      title: "إضافة متدرب",
      href: "/add-trainee",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "بحث عن المتدرب",
      href: "/search-trainee",
      icon: <Search className="h-5 w-5" />,
    },
    {
      title: "إحصائيات البرامج",
      href: "/program-statistics-employee",
      icon: <Calendar className="h-5 w-5" />,
    },
    //TODO: remove this because is not tested and completed
    //{
    //  title: "قيد التسجيل",
    //  href: "/whitelist",
    //  icon: <Loader className="h-5 w-5" />,
    //},
    {
      title: "إحصائيات",
      href: "/user-statistics",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
  ];

  const navItemsManager = [
    {
      title: "البرامج",
      href: "/programs-manager",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "الدورات",
      href: "/courses-manager",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "المؤسسات",
      href: "/institutions-manager",
      icon: <Building2 className="h-5 w-5" />,
    },
    {
      title: "المصاريف",
      href: "/expenses",
      icon: <CoinsIcon className="h-5 w-5" />,
    },
    {
      title: "احصائيات البرامج",
      href: "/program-statistics-manager",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "احصائيات الموظفين",
      href: "/employee-statistics-manager",
      icon: <Users2 className="h-5 w-5" />,
    },
  ];

  const navItemsMember = [
    {
      title: "شهادة مطابقة",
      href: "/certificat-conformite",
      icon: <BookCheck className="h-5 w-5" />,
    },
    {
      title: "شهادة التدريب",
      href: "/attestation-de-formation",
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      title: "شهادة الكفاءة",
      href: "/certificate-d-aptitude",
      icon: <FileClock className="h-5 w-5" />,
    },
    {
      title: "شهادة التدريب (سنة واحدة)",
      href: "/attestation-de-formationDuree",
      icon: <FileCheck className="h-5 w-5" />,
    },
  ];
  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex h-full w-64 flex-col border-r bg-primary-foreground transition-all duration-300 ease-in-out lg:static",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Calendar className="h-6 w-6 text-primary" />
            <span>EasyCole Platform</span>
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
            {((role) => {
              switch (role) {
                case "admin":
                  return navItemsAdmin;
                case "manager":
                  return navItemsManager;
                case "member":
                  return navItemsMember;
                default:
                  return navItemsEmployee;
              }
            })(role).map((item) => (
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
          {role === "admin" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <ChartBarStacked />
                  إحصائيات
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
        <ModeToggle />
        <UserMenu />
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          "flex flex-1 flex-col overflow-hidden transition-all duration-300",
          isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
        )}
      >
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-card px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="p-0 w-64"
                onInteractOutside={(e) => {
                  const formElements = document.querySelectorAll(
                    "form, input, button, select, textarea, label"
                  );
                  if (
                    Array.from(formElements).some((el) => el.contains(e.target))
                  ) {
                    e.preventDefault();
                  }
                }}
              >
                <SheetHeader>
                  <div className="flex h-16 items-center justify-between border-b px-4">
                    <SheetTitle asChild>
                      <Link
                        to="/"
                        className="flex items-center gap-2 font-bold text-xl"
                      >
                        <Calendar className="h-6 w-6 text-primary" />
                        <span>EasyCole Platform</span>
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
                    {((role) => {
                      switch (role) {
                        case "admin":
                          return navItemsAdmin;
                        case "manager":
                          return navItemsManager;
                        case "member":
                          return navItemsMember;
                        default:
                          return navItemsEmployee;
                      }
                    })(role).map((item) => (
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
                  {role === "admin" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          <ChartBarStacked />
                          إحصائيات
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
                <ModeToggle />
                <UserMenu />
              </SheetContent>
            </Sheet>
            <div>
              <h1 className="text-lg md:text-2xl font-semibold">
                {((role) => {
                  switch (role) {
                    case "admin":
                      return navItemsAdmin;
                    case "manager":
                      return navItemsManager;
                    case "member":
                      return navItemsMember;
                    default:
                      return navItemsEmployee;
                  }
                })(role).find((item) => item.href === location.pathname)
                  ?.title || "Dashboard"}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {role === "employee" && (
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
                متدرب جديد
              </Link>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-background p-4 lg:p-6">
          <Outlet />
          <Toaster />
        </main>
      </div>
    </div>
  );
}
