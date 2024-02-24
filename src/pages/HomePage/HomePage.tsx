import { Helmet } from 'react-helmet'
import { TestDiv, TestDiv2 } from './styled'

const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Главная- Valantis</title>

      </Helmet>

      <TestDiv />
      <TestDiv2 />
    </>)
}

export default HomePage
