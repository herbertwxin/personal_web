import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Bookmark,
  ThumbsUp,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { MarkdownRenderer } from './MarkdownRenderer'
import { TableOfContents } from './TableOfContents'
import { blogPosts } from '../lib/blogPosts'

interface BlogPostPageProps {
  blogId: number | null
  onBack: () => void
}

export function BlogPostPage({ blogId, onBack }: BlogPostPageProps) {
  const [hasAnimated, setHasAnimated] = useState(false)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const post = blogPosts.find(p => p.id === blogId)

  if (!post) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>Post not found</h1>
          <Button onClick={onBack}>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Blog
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen pb-12'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='py-8'
        >
          <Button
            variant='ghost'
            onClick={onBack}
            className='mb-8 text-black hover:bg-gray-100'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Blog
          </Button>

          {/* Article Header */}
          <header className='mb-8 page-header'>
            <h1
              className='text-black mb-6'
              style={{
                fontSize: 'var(--academic-font-size-page-title)',
                fontWeight: 'var(--academic-font-weight-page-title)',
                lineHeight: 'var(--academic-line-height-tight)'
              }}
            >
              {post.title}
            </h1>

            {/* Article Meta */}
            <div className='flex flex-wrap items-center gap-6 mb-6'>
              <div className='flex items-center gap-2 text-gray-600'>
                <Calendar className='w-4 h-4' />
                <span style={{ fontSize: 'var(--academic-font-size-metadata)' }}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className='flex items-center gap-2 text-gray-600'>
                <Clock className='w-4 h-4' />
                <span style={{ fontSize: 'var(--academic-font-size-metadata)' }}>
                  {post.readTime}
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className='flex flex-wrap gap-2 mb-8'>
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant='secondary'
                  className='bg-gray-100 text-gray-700 hover:bg-gray-200'
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </header>
        </motion.div>

        {/* Content with TOC Layout */}
        <div className='flex gap-8'>
          {/* Main Content */}
          <div className='flex-1'>
            {/* Article Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: hasAnimated ? 1 : 0, y: hasAnimated ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='prose prose-lg max-w-none'
              style={{
                fontSize: 'var(--academic-font-size-body)',
                lineHeight: 'var(--academic-line-height-normal)',
                color: 'var(--academic-text-primary)'
              }}
              data-toc-root
            >
              <MarkdownRenderer content={post.content} />
            </motion.article>

            {/* Article Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: hasAnimated ? 1 : 0, y: hasAnimated ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className='mt-12 pt-8 border-t border-gray-200'
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setLiked(!liked)}
                    className={`${
                      liked ? 'bg-blue-50 text-blue-600 border-blue-200' : ''
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 mr-2 ${liked ? 'fill-current' : ''}`} />
                    {liked ? 'Liked' : 'Like'}
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setBookmarked(!bookmarked)}
                    className={`${
                      bookmarked ? 'bg-yellow-50 text-yellow-600 border-yellow-200' : ''
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 mr-2 ${bookmarked ? 'fill-current' : ''}`} />
                    {bookmarked ? 'Saved' : 'Save'}
                  </Button>
                </div>
                <Button variant='outline' size='sm'>
                  <Share2 className='w-4 h-4 mr-2' />
                  Share
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Table of Contents Sidebar */}
          <div className='hidden lg:block w-64 flex-shrink-0'>
            <TableOfContents />
          </div>
        </div>
      </div>
    </div>
  )
}
