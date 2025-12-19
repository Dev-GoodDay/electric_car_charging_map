import { Station, StationDTO } from './types'

class 한국전력공사API {
  url = process.env.NEXT_PUBLIC_EV_CHARGING_URL

  async getEvSearchList({
    page,
    perPage,
    addr
  }: {
    page: number
    perPage: number
    addr: string
  }): Promise<Station[]> {
    if (!addr) {
      return [] // 주소가 없을 경우 빈 배열 반환
    }

    const response = await fetch(
      `${this.url}?page=${page}&perPage=${perPage}&addr=${addr}&cond[addr:LIKE]`
    ).then(response => response.json())

    return response.data.map((station: StationDTO) => new Station(station)) // 필요한 충전소 리스트인 data만 반환
  }
}

export default new 한국전력공사API()
