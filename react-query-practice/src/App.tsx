
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import Main from './components/unique/Main'
// import Product from './components/product'
// import User from './views/user'
// import CreateUserForm from './views/create-user'
// import TablePagination from './views/table-pagination'
// import InfiniteProductList from './views/infinite-query'
// import RealTimeProductList from './views/real-time-product-list'
import { Chat } from './views/chat'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      {/* <Product /> */}
      {/* <User userId={1} /> */}
      {/* <CreateUserForm /> */}
      {/* <Main /> */}
      {/* <TablePagination /> */}
      {/* <InfiniteProductList /> */}
      {/* <RealTimeProductList /> */}
      <Chat />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
