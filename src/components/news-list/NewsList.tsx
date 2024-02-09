import { ClipLoader } from 'react-spinners'
import { NewsType } from 'context/NewsContext.types'
import './NewsList.css'
import NewsItem from 'components/news-item/NewsItem'
import { useNews } from 'context/NewsContext'

const NewsList = () => {
  const { news, isMoreBtnDisabled, handleMoreClick } = useNews()
  return (
    <div
      className={`${news.length > 0 && 'news-list'}`}
      data-testid="news-list"
    >
      {news?.length === 0 ? (
        <div className="loader" data-testid="loader">
          <ClipLoader color="ff6600" />
        </div>
      ) : (
        <>
          <ul>
            {news?.map((data: NewsType, i: number) => (
              <NewsItem news={data} index={i} />
            ))}
          </ul>
          <button
            disabled={isMoreBtnDisabled}
            onClick={() => handleMoreClick()}
            className="more-btn"
          >
            More
          </button>
        </>
      )}
    </div>
  )
}

export default NewsList
