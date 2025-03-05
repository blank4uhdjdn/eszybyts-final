// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { UserIcon } from '@heroicons/react/24/outline';

// const Navbar = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:5001/api/user')
//       .then(response => setUser(response.data))
//       .catch(error => console.error(error));
//   }, []);

//   return (
//     <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white shadow-md">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link to="/" className="flex items-center">
//           <span className="text-2xl font-bold font-satisfy text-yellow-300">Event Manager</span>
//         </Link>
//         <div className="flex items-center space-x-4">
//           <Link to="/" className="hover:text-yellow-300 transition duration-300">
//             Home
//           </Link>
//           <Link to="/create" className="hover:text-yellow-300 transition duration-300">
//             Create Event
//           </Link>
//           {user ? (
//             <Link to={`/profile`} className="hover:text-yellow-300 transition duration-300 flex items-center">
//               <UserIcon className="w-6 h-6 mr-1" />
//               <span>Profile</span>
//             </Link>
//           ) : (
//             <Link to="/login" className="hover:text-yellow-300 transition duration-300 flex items-center">
//               <UserIcon className="w-6 h-6 mr-1" />
//               <span>Login</span>
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  const [user, setUser ] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/user')
      .then(response => setUser (response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          Event Manager
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/create" className="nav-link">Create Event</Link>
          {/* {user ? (
            <Link to={`/profile`} className="nav-link">
              Profile
            </Link>
          ) : (
            <Link to="/login" className="nav-link">
              Login
            </Link>
          )} */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
