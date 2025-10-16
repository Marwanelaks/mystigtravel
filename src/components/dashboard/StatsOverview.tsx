import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, DollarSign, Calendar, Star } from 'lucide-react';

const StatsOverview = () => {
  const stats = [
    {
      title: 'Monthly Revenue',
      value: '$45,230',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'emerald',
      gradient: 'from-emerald-400 to-emerald-600',
    },
    {
      title: 'Bookings',
      value: '127',
      change: '+8.2%',
      trend: 'up',
      icon: Calendar,
      color: 'blue',
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      title: 'Active Clients',
      value: '89',
      change: '-2.1%',
      trend: 'down',
      icon: Users,
      color: 'amber',
      gradient: 'from-amber-400 to-amber-600',
    },
    {
      title: 'Average Rating',
      value: '4.8/5',
      change: '+0.3',
      trend: 'up',
      icon: Star,
      color: 'purple',
      gradient: 'from-purple-400 to-purple-600',
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-semibold ${
              stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
            }`}>
              {stat.trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{stat.change}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-3xl font-bold text-[hsl(var(--dashboard-text))] mb-2">
              {stat.value}
            </h3>
            <p className="text-[hsl(var(--dashboard-text-muted))] font-medium text-sm">
              {stat.title}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsOverview;
