import { createHashRouter, RouterProvider } from "react-router-dom";
import DashboardLayout from "./layouts/common/DashboardLayout";
import Courses from "./pages/admin/Courses";
import Institutions from "./pages/admin/Institutions";
import Programs from "./pages/admin/Programs";
import Users from "./pages/admin/Users";
import AddTrainee from "./pages/employee/AddTrainee";
import SignIn from "./pages/auth/SignIn";
import ProtectedRoute from "./services/ProtectedRoute";
import { CourseStatistics } from "./pages/admin/CourseStatistics";
import { InstitutionStatistics } from "./pages/admin/InstitutionStatistics";
import { EmployeeStatistics } from "./pages/admin/EmployeeStatistics";
import ProgramStatistics from "./pages/admin/ProgramStatistics";
import UserStatistics from "./pages/employee/UserStatistics";
import Unauthorized from "./pages/common/Unauthorized";
import TraineeSearch from "./pages/employee/TraineeSearch";
import EditTrainee from "./layouts/employee/EditTrainee";
import Trainers from "./pages/admin/Trainers";
import Expenses from "./pages/employee/Expenses";
import ProgramReportPage from "./pages/admin/ProgramReportPage";
import EquipmentInspection from "./pages/member/EquipmentInspection";
import AttestationDeFormation from "./pages/member/AttestationDeFormation";
import CertificateDAptitude from "./pages/member/CertificateDAptitude";
import AttestationDeFormationDuree from "./pages/member/AttestationDeFormationDuree";
import ProgramsManager from "./pages/manager/ProgramsManager";
import InstitutionsManager from "./pages/manager/InstitutionsManager";
import ExpensesStatistics from "./pages/admin/ExpensesStatistics";
import ProgramStatisticsManager from "./pages/manager/ProgramStatisticsManager";
import { EmployeeStatisticsManager } from "./pages/manager/EmployeeStatisticsManager";
import ProgramStatisticsEmployee from "./pages/employee/ProgramStatisticsEmployee";
import ErrorBoundary from "./components/ErrorBoundary";
import Whitelist from "./pages/employee/Whitelist";
import Lead from "./pages/employee/Lead";
import ProgramReportEmployeePage from "./pages/employee/ProgramReportEmployeePage";

const router = createHashRouter([
  {
    path: "/",
    errorElement: <ErrorBoundary />,
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        element: <ProtectedRoute roles={["admin"]} />,
        children: [
          {
            index: true,
            element: <Programs />,
          },
          { path: "users", element: <Users /> },
          { path: "institutions", element: <Institutions /> },
          {
            path: "courses",
            element: <Courses />,
          },
          {
            path: "trainers",
            element: <Trainers />,
          },
          {
            path: "course-statistics",
            element: <CourseStatistics />,
          },
          {
            path: "institution-statistics",
            element: <InstitutionStatistics />,
          },
          {
            path: "employee-statistics",
            element: <EmployeeStatistics />,
          },
          {
            path: "program-statistics",
            element: <ProgramStatistics />,
          },
          {
            path: "expenses-statistics",
            element: <ExpensesStatistics />,
          },
        ],
      },
      {
        element: <ProtectedRoute roles={["employee"]} />,
        children: [
          {
            path: "add-trainee",
            element: <AddTrainee />,
          },
          {
            path: "edit-trainee/:id",
            element: <EditTrainee />,
          },
          {
            path: "search-trainee",
            element: <TraineeSearch />,
          },
          {
            path: "program-statistics-employee",
            element: <ProgramStatisticsEmployee />,
          },
          {
            path: "user-statistics",
            element: <UserStatistics />,
          },
          {
            path: "whitelist",
            element: <Whitelist />,
          },
          {
            path: "leads",
            element: <Lead />,
          },
          {
            path: "expenses",
            element: <Expenses />,
          },
          {
            path: "/program-report-employee/:id",
            element: <ProgramReportEmployeePage />,
          },
        ],
      },
      {
        element: <ProtectedRoute roles={["member"]} />,
        children: [
          {
            path: "certificat-conformite",
            element: <EquipmentInspection />,
          },
          {
            path: "attestation-de-formation",
            element: <AttestationDeFormation />,
          },
          {
            path: "certificate-d-aptitude",
            element: <CertificateDAptitude />,
          },
          {
            path: "attestation-de-formationDuree",
            element: <AttestationDeFormationDuree />,
          },
        ],
      },
      {
        element: <ProtectedRoute roles={["manager"]} />,
        children: [
          {
            path: "programs-manager",
            element: <ProgramsManager />,
          },
          {
            path: "Courses-manager",
            element: <Courses />,
          },
          {
            path: "institutions-manager",
            element: <InstitutionsManager />,
          },
          {
            path: "program-statistics-manager",
            element: <ProgramStatisticsManager />,
          },
          {
            path: "employee-statistics-manager",
            element: <EmployeeStatisticsManager />,
          },
        ],
      },
    ],
  },
  {
    path: "/program-report/:id",
    element: (
      <ProtectedRoute roles={["admin", "manager"]}>
        <ProgramReportPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
