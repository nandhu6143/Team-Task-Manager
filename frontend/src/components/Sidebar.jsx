import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  Users, 
  Settings
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Projects', href: '/projects', icon: FolderKanban },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  ];

  if (user?.role === 'admin') {
    // Admins might have extra tabs like Users/Team
    navigation.push({ name: 'Team', href: '/team', icon: Users });
  }

  return (
    <div className="hidden md:flex flex-col w-64 bg-indigo-900 text-white shadow-xl transition-all duration-300">
      <div className="flex items-center justify-center h-20 border-b border-indigo-800">
        <h1 className="text-2xl font-bold tracking-wider">TeamTask</h1>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-800 text-white'
                    : 'text-indigo-100 hover:bg-indigo-800 hover:text-white'
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
