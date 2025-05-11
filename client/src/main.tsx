import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import App from './App.jsx'
import SearchBooks from './pages/SearchBooks'
import SavedBooks from './pages/SavedBooks'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <SearchBooks />
      }, {
        path: '/saved',
        element: <SavedBooks />
      }
    ]
  }
])

const client = new ApolloClient({
  uri: 'http://127.0.0.1:3001/graphql/users',
  cache: new InMemoryCache()
})

client
  .query({
    query: gql`
      query GetUser {
        me(id: "682121fbfcc1e200b8a10c30") {
          username
          email
        }
      }
    `,
  })
  .then((result) => console.log(result));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
