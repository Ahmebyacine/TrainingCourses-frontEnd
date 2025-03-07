import DashboardLayout from './layouts/common/DashboardLayout'
import Courses from './pages/admin/Courses'
import Institutions from './pages/admin/Institutions'
import Programs from './pages/admin/Programs'
import Users from './pages/admin/Users'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddTrainee from './pages/empolyee/AddTrainee'

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Programs />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "institutions",
        element: <Institutions />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "add-trainee",
        element: <AddTrainee />,
      },
    ],
  },
]);

function App() {

  return <RouterProvider router={router} />;
}

export default App;