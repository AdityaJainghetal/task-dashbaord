// // import { useState, useContext } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { AuthContext } from '../pages/AuthContext';

// // const Navbar = () => {
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const { currentUser, logout, isAdmin } = useContext(AuthContext);
// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     logout();             
// //     navigate('/login');   
// //   };

// //   return (
// //     <nav className="bg-gray-800 shadow-lg">
// //       <div className="max-w-6xl mx-auto px-4">
// //         <div className="flex justify-between">
// //           <div className="flex space-x-7">
// //             <div>
// //               <Link to="/" className="flex items-center py-4 px-2">
// //                 <span className="text-white font-semibold text-lg">MyApp</span>
// //               </Link>
// //             </div>

// //             <div className="hidden md:flex items-center space-x-1">
// //               <NavLink to="/display">Home</NavLink>
// //               <NavLink to="/checkout">Add</NavLink>
// //               {isAdmin && <NavLink to="/admindashboard">Admin</NavLink>}
// //             </div>
// //           </div>

// //           <div className="hidden md:flex items-center space-x-3">
// //             {currentUser ? (
// //               <>
// //                 <span className="text-white">Welcome, {currentUser.username}</span>
// //                 <button
// //                   onClick={handleLogout}
// //                   className="py-2 px-2 font-medium text-white bg-red-500 rounded hover:bg-red-400 transition duration-300"
// //                 >
// //                   Logout
// //                 </button>
// //               </>
// //             ) : (
// //               <>
// //                 <Link
// //                   to="/login"
// //                   className="py-2 px-2 font-medium text-white rounded hover:bg-blue-500 transition duration-300"
// //                 >
// //                   Log In
// //                 </Link>
// //               </>
// //             )}
// //           </div>

// //           <div className="md:hidden flex items-center">
// //             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="outline-none">
// //               <svg
// //                 className="w-6 h-6 text-gray-300 hover:text-white"
// //                 fill="none"
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth="2"
// //                 viewBox="0 0 24 24"
// //                 stroke="currentColor"
// //               >
// //                 <path d="M4 6h16M4 12h16M4 18h16"></path>
// //               </svg>
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
// //         <ul className="bg-gray-700">
// //           <MobileNavLink to="/display">Home</MobileNavLink>
// //           <MobileNavLink to="/checkout">Add</MobileNavLink>
// //           {isAdmin && <MobileNavLink to="/admindashboard">Admin</MobileNavLink>}
// //           {currentUser ? (
// //             <li className="text-white py-2 px-4">
// //               Welcome, {currentUser?.username}
// //               <button
// //                 onClick={handleLogout}
// //                 className="block mt-2 w-full text-center py-2 bg-red-500 rounded hover:bg-red-400"
// //               >
// //                 Logout
// //               </button>
              
// //             </li>
// //           ) : (
// //             <MobileNavLink to="/login">Login</MobileNavLink>
// //           )}
// //         </ul>
// //         <button  className="block mt-2 w-full text-center py-2 bg-red-500 rounded hover:bg-red-400" onClick={handleLogout}>Logout</button>
// //       </div>
// //     </nav>
// //   );
// // };

// // const NavLink = ({ to, children }) => (
// //   <Link
// //     to={to}
// //     className="py-4 px-2 text-gray-300 hover:text-white transition duration-300"
// //   >
// //     {children}
// //   </Link>
// // );

// // const MobileNavLink = ({ to, children }) => (
// //   <li>
// //     <Link
// //       to={to}
// //       className="block py-2 px-4 text-sm text-gray-300 hover:bg-gray-600"
// //     >
// //       {children}
// //     </Link>
// //   </li>
// // );

// // export default Navbar;

// import { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../pages/AuthContext';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { currentUser, logout, isAdmin } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-gray-800 shadow-lg">
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="flex justify-between">
//           <div className="flex space-x-7">
//             <div>
//               <Link to="/" className="flex items-center py-4 px-2">
//                 <span className="text-white font-semibold text-lg">MyApp</span>
//               </Link>
//             </div>

