import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center">
        {/* Mobile menu button could go here */}
      </div>
      
      <div className="flex items-center space-x-4">
        <Link to="/profile" className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-medium text-gray-700">{user?.name}</span>
          <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 border border-gray-200 uppercase">
            {user?.role}
          </span>
        </Link>
        
        <button 
          onClick={handleLogout}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
