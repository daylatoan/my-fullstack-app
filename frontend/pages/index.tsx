import Link from 'next/link'
import { Container } from 'react-bootstrap'

export default function Home() {
  return (
    <Container className="text-center mt-5">
      <h1>🏡 Trang chủ Fullstack</h1>
      <p>Chào mừng bạn đến với website của Toàn.</p>

      <div className="mt-4">
        <Link href="/about" className="btn btn-primary mx-2">Giới thiệu</Link>
        <Link href="/cv" className="btn btn-success mx-2">Xem CV</Link>
      </div>
    </Container>
  )
}
