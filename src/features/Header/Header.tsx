import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { paths } from 'routes/helpers'
import Button from 'components/Button'
import Input from 'components/Input'
import { selectIsLogged } from '../App/selectors'
import UserDropdownMenu from './UserDropdownMenu'
// import logoPng from 'img/logo.png'
import FilterSelector from '../FilterSelector/FilterSelector'
import { filterProductsByFieldValue, getItems } from '../../pages/api/apiGetUniqueItems'

import {
  Wrapper,
  LeftSide,
  // Logo,
  // Burger,
  SearchWrapper,
  BtnSearch,
  RightSide,
  BtnOrders,
  BtnFavorites,
  BtnNotifications,
  BtnCart,
} from './styled'
import { selectFavorites } from '../Favorites/selectors'
import { useDispatch } from 'react-redux'
import { setProducts } from '../../pages/api/productsSlice'


const Header: React.FC = () => {
  //const location = useLocation()
  const dispatch = useDispatch()
  const isLogged = useSelector(selectIsLogged)
  const favorites = useSelector(selectFavorites)

  // const [searchInput, setSearchInput] = useState<string>('')
  const [selectedValue, setSelectedValue] = useState<string>('')
  const [searchValue, setSearchValue] = useState<string>('')

  // const changeSearchInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchInput(e.target.value)
  // }, []);

  const handleChangeField = (field: string) => {
    setSelectedValue(field)
  }

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleSearch = async () => {
    try {
      let valueToFilter: string | number = searchValue
      if (selectedValue === 'price') {
        valueToFilter = parseInt(searchValue)
      }
      const filteredByFieldProducts = await filterProductsByFieldValue(selectedValue, valueToFilter)
      const detailedProducts = await getItems(filteredByFieldProducts)
      dispatch(setProducts(detailedProducts))
    } catch (error) {
      console.error('Произошла ошибка:', error)
    }
  };

  //   await filterProductsByFieldValue('price', 17500.0);
  //   console.log('Отфильтрованные товары(цена):', filteredByPriceProducts);
  // } catch (error) {
  //   console.error('Произошла ошибка:', error);
  // }

  // if (location.pathname.includes(paths.login)
  //   || location.pathname.includes(paths.register)
  //   || location.pathname.includes(paths.requestPasswordRecovery)
  //   || location.pathname.includes(paths.confirmPasswordRecovery)
  // ) return null




  return (
    <Wrapper>
      <LeftSide>
        <Link to={paths.home}>
          {/* <Logo src={logoPng} /> */}
          <h1>«Хороший магазин»</h1>
        </Link>

        <Button >
          {/* <Burger>
            <div /><div /><div />
          </Burger> */}
          <span>Фильтр:</span>

          <FilterSelector selectedValue={selectedValue} handleChange={handleChangeField} />
        </Button>
      </LeftSide>

      <SearchWrapper>
        <Input
          value={searchValue}
          onChange={handleChangeSearchValue}
          isGhost
          placeholder='поиск товаров'
          filterValue={selectedValue} // Передаем значение selectedField
        />

        <BtnSearch onClick={handleSearch} />
      </SearchWrapper>

      <RightSide>
        {isLogged ? <>
          <BtnOrders />
          <BtnFavorites count={favorites.length} />
          <BtnNotifications />
          <BtnCart />
          <UserDropdownMenu />
        </> : (
          <Link to={paths.login}>
            &nbsp;&nbsp;&nbsp;
            Войти
          </Link>
        )}
      </RightSide>
    </Wrapper>
  )
}

export default Header
