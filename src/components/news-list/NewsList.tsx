import { ClipLoader } from 'react-spinners'
import { NewsType } from 'context/NewsContext.types'
import './NewsList.css'
import NewsItem from 'components/news-item/NewsItem'
import { useNews } from 'context/NewsContext'

const NewsList = () => {
  const { newsData, isMoreBtnDisabled, paginate, getNewsListClass } = useNews()
  const isMoreDisabled = isMoreBtnDisabled()
  return (
    <div className={`${getNewsListClass()}`} data-testid="news-list">
      {newsData?.length === 0 ? (
        <div className="loader" data-testid="loader">
          <ClipLoader color="ff6600" />
        </div>
      ) : (
        <div>
          <ul>
            {newsData?.map((data: NewsType, i: number) => (
              <li key={data?.id}>
                <NewsItem news={data} index={i} />
              </li>
            ))}
          </ul>
          <button
            disabled={isMoreDisabled}
            onClick={() => paginate()}
            className="more-btn"
          >
            More
          </button>
        </div>
      )}
    </div>
  )
}

export default NewsList
