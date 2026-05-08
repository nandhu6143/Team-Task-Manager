import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/axios';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { CheckCircle, Clock, AlertTriangle, ListTodo } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/tasks/stats');
        setStats(res.data.data);
      } catch (err) {
        toast.error('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>;
  }

  if (!stats) return null;

  const pieData = [
    { name: 'Completed', value: stats.completedTasks },
    { name: 'In Progress', value: stats.inProgressTasks },
    { name: 'Todo', value: stats.pendingTasks },
  ];
  
  const COLORS = ['#10B981', '#3B82F6', '#6B7280'];

  const statCards = [
    { title: 'Total Tasks', value: stats.totalTasks, icon: ListTodo, color: 'bg-indigo-500' },
    { title: 'Completed', value: stats.completedTasks, icon: CheckCircle, color: 'bg-emerald-500' },
    { title: 'In Progress', value: stats.inProgressTasks, icon: Clock, color: 'bg-blue-500' },
    { title: 'Overdue', value: stats.overdueTasks, icon: AlertTriangle, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
            <div className={`p-4 rounded-lg ${card.color} text-white mr-4`}>
              <card.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Task Status Distribution</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Projects</h2>
          <div className="space-y-4">
            {stats.recentProjects?.length > 0 ? (
              stats.recentProjects.map((project) => (
                <div key={project._id} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <h4 className="font-semibold text-indigo-600">{project.name}</h4>
                  <p className="text-sm text-gray-500 truncate">{project.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No recent projects found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
