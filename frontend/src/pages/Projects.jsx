import { useState, useEffect } from 'react';
import api from '../utils/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Plus, Users, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', members: [] });
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchProjects();
    if (user?.role === 'admin') fetchUsers();
  }, [user]);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data.data);
    } catch (err) {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get('/auth/users');
      setUsers(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects', formData);
      toast.success('Project created successfully');
      setShowModal(false);
      setFormData({ name: '', description: '', members: [] });
      fetchProjects();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to create project');
    }
  };

  if (loading) return <div className="flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        {user?.role === 'admin' && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Project
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
              
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Users className="w-4 h-4 mr-2" />
                {project.members?.length || 0} Members
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-2" />
                Created {format(new Date(project.createdAt), 'MMM dd, yyyy')}
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center">
              <span className="text-sm font-medium text-indigo-600 hover:text-indigo-800 cursor-pointer">
                View Details
              </span>
              <span className="text-xs text-gray-500">
                By {project.createdBy?.name}
              </span>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            No projects found.
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Create New Project</h2>
            <form onSubmit={handleCreate}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    required
                    rows="3"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Members (Hold Ctrl/Cmd to select multiple)</label>
                  <select
                    multiple
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.members}
                    onChange={(e) => {
                      const options = [...e.target.selectedOptions];
                      const values = options.map(option => option.value);
                      setFormData({ ...formData, members: values });
                    }}
                  >
                    {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