//             <div className="hidden md:flex items-center space-x-1">
//               <NavLink to="/display">Home</NavLink>
//               <NavLink to="/checkout">Add</NavLink>
//               {isAdmin && <NavLink to="/admindashboard">Admin</NavLink>}
//             </div>
//           </div>

//           <div className="hidden md:flex items-center space-x-3">
//             {currentUser ? (
//               <>
//                 <span className="text-white">
//                   Welcome, {currentUser?.username || 'User'}
//                 </span>
//                 <button
//                   onClick={handleLogout}
//                   className="py-2 px-2 font-medium text-white bg-red-500 rounded hover:bg-red-400 transition duration-300"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <Link
//                 to="/login"
//                 className="py-2 px-2 font-medium text-white rounded hover:bg-blue-500 transition duration-300"
//               >
//                 Log In
//               </Link>
//             )}
//           </div>

//           <div className="md:hidden flex items-center">
//             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="outline-none">
//               <svg
//                 className="w-6 h-6 text-gray-300 hover:text-white"
//                 fill="none"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path d="M4 6h16M4 12h16M4 18h16"></path>
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
//         <ul className="bg-gray-700">
//           <MobileNavLink to="/display">Home</MobileNavLink>
//           <MobileNavLink to="/checkout">Add</MobileNavLink>
//           {isAdmin && <MobileNavLink to="/admindashboard">Admin</MobileNavLink>}
//           {currentUser ? (
//             <li className="text-white py-2 px-4">
//               Welcome, {currentUser?.username || 'User'}
//               <button
//                 onClick={handleLogout}
//                 className="block mt-2 w-full text-center py-2 bg-red-500 rounded hover:bg-red-400"
//               >
//                 Logout
//               </button>
//             </li>
//           ) : (
//             <MobileNavLink to="/login">Login</MobileNavLink>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// const NavLink = ({ to, children }) => (
//   <Link
//     to={to}
//     className="py-4 px-2 text-gray-300 hover:text-white transition duration-300"
//   >
//     {children}
//   </Link>
// );

// const MobileNavLink = ({ to, children }) => (
//   <li>
//     <Link
//       to={to}
//       className="block py-2 px-4 text-sm text-gray-300 hover:bg-gray-600"
//     >
//       {children}
//     </Link>
//   </li>
// );

// export default Navbar;


import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../pages/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link to="/" className="flex items-center py-4 px-2">
                <span className="text-white font-semibold text-lg">MyApp</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              <NavLink to="/display">Home</NavLink>
              <NavLink to="/checkout">Add</NavLink>
              {isAdmin && <NavLink to="/admindashboard">Admin</NavLink>}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {currentUser ? (
              <>
                <span className="text-white">
                  Welcome, {currentUser?.username || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  className="py-2 px-2 font-medium text-white bg-red-500 rounded hover:bg-red-400 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="py-2 px-2 font-medium text-white rounded hover:bg-blue-500 transition duration-300"
              >
                Log In
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="outline-none">
              <svg
                className="w-6 h-6 text-gray-300 hover:text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <ul className="bg-gray-700">
          <MobileNavLink to="/display">Home</MobileNavLink>
          <MobileNavLink to="/checkout">Add</MobileNavLink>
          {isAdmin && <MobileNavLink to="/admindashboard">Admin</MobileNavLink>}
          {currentUser ? (
            <li className="text-white py-2 px-4">
              Welcome, {currentUser?.username || 'User'}
              <button
                onClick={handleLogout}
                className="block mt-2 w-full text-center py-2 bg-red-500 rounded hover:bg-red-400"
              >
                Logout
              </button>
            </li>
          ) : (
            <MobileNavLink to="/login">Login</MobileNavLink>
          )}
        </ul>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="py-4 px-2 text-gray-300 hover:text-white transition duration-300"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="block py-2 px-4 text-sm text-gray-300 hover:bg-gray-600"
    >
      {children}
    </Link>
  </li>
);

export default Navbar;