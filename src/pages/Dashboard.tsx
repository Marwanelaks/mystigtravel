import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatsOverview from '@/components/dashboard/StatsOverview';
import RecentActivity from '@/components/dashboard/RecentActivity';
import QuickActions from '@/components/dashboard/QuickActions';
import { Calendar, TrendingUp, MapPin, Crown } from 'lucide-react';

const Dashboard = () => {
  const upcomingEvents = [
    { name: 'Festival Gnawa', date: '15 Mars', location: 'Essaouira' },
    { name: 'Moussem des Roses', date: '20 Mars', location: 'Kelâa M\'Gouna' },
    { name: 'Festival des Amandiers', date: '25 Mars', location: 'Tafraoute' }
  ];

  const topDestinations = [
    { name: 'Marrakech', bookings: 45, trend: '+15%' },
    { name: 'Chefchaouen', bookings: 32, trend: '+8%' },
    { name: 'Essaouira', bookings: 28, trend: '+12%' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-r from-[hsl(var(--dashboard-royal-blue))] to-[hsl(var(--dashboard-gold))] rounded-2xl p-10 text-white overflow-hidden shadow-xl"
        >
          <div className="relative z-10 flex items-center space-x-4">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl"
            >
              <Crown className="w-10 h-10 text-[hsl(var(--dashboard-gold))]" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold mb-2 tracking-wide">
                Ahlan wa Sahlan
              </h1>
              <p className="text-white/90 text-lg font-medium">
                Welcome to your MysticTravel dashboard
              </p>
            </div>
          </div>
        </motion.div>

        <StatsOverview />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[hsl(var(--dashboard-text))]">Upcoming Events</h3>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                    {event.date.split(' ')[0]}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[hsl(var(--dashboard-text))]">{event.name}</h4>
                    <div className="flex items-center text-[hsl(var(--dashboard-text-muted))] text-sm mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {event.location}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[hsl(var(--dashboard-text))]">Popular Destinations</h3>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {topDestinations.map((dest, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100 hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-[hsl(var(--dashboard-text))]">{dest.name}</h4>
                      <p className="text-[hsl(var(--dashboard-text-muted))] text-sm">{dest.bookings} bookings</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-600 font-bold text-base">{dest.trend}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
