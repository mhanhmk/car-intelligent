import React from 'react'

import { BrowserRouter } from 'react-router-dom'
import RouterView from './router'
import { getFromSessionStorage } from './utils/tool'

export const GlobalState = React.createContext()

export default function App() {
  const [globalState, setGlobalState] = React.useState(
    getFromSessionStorage('globalState') ?? {
      isLogin: false,
      userInfo: null,
    }
  )

  return (
    <BrowserRouter>
      <GlobalState.Provider value={[globalState, setGlobalState]}>
        <RouterView />
      </GlobalState.Provider>
    </BrowserRouter>
  )
}
