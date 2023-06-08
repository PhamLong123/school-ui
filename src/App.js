import {
  Route,
  Routes,
} from "react-router-dom";
import Login from "./page/login";
import { AuthContextProvider } from "./api/AuthContext";
// import Success from "./page/success";
import Teacher from "./page/teacher";
import Parents from "./page/parent";
import Student from "./page/student";
function App() {

  // const router = createBrowserRouter([
  //   {
  //     path: "/login",
  //     element: <Login />,
  //   },
  //   {
  //     path: "/",
  //     element: <Success />,
  //   }
  // ]);
  return (
    <>
      <AuthContextProvider>
        <Routes>
          {/* <Route path="/" element={<Success />}></Route> */}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/student" element={<Student />}></Route>
          <Route path="/parents" element={<Parents />}></Route>
          <Route path="/teacher" element={<Teacher />}></Route>
        </Routes>
      </AuthContextProvider>
    </>
  );

  //   return (
  //     <RouterProvider router={router} />
  // );
}

export default App;
