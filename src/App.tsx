// import HomePage from "pages/HomePage"
import { Suspense } from "react"
// import PrivateRoutes from "./routes/PrivateRouters"
import PublicRoutes from "./routes/PublicRoutes"
import Header from "./features/Header/Header"
import { AppStyles, Footer } from "./App.styled"

export const App = () => {
  return (
    <>
      <AppStyles />

      <Header />

      <Suspense fallback={'loading...'}>
        <PublicRoutes />
        {/* <PrivateRoutes /> */}
      </Suspense>

      <Footer>
        <div> Valantis testMP</div>
      </Footer>
    </>
  )
}

export default App
