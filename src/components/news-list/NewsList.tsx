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
  const indexOfLastItem = currentPage * 30
  const indexOfFirstItem = indexOfLastItem - 30
  const currentItems = newsData.slice(indexOfFirstItem, indexOfLastItem)
  const paginate = () => setCurrentPage((prev) => prev + 1)
  return (
    <div
      className={`${newsData?.length === idList?.length && 'news-list'}`}
      data-testid="news-list"
    >
      {idList?.length !== newsData?.length ? (
        <div className="loader">
          <ClipLoader color="ff6600" />
        </div>
      ) : (
        <div>
          <ol start={indexOfFirstItem + 1}>
            {currentItems?.map((data: NewsType) => (
              <li key={data?.id}>
                <NewsItem news={data} />
              </li>
            ))}
          </ol>
          <button
            disabled={currentPage === Math.ceil(newsData?.length / 30)}
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
