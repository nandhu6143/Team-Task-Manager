import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Calendar } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-indigo-600 h-32 relative">
          <div className="absolute -bottom-12 left-8">
            <div className="w-24 h-24 rounded-full border-4 border-white bg-indigo-100 flex items-center justify-center text-indigo-600 text-4xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
        
        <div className="pt-16 pb-8 px-8">
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-500 mt-1 capitalize">{user.role}</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="p-3 bg-white rounded-full shadow-sm mr-4">
                <User className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium text-gray-900">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="p-3 bg-white rounded-full shadow-sm mr-4">
                <Mail className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium text-gray-900">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="p-3 bg-white rounded-full shadow-sm mr-4">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Account Role</p>
                <p className="font-medium text-gray-900 capitalize">{user.role}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="p-3 bg-white rounded-full shadow-sm mr-4">
                <Calendar className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Account Status</p>
                <p className="font-medium text-green-600">Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
