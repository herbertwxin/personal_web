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
import { useState } from 'react'
import { MarkdownRenderer } from './MarkdownRenderer'
import { TableOfContents } from './TableOfContents'
import { blogPosts } from '../lib/blogPosts'

interface BlogPostPageProps {
  blogId: number | null
  onBack: () => void
}

export function BlogPostPage({ blogId, onBack }: BlogPostPageProps) {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  const post = blogPosts.find(p => p.id === blogId)

  if (!post) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-white mb-4'>Post not found</h1>
          <Button onClick={onBack} variant="outline" className="text-white/80 border-white/20 hover:bg-white/10 hover:text-white">
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Blog
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen pb-12 px-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='py-8'>
          <Button
            variant='ghost'
            onClick={onBack}
            className='mb-8 text-white/70 hover:bg-white/10 hover:text-white'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Blog
          </Button>

          {/* Article Header */}
          <header className='mb-8 page-header'>
            <h1 className='text-5xl font-bold text-white tracking-tighter mb-6'>
              {post.title}
            </h1>

            {/* Article Meta */}
            <div className='flex flex-wrap items-center gap-6 mb-6'>
              <div className='flex items-center gap-2 text-white/70'>
                <Calendar className='w-4 h-4' />
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className='flex items-center gap-2 text-white/70'>
                <Clock className='w-4 h-4' />
                <span>
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
                  className='bg-white/10 text-white/80'
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </header>
        </div>

        {/* Content with TOC Layout */}
        <div className='flex gap-8 relative'>
          {/* Main Content */}
          <div className='flex-1 min-w-0'>
            {/* Article Content */}
            <article className='prose prose-invert prose-lg max-w-none'>
              <MarkdownRenderer content={post.content} />
            </article>

            {/* Article Actions */}
            <div className='mt-12 pt-8 border-t border-white/10'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setLiked(!liked)}
                    className={`${
                      liked ? 'bg-blue-500/10 text-blue-300 border-blue-500/20' : 'text-white/70 border-white/20 hover:bg-white/10 hover:text-white'
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
                      bookmarked ? 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20' : 'text-white/70 border-white/20 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 mr-2 ${bookmarked ? 'fill-current' : ''}`} />
                    {bookmarked ? 'Saved' : 'Save'}
                  </Button>
                </div>
                <Button variant='outline' size='sm' className="text-white/70 border-white/20 hover:bg-white/10 hover:text-white">
                  <Share2 className='w-4 h-4 mr-2' />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Table of Contents Sidebar - Sticky */}
          <div className='hidden lg:block w-64 flex-shrink-0'>
            <div className='sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto'>
              <TableOfContents className='w-full' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
