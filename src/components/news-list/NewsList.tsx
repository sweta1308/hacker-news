import { ClipLoader } from 'react-spinners'
import { NewsType } from 'pages/homepage/Home.types'
import './NewsList.css'
import NewsItem from 'components/news-item/NewsItem'
import { NewsListProps } from './NewsList.types'

const NewsList = ({
  newsData,
  currentPage,
  setCurrentPage,
  idList,
}: NewsListProps) => {
  const paginate = () => {
    setCurrentPage((prev) => prev + 1)
  }
  return (
    <div
      className={`${newsData?.length > 0 && 'news-list'}`}
      data-testid="news-list"
    >
      {newsData?.length === 0 ? (
        <div className="loader">
          <ClipLoader color="ff6600" />
        </div>
      ) : (
        <div>
          <ul>
            {newsData?.map((data: NewsType, i: number) => (
              <li key={data?.id}>
                <NewsItem news={data} currentPage={currentPage} index={i} />
              </li>
            ))}
          </ul>
          <button
            disabled={currentPage === Math.ceil(idList?.length / 30)}
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
