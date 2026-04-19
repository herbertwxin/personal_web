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
          <h1 className='font-serif text-2xl font-medium text-tx-primary mb-4'>Post not found</h1>
          <Button onClick={onBack} variant="outline" className="text-tx-secondary border-bd-strong hover:bg-sf-hover hover:text-tx-primary">
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
            className='mb-8 text-tx-muted hover:bg-sf-hover hover:text-tx-primary'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Blog
          </Button>

          {/* Article Header */}
          <header className='mb-8 page-header'>
            <h1
              className='font-serif text-5xl font-medium text-tx-primary tracking-tight mb-6'
              style={{ lineHeight: '1.1' }}
            >
              {post.title}
            </h1>

            {/* Article Meta */}
            <div className='flex flex-wrap items-center gap-6 mb-6'>
              <div className='flex items-center gap-2 text-tx-faint'>
                <Calendar className='w-4 h-4' />
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className='flex items-center gap-2 text-tx-faint'>
                <Clock className='w-4 h-4' />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Tags */}
            <div className='flex flex-wrap gap-2 mb-8'>
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant='secondary'
                  className='bg-sf-hover text-tx-muted border border-bd-strong'
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
            <article className='prose prose-stone prose-lg max-w-none prose-headings:font-serif prose-headings:font-medium prose-a:text-ac-brand'>
              <MarkdownRenderer content={post.content} />
            </article>

            {/* Article Actions */}
            <div className='mt-12 pt-8 border-t border-bd-subtle'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setLiked(!liked)}
                    className={`${
                      liked
                        ? 'bg-ac-brand/10 text-ac-brand border-ac-brand/30'
                        : 'text-tx-muted border-bd-strong hover:bg-sf-hover hover:text-tx-primary'
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
                      bookmarked
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'text-tx-muted border-bd-strong hover:bg-sf-hover hover:text-tx-primary'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 mr-2 ${bookmarked ? 'fill-current' : ''}`} />
                    {bookmarked ? 'Saved' : 'Save'}
                  </Button>
                </div>
                <Button variant='outline' size='sm' className="text-tx-muted border-bd-strong hover:bg-sf-hover hover:text-tx-primary">
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
