import { ClipLoader } from 'react-spinners'
import { NewsType } from 'pages/homepage/Home.types'
import './NewsList.css'
import NewsItem from 'components/news-item/NewsItem'

const NewsList = ({ newsData }: { newsData: NewsType[] }) => {
  return (
    <div
      className={`${newsData?.length === 500 && 'news-list'}`}
      data-testid="news-list"
    >
      {newsData?.length < 500 ? (
        <div className="loader">
          <ClipLoader color="ff6600" />
        </div>
      ) : (
        <ol>
          {newsData?.map((data: NewsType) => (
            <li key={data?.id}>
              <NewsItem news={data} />
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

export default NewsList
