import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../context/AuthContext";


function AuthLayout() {
  const { isAuthenticated } = useUserContext();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section>
            <Outlet />
          </section>

          {/* <img
            src="/assets/images/side-img.svg"
            alt="logo"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          /> */}
        </>
      )}
    </>
  );
}
export default AuthLayout