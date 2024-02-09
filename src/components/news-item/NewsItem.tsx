import './NewsItem.css'
import { timeAgo } from 'utils/time/Time'
import { NewsItemProps } from './NewsItem.types'
import { useNews } from 'context/NewsContext'

const NewsItem = (props: NewsItemProps) => {
  const { news, index } = props
  const { currentPage } = useNews()
  const serialNumber = (currentPage - 1) * 30 + index + 1
  return (
    <li key={news.id} className="news-item" data-testid="news-item">
      <div className="numbers">{serialNumber}.</div>
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
    </li>
  )
}

export default NewsItem
