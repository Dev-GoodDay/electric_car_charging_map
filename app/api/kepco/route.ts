import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // 페이지 관련 파라미터
  const page = Number(searchParams.get('page') ?? 1)
  const perPage = Number(searchParams.get('perPage') ?? 10)

  // 한국전력공사에서 제공하는 파라미터
  const addr = searchParams.get('addr')

  // 안전장치
  const safePage = page > 0 ? page : 1
  const safePerPage = perPage > 0 && perPage <= 100 ? perPage : 10

  // URL + params 방식
  const url = new URL(`${process.env.NEXT_PUBLIC_EV_CHARGING_API}`)

  url.searchParams.set(
    'apiKey',
    `${process.env.NEXT_PUBLIC_EV_CHARGING_API_KEY}`
  )

  if (addr) {
    url.searchParams.set('addr', addr)
  }

  // 한국전력공사 API 호출
  const res = await fetch(url)

  const rawData = await res.json()

  // 응담 구조에 따라 경로 조정 필요
  const items = rawData.data ?? []

  // 페이징 계산
  const totalCount = items.length
  const totalPages = Math.ceil(totalCount / safePerPage)

  const startIndex = (safePage - 1) * safePerPage
  const endIndex = startIndex + safePerPage

  const pageItems = items.slice(startIndex, endIndex)

  return NextResponse.json({
    page: safePage,
    perPage: safePerPage,
    totalCount,
    totalPages,
    data: pageItems
  })
}
