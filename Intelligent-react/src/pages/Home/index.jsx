import Header from './Header'

import { RouterBeforeEach } from '../../router'

export default function Home() {
  return (
    <>
      <Header />
      <RouterBeforeEach />
    </>
  )
}
