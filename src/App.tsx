import HomePage from "pages/HomePage"
import { Suspense } from "react"
import PrivateRoutes from "./routes/PrivateRouters"
import PublicRoutes from "./routes/PublicRoutes"

export const App = () => {
  return (
    <Suspense fallback={'loading...'}>
      <PublicRoutes />
      {/* <PrivateRoutes /> */}
    </Suspense>
  )
}

export default App
