
import { Container } from 'react-bootstrap'
import NewsHero from "@/components/Categoreis/New-hero"
import NewsCategories from "@/components/Categoreis/New-categoreis"
import NewsGrid from "@/components/Categoreis/News-grid"

export default function Home() {
  return (
    <Container className="text-center mt-5">
      <NewsHero />
      <NewsCategories />
      <NewsGrid />
    </Container>
  )
}
