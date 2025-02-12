import { useState, useEffect } from 'react';
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
  MoreVertical,
  Search,
  ExternalLink
} from 'lucide-react';

const DarkSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeMenu, setActiveMenu] = useState('posts');
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [submenuHeight, setSubmenuHeight] = useState(0);

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

  const CreateMenu = () => (
    <div 
      className="absolute left-full ml-2 top-0 bg-zinc-900 rounded-lg shadow-xl p-2 w-48 z-50 opacity-0 animate-fadeIn"
      style={{
        animation: 'fadeIn 0.2s ease-out forwards',
      }}
    >
      <div className="space-y-1">
        {['Create post', 'Create folder', 'Create project'].map((item, index) => (
          <button 
            key={item}
            className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-zinc-800 rounded-md flex items-center transition-all duration-200"
            style={{
              opacity: 0,
              animation: `slideIn 0.3s ease-out ${index * 0.05}s forwards`
            }}
          >
            <Plus size={16} className="mr-2" />
            {item}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-zinc-900">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div className={`bg-black transition-all duration-300 ease-in-out relative ${isExpanded ? 'w-64' : 'w-16'}`}>
        {/* Profile Section */}
        <div className="p-4 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden flex-shrink-0 transition-transform duration-300 hover:scale-105">
            <img src="/api/placeholder/40/40" alt="Profile" className="w-full h-full object-cover" />
          </div>
          {isExpanded && (
            <div className="flex-1 flex justify-between items-center animate-fadeIn">
              <span className="text-white font-medium text-sm">Frankie Sullivan</span>
              <div className="flex space-x-1">
                <button className="p-1.5 rounded-full hover:bg-zinc-800 text-gray-400 hover:text-white transition-all duration-200 hover:scale-105">
                  <Search size={16} />
                </button>
                <button className="p-1.5 rounded-full hover:bg-zinc-800 text-gray-400 hover:text-white transition-all duration-200 hover:scale-105">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <nav className="mt-4 px-2">
          {menuItems.map((item, index) => (
            <div 
              key={item.label} 
              className="relative mb-1"
              style={{
                opacity: 0,
                animation: `fadeIn 0.3s ease-out ${index * 0.03}s forwards`
              }}
            >
              <button
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setActiveMenu(item.label.toLowerCase())}
                className={`w-full rounded-md transition-all duration-200 ease-in-out
                  ${isExpanded ? 'px-3' : 'px-2'} py-2
                  flex items-center text-gray-400 group
                  ${hoveredItem === item.label || activeMenu === item.label.toLowerCase() 
                    ? 'bg-zinc-800 text-white' 
                    : 'hover:bg-zinc-800 hover:text-white'}`}
              >
                <item.icon 
                  size={18} 
                  className="flex-shrink-0 transition-transform duration-200 group-hover:scale-105" 
                />
                {isExpanded && (
                  <div className="flex-1 flex justify-between items-center ml-3">
                    <span className="text-sm">{item.label}</span>
                    {item.hasExternal && (
                      <ExternalLink 
                        size={14} 
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
                      />
                    )}
                    {item.submenu && (
                      <Plus
                        size={14}
                        className="hover:bg-zinc-700 rounded-sm transition-all duration-200 hover:scale-110"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowCreateMenu(true);
                        }}
                      />
                    )}
                  </div>
                )}
              </button>
              
              {/* Submenu */}
              {isExpanded && item.submenu && activeMenu === item.label.toLowerCase() && (
                <div 
                  className="pl-9 pr-3 space-y-1 mt-1 overflow-hidden"
                  style={{
                    animation: 'scaleIn 0.2s ease-out forwards',
                  }}
                >
                  {item.submenu.map((subitem, subIndex) => (
                    <button
                      key={subitem.label}
                      className="w-full flex justify-between items-center py-2 px-2 text-gray-400 hover:text-white rounded-md hover:bg-zinc-800 transition-all duration-200 text-sm"
                      style={{
                        opacity: 0,
                        animation: `slideIn 0.2s ease-out ${subIndex * 0.05}s forwards`
                      }}
                    >
                      <span>{subitem.label}</span>
                      <span className="bg-zinc-800 px-2 py-0.5 rounded-full text-xs">
                        {subitem.count}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Create Menu Popup */}
        {showCreateMenu && <CreateMenu />}
      </div>
      
      {/* Preview content area */}
      <div className="flex-1 p-4">
        <h2 className="text-xl font-bold text-white">Main Content Area</h2>
      </div>
    </div>
  );
};

export default DarkSidebar;
