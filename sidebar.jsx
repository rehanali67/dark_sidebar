import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  Monitor,
  ShoppingCart,
  Pencil,
  Calendar,
  Tags,
  Users,
  Palette,
  PieChart,
  Plus,
  ExternalLink,
  Menu
} from 'lucide-react';

const DarkSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsExpanded(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { icon: Home, label: 'Dashboard' },
    { icon: Monitor, label: 'View site', hasExternal: true },
    { icon: ShoppingCart, label: 'Marketplace' },
    { icon: Pencil, label: 'Posts',
      submenu: [
        { label: 'Drafts', count: 10 },
        { label: 'Scheduled', count: 2 },
        { label: 'Published', count: 28 }
      ]
    },
    { icon: Calendar, label: 'Pages' },
    { icon: PieChart, label: 'Performance' },
    { icon: Tags, label: 'Tags' },
    { icon: Users, label: 'Members' },
    { icon: Palette, label: 'Design' }
  ];

  return (
    <div className="flex min-h-screen w-full bg-zinc-900 relative">
      {/* Hamburger Menu for PC */}
      <button 
        className="absolute top-4 left-4 text-white z-50" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: isExpanded ? '16rem' : '4rem' }}
        transition={{ duration: 0.3 }}
        className="bg-black h-screen fixed top-0 left-0 z-40 md:relative flex flex-col overflow-hidden"
      >
        <nav className="mt-28 px-2 h-full overflow-y-auto">
          {menuItems.map((item) => (
            <motion.div 
              key={item.label} 
              whileHover={{ backgroundColor: 'rgba(24, 24, 27, 0.8)' }}
              transition={{ duration: 0.2 }}
              className="relative mb-1 rounded-md"
            >
              <button
                onClick={() => {
                  setActiveMenu(item.label.toLowerCase());
                  if (item.label !== 'Posts') setShowCreateMenu(false);
                }}
                className="w-full rounded-md px-3 py-2 flex items-center text-gray-400 group hover:text-white transition-all duration-200"
              >
                <item.icon size={18} className="flex-shrink-0" />
                {isExpanded && (
                  <div className="flex-1 flex justify-between items-center ml-3">
                    <span className="text-sm">{item.label}</span>
                    {item.hasExternal && <ExternalLink size={14} />}
                    {item.label === 'Posts' && (
                      <Plus
                        size={14}
                        className="hover:bg-zinc-700 rounded-sm transition-all duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowCreateMenu((prev) => !prev);
                        }}
                      />
                    )}
                  </div>
                )}
              </button>
              {item.submenu && activeMenu === item.label.toLowerCase() && isExpanded && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="pl-9 pr-3 space-y-1 mt-1"
                >
                  {item.submenu.map((subitem) => (
                    <button key={subitem.label} className="w-full flex justify-between items-center py-2 px-2 text-gray-400 hover:text-white rounded-md hover:bg-zinc-800 transition-all duration-200 text-sm">
                      <span>{subitem.label}</span>
                      <span className="bg-zinc-800 px-2 py-0.5 rounded-full text-xs">{subitem.count}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </nav>
      </motion.div>
    </div>
  );
};

export default DarkSidebar;
