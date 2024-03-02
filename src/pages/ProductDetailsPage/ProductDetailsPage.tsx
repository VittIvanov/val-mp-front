import { Helmet } from "react-helmet"
import { PageWrapper } from "../../App.styled"
import { Link } from "react-router-dom"
import { paths } from "../../routes/helpers"
import Button from "../../components/Button/Button"

const ProductDetailsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Страница продукта- Valantis testMP</title>
      </Helmet>

      <h1>Страница продукта</h1>
      <PageWrapper>
        <p>в разработке...</p>
        <Link to={paths.home}>
          <Button>
            <h2>Вернуться на главную</h2>
          </Button>
        </Link>
      </PageWrapper>
    </>
  )
}

export default ProductDetailsPage
