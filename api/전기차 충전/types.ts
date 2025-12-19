export interface StationDTO {
  csId: number
  csNm: string
  addr: string
  lat: string
  longi: string
  cpId: number
  cpNm: string
  chargeTp: string
  cpTp: string
  stateUpdateTime: string
  cpStat: string
}

export class Station {
  csId: number
  csNm: string
  addr: string
  lat: number
  longi: number
  cpId: number
  cpNm: string
  chargeTp: string
  cpTp: string
  stateUpdateTime: string
  cpStat: string

  constructor(data: StationDTO) {
    this.csId = data.csId
    this.csNm = data.csNm
    this.addr = data.addr
    this.lat = parseFloat(data.lat)
    this.longi = parseFloat(data.longi)
    this.cpId = data.cpId
    this.cpNm = data.cpNm
    this.chargeTp = data.chargeTp
    this.cpTp = data.cpTp
    this.stateUpdateTime = data.stateUpdateTime
    this.cpStat = data.cpStat
  }

  // 충전기 상태가 "충전 가능"인지 확인하는 메서드
  isAvailable(): boolean {
    return this.cpStat === '1'
  }

  // 급속 충전기인지 확인하는 메서드
  isFastCharger(): boolean {
    return this.chargeTp === '2'
  }

  // 위치 정보를 객체 형태로 반환하는 메서드
  getLocation(): { latitude: number; longitude: number } {
    return { latitude: this.lat, longitude: this.longi }
  }
}
