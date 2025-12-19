'use client'

import { Suspense, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useSuspenseQuery } from '@tanstack/react-query'
import useFavoriteStore from '@/store/favoriteStore'
import StationCard from '@/components/custom/StationCard'
import 한국전력공사API from '@/api/전기차충전/한국전력공사API'

export default function FavoritePage() {
  const [address, setAddress] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-4">
      <Input
        type="text"
        value={address}
        onChange={handleInputChange}
        placeholder="주소를 입력하세요"
      />
      <FavoriteList />
      <Suspense fallback={<div>로딩중...</div>}>
        <EvSearchList address={address} />
      </Suspense>
    </main>
  )
}

const FavoriteList = () => {
  const favoriteStationList = useFavoriteStore(
    state => state.favoriteStationList
  )

  return (
    <>
      <h2>즐겨찾기</h2>
      <div className="flex w-full flex-wrap gap-1">
        {favoriteStationList.map(station => (
          <StationCard
            key={station.cpId}
            {...station}
            getLocation={station.getLocation}
            isAvailable={station.isAvailable}
            isFastCharger={station.isFastCharger}
          />
        ))}
      </div>
    </>
  )
}

const EvSearchList = ({ address }: { address: string }) => {
  const { data } = useSuspenseQuery({
    queryKey: ['getEvSearchList', address],
    queryFn: () =>
      한국전력공사API.getEvSearchList({
        page: 1,
        perPage: 10,
        addr: address
      }),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000 * 2
  })

  return (
    <>
      <h2>검색결과</h2>
      <div className="flex w-full flex-wrap gap-1">
        {data.map(station => {
          return (
            <StationCard
              key={station.cpId}
              {...station}
              getLocation={station.getLocation}
              isAvailable={station.isAvailable}
              isFastCharger={station.isFastCharger}
            />
          )
        })}
      </div>
    </>
  )
}
