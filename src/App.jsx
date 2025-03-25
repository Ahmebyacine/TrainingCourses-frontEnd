import DashboardLayout from './layouts/common/DashboardLayout'
import Courses from './pages/admin/Courses'
import Institutions from './pages/admin/Institutions'
import Programs from './pages/admin/Programs'
import Users from './pages/admin/Users'
import { createHashRouter, RouterProvider } from "react-router-dom";
import AddTrainee from './pages/employee/AddTrainee'
import SignIn from './pages/auth/SignIn'
import ProtectedRoute from './services/ProtectedRoute'
import { CourseStatistics } from './pages/admin/CourseStatistics'
import { InstitutionStatistics } from './pages/admin/InstitutionStatistics'
import { EmployeeStatistics } from './pages/admin/EmployeeStatistics'
import ProgramStatistics from './pages/admin/ProgramStatistics'
import UserStatistics from './pages/employee/UserStatistics'
import Unauthorized from './pages/common/Unauthorized'
import TraineeSearch from './pages/employee/TraineeSearch'
import EditTrainee from './layouts/employee/EditTrainee'
import Trainers from './pages/admin/Trainers'

const router = createHashRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        element: <ProtectedRoute roles={['admin']} />,
        children: [
          { path: "users", element: <Users /> },
          { path: "institutions", element: <Institutions /> },
          {
            index: true,
            element: <Programs />,
          },
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
        ]
      },
      {
        element: <ProtectedRoute roles={['employee']} />,
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
            path: "user-statistics",
            element: <UserStatistics />,
          },
        ]
      },
    ],
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