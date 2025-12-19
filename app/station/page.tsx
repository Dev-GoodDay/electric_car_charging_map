'use client'

import { Suspense, useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import 한국전력공사API from '@/api/전기차 충전/한국전력공사API'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

export default function StationPage() {
  const [address, setAddress] = useState<string>('')
  const [chargeAble, setChargeAble] = useState<string>('')
  const [fastCharger, setFastCharger] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-4">
      <div className="flex gap-1">
        <Input
          type="text"
          value={address}
          onChange={handleInputChange}
          placeholder="주소를 입력하세요"
        />

        {/* 충전기 타입 필터 */}
        <Select
          value={fastCharger}
          onValueChange={value => setFastCharger(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="급속여부" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">완속</SelectItem>
            <SelectItem value="2">급속</SelectItem>
          </SelectContent>
        </Select>
        {/* 충전기 상태 필터 */}
        <Select
          value={chargeAble}
          onValueChange={value => setChargeAble(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="충전여부" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">충전 가능</SelectItem>
            <SelectItem value="0">충전 불가</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 필터링된 충전소 목록 */}
      <div>
        <Suspense fallback={<div>로딩중...</div>}>
          <EvSearchList
            address={address}
            chargeAble={chargeAble}
            fastCharger={fastCharger}
          />
        </Suspense>
      </div>
    </main>
  )
}

const EvSearchList = ({
  address,
  chargeAble,
  fastCharger
}: {
  address: string
  chargeAble: string
  fastCharger: string
}) => {
  const { data } = useSuspenseQuery({
    queryKey: ['getEvSearchList', address],
    queryFn: () =>
      한국전력공사API.getEvSearchList({
        page: 1,
        perPage: 5,
        addr: address
      }),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000 * 2
  })

  const filteredData = data?.filter(station => {
    const matchCharge = chargeAble
      ? station.isAvailable() === (chargeAble === '1')
      : true

    const matchType = fastCharger
      ? station.isFastCharger() === (fastCharger === '2')
      : true

    return matchCharge && matchType
  })

  return (
    <Table className="max-w-3xl">
      <TableHeader>
        <TableRow>
          <TableHead>번호</TableHead>
          <TableHead>주소</TableHead>
          <TableHead>장소명</TableHead>
          <TableHead>충전기</TableHead>
          <TableHead>충전여부</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((station, index: number) => {
          const isVisible = filteredData?.includes(station)
          return (
            <TableRow
              key={station.cpId + station.csId + index}
              className={
                isVisible ? '' : 'bg-gray-200 text-gray-500 hover:bg-gray-200'
              }>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{station.addr}</TableCell>
              <TableCell>{station.csNm}</TableCell>
              <TableCell>{station.cpNm}</TableCell>
              <TableCell>{station.cpStat}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
