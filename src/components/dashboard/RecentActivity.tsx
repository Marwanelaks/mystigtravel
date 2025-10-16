import { motion } from 'framer-motion';
import { Clock, MapPin, Users, DollarSign, Star, Calendar } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'booking',
      title: 'New Booking - Desert Circuit',
      description: 'Martin Family - 4 people',
      amount: '$2,800',
      time: '2h ago',
      icon: MapPin,
      gradient: 'from-emerald-400 to-emerald-600',
    },
    {
      id: 2,
      type: 'review',
      title: 'New Customer Review',
      description: 'Sarah L. - 5 stars for Riad Marrakech',
      time: '4h ago',
      icon: Star,
      gradient: 'from-amber-400 to-amber-600',
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Received',
      description: 'Atlas Mountains Package',
      amount: '$1,500',
      time: '6h ago',
      icon: DollarSign,
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      id: 4,
      type: 'booking',
      title: 'Booking Cancelled',
      description: 'Essaouira Excursion - Refund processed',
      time: '1 day ago',
      icon: Calendar,
      gradient: 'from-red-400 to-red-600',
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[hsl(var(--dashboard-royal-blue))] to-[hsl(var(--dashboard-gold))] rounded-xl flex items-center justify-center shadow-lg">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-[hsl(var(--dashboard-text))]">Recent Activity</h2>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div 
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${activity.gradient} shadow-md`}>
                  <activity.icon className="w-5 h-5 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[hsl(var(--dashboard-text))] mb-1">
                    {activity.title}
                  </h3>
                  <p className="text-[hsl(var(--dashboard-text-muted))] text-sm mb-2">
                    {activity.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3 h-3 text-[hsl(var(--dashboard-text-muted))]" />
                    <span className="text-xs text-[hsl(var(--dashboard-text-muted))] font-medium">{activity.time}</span>
                  </div>
                </div>
                
                {activity.amount && (
                  <div className="text-right">
                    <p className="font-bold text-[hsl(var(--dashboard-text))] text-lg">
                      {activity.amount}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
