import './NewsItem.css'
import { timeAgo } from 'utils/Time'
import { NewsItemProps } from './NewsItem.types'

const NewsItem = (props: NewsItemProps) => {
  const { news, currentPage, index } = props
  return (
    <div className="news-item" data-testid="news-item">
      <div className="numbers">{(currentPage - 1) * 30 + index + 1}.</div>
      <div className="upvote"></div>
      <div>
        <div>
          <a className="title" href={news?.url}>
            {news?.title}
          </a>{' '}
          <span className="news-url">({news?.url})</span>
        </div>
        <div className="metadata">
          {news?.score} points by <span className="underlined">{news?.by}</span>{' '}
          <span className="underlined">{timeAgo(news?.time)}</span> |{' '}
          <span className="underlined">hide</span> |{' '}
          <span className="underlined">part</span> |{' '}
          <span className="underlined">{news?.descendants} comments</span>
        </div>
      </div>
    </div>
  )
}

export default NewsItem
