import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10">
      <h1 className="text-4xl font-bold">전기차 충전(A기능추가)</h1>
      <div className="flex gap-2">
        <Button asChild>
          <Link href="/station">충전소 검색</Link>
        </Button>

        <Button asChild>
          <Link href="/favorite">즐겨찾기</Link>
        </Button>
      </div>
    </main>
  )
}
