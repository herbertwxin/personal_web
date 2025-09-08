import { motion } from 'framer-motion'
import { Badge } from './ui/badge'
import {
  BookOpen,
  GraduationCap,
  User,
  MessageSquare,
  Database,
} from 'lucide-react'

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const collections = [
    {
      title: 'Work Collection',
      items: [
        {
          id: 'publications',
          label: 'Research Papers',
          icon: BookOpen,
          count: 15,
        },
        { id: 'stack', label: 'Math Models', icon: Database, count: 6 },
      ],
    },
    {
      title: 'Academic Profile',
      items: [
        { id: 'resume', label: 'CV & Bio', icon: User, count: 1 },
        { id: 'teaching', label: 'Teaching', icon: GraduationCap, count: 8 },
      ],
    },
    {
      title: 'Communication',
      items: [
        { id: 'blog', label: 'Blog Posts', icon: MessageSquare, count: 12 },
      ],
    },
  ]

  const socialLinks = [
    { label: 'Twitter', icon: 'Tw' },
    { label: 'LinkedIn', icon: 'In' },
    { label: 'ResearchGate', icon: 'Rg' },
    { label: 'ORCID', icon: 'Or' },
  ]

  return (
    <motion.aside
      className='w-80 h-full bg-slate-900/50 border-r border-slate-800/50 backdrop-blur-sm overflow-y-auto'
      initial={{ x: -320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      <div className='p-6 space-y-8'>
        {/* Collection Number */}
        <motion.div
          className='text-slate-500 text-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          /01
        </motion.div>

        {/* Collections */}
        {collections.map((collection, collectionIndex) => (
          <motion.div
            key={collection.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + collectionIndex * 0.1 }}
            className='space-y-4'
          >
            <h3 className='text-white font-medium text-sm'>
              {collection.title}
            </h3>
            <div className='space-y-2'>
              {collection.items.map((item, itemIndex) => {
                const Icon = item.icon
                const isActive = currentPage === item.id

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => onPageChange(item.id)}
                    className={`
                      w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200
                      ${
                        isActive
                          ? 'bg-slate-800/70 text-white border border-slate-700/50'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
                      }
                    `}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.4 + collectionIndex * 0.1 + itemIndex * 0.05,
                    }}
                  >
                    <div className='flex items-center space-x-3'>
                      <Icon className='w-4 h-4' />
                      <span className='text-sm'>{item.label}</span>
                    </div>
                    <Badge
                      variant='secondary'
                      className={`
                        text-xs px-2 py-0.5
                        ${
                          isActive
                            ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                            : 'bg-slate-700/50 text-slate-400 border-slate-600/50'
                        }
                      `}
                    >
                      {item.count}
                    </Badge>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        ))}

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className='space-y-4'
        >
          <h3 className='text-white font-medium text-sm'>Connect</h3>
          <div className='flex flex-wrap gap-2'>
            {socialLinks.map((social, index) => (
              <motion.button
                key={social.label}
                className='w-8 h-8 bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-white rounded-lg flex items-center justify-center text-xs transition-all duration-200'
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                title={social.label}
              >
                {social.icon}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.aside>
  )
}
