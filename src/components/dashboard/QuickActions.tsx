import { motion } from 'framer-motion';
import { Plus, Upload, MessageCircle, BarChart3, Sparkles } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      title: 'Add New Offer',
      description: 'Create a new travel package',
      icon: Plus,
      gradient: 'from-blue-400 to-blue-600',
      href: '/dashboard/packages'
    },
    {
      title: 'Upload Photos',
      description: 'Add images to your offers',
      icon: Upload,
      gradient: 'from-purple-400 to-purple-600',
      href: '/dashboard/media'
    },
    {
      title: 'Client Messages',
      description: '3 new messages',
      icon: MessageCircle,
      gradient: 'from-emerald-400 to-emerald-600',
      href: '/dashboard/messages',
      badge: '3'
    },
    {
      title: 'Monthly Report',
      description: 'Generate performance report',
      icon: BarChart3,
      gradient: 'from-amber-400 to-amber-600',
      href: '/dashboard/statistics'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[hsl(var(--dashboard-gold))] to-[hsl(var(--dashboard-royal-blue))] rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-[hsl(var(--dashboard-text))]">Quick Actions</h2>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {actions.map((action, index) => (
            <motion.a
              key={index}
              href={action.href}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 4, transition: { duration: 0.2 } }}
              className="block p-4 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className={`relative p-3 rounded-xl bg-gradient-to-br ${action.gradient} shadow-md`}>
                  <action.icon className="w-6 h-6 text-white" />
                  {action.badge && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {action.badge}
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-[hsl(var(--dashboard-text))] mb-1">
                    {action.title}
                  </h3>
                  <p className="text-[hsl(var(--dashboard-text-muted))] text-sm">
                    {action.description}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
