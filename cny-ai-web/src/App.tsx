import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { Home } from '@/pages/Home'
import { GreetingGenerator } from '@/pages/GreetingGenerator'
import { RelativeDefense } from '@/pages/RelativeDefense'
import { CardMaker } from '@/pages/CardMaker'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/greeting" element={<GreetingGenerator />} />
          <Route path="/defense" element={<RelativeDefense />} />
          <Route path="/card" element={<CardMaker />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
