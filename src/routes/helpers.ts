//App paths

export const pathPublic: { [k: string]: string } = {
  home: '/',
  login: './login',
  productDetails: '/product/:idOrSlug',
  cart: './cart',
  favorites: '/favorites',
}

export const pathPrivate: { [k: string]: string } = { accountSettings: '/account-settings', }

export const paths: { [k: string]: string } = Object.assign({}, pathPublic, pathPrivate)


// check if pathname matches to one of given key from paths argument

export const checkPathMatch = (
  pathname: string,
  paths: { [k: string]: string },
) => {

  let isMatch: boolean = false

  const allPaths = Object.keys(paths).map((k) => paths[k])
  const pathFirstSection = pathname.split('/')[1]

  allPaths.forEach((p) => {
    if (p.slice(1) === pathFirstSection) isMatch = true
  })
  return isMatch
}
