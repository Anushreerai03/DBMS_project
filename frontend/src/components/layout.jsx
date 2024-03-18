import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="bg-teal-700 py-4">
        <ul className="flex space-x-4 justify-center">
          <li>
            <Link to="/" className="text-white hover:text-red-500">Home</Link>
          </li>
          <li>
            <Link to="/classroom" className="text-white hover:text-red-500">Classroom Allocation</Link>
          </li>
          <li>
            <Link to="/benches" className="text-white hover:text-red-500">Benches Allocation</Link>
          </li>
          <li>
            <Link to="/seating-arrangement" className="text-white hover:text-red-500">Seat Allocation</Link>
          </li>
          <li>
            <Link to="/faculty" className="text-white hover:text-red-500">Faculty Allocation</Link>
          </li>
          <li>
            <Link to="/search" className="text-white hover:text-red-500">Search Student</Link>
          </li>
        </ul>

      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
