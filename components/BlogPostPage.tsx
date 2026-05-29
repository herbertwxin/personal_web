import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { blogPosts } from '../lib/blogPosts'

interface BlogPostPageProps {
  blogId: number | null
  onBack: () => void
}

export function BlogPostPage({ blogId, onBack }: BlogPostPageProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const observerRef = useRef<ResizeObserver | null>(null)
  const [iframeHeight, setIframeHeight] = useState<number>(600)

  const post = blogPosts.find(p => p.id === blogId)

  // Measure the rendered document and size the iframe so the article flows
  // inline with a single page scroll (no nested scrollbar).
  const resizeIframe = useCallback(() => {
    const iframe = iframeRef.current
    const doc = iframe?.contentWindow?.document
    if (!doc) {return}
    const height = Math.max(
      doc.documentElement.scrollHeight,
      doc.body?.scrollHeight ?? 0
    )
    if (height > 0) {setIframeHeight(height)}
  }, [])

  // On load, measure once and then keep watching the document: images and web
  // fonts settle after the load event and grow the content, so a single
  // measurement clips the article. A ResizeObserver re-measures on any change.
  const handleLoad = useCallback(() => {
    resizeIframe()
    const doc = iframeRef.current?.contentWindow?.document
    if (!doc) {return}
    observerRef.current?.disconnect()
    const observer = new ResizeObserver(() => resizeIframe())
    observer.observe(doc.documentElement)
    observerRef.current = observer
  }, [resizeIframe])

  useEffect(() => {
    window.addEventListener('resize', resizeIframe)
    return () => {
      window.removeEventListener('resize', resizeIframe)
      observerRef.current?.disconnect()
    }
  }, [resizeIframe])

  if (!post) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='font-serif text-2xl font-medium text-tx-primary mb-4'>
            Post not found
          </h1>
          <Button
            onClick={onBack}
            variant='outline'
            className='text-tx-secondary border-bd-strong hover:bg-sf-hover hover:text-tx-primary'
          >
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
        {/* Toolbar */}
        <div className='py-8'>
          <Button
            variant='ghost'
            onClick={onBack}
            className='mb-6 text-tx-muted hover:bg-sf-hover hover:text-tx-primary'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Blog
          </Button>

          <div className='flex flex-wrap items-center gap-4 text-sm text-tx-faint'>
            <span className='flex items-center gap-2'>
              <Calendar className='w-4 h-4' />
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className='flex items-center gap-2'>
              <Clock className='w-4 h-4' />
              {post.readTime}
            </span>
            <span className='flex flex-wrap gap-2'>
              {post.tags.map(tag => (
                <Badge
                  key={tag}
                  variant='secondary'
                  className='bg-sf-hover text-tx-muted border border-bd-strong'
                >
                  {tag}
                </Badge>
              ))}
            </span>
          </div>
        </div>

        {/* Article rendered in a sandboxed iframe to preserve its
            self-contained styling and isolate its CSS from the site. */}
        <div className='overflow-hidden rounded-lg border border-bd-subtle bg-white shadow-sm'>
          <iframe
            ref={iframeRef}
            src={`/downloadable/blog/${post.htmlFile}`}
            title={post.title}
            onLoad={handleLoad}
            scrolling='no'
            sandbox='allow-same-origin allow-popups allow-popups-to-escape-sandbox'
            className='w-full block border-0'
            style={{ height: `${iframeHeight}px` }}
          />
        </div>

        {/* Actions */}
        <div className='mt-8 flex items-center justify-end'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              const url = `${window.location.origin}/downloadable/blog/${post.htmlFile}`
              if (navigator.share) {
                void navigator.share({ title: post.title, url })
              } else {
                void navigator.clipboard?.writeText(url)
              }
            }}
            className='text-tx-muted border-bd-strong hover:bg-sf-hover hover:text-tx-primary'
          >
            <Share2 className='w-4 h-4 mr-2' />
            Share
          </Button>
        </div>
      </div>
    </div>
  )
}
