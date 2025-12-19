import { Station } from '@/api/전기차 충전/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  favoriteStationList: Station[]
}

type Actions = {
  addFavoriteStation: (station: Station) => void
  removeFavoriteStation: (station: Station) => void
  reset: () => void
}

const initialState: State = {
  favoriteStationList: []
}

const useFavoriteStore = create<State & Actions>()(
  persist(
    set => ({
      ...initialState,
      addFavoriteStation: (station: Station) => {
        set(state => ({
          favoriteStationList: [...state.favoriteStationList, station]
        }))
      },
      removeFavoriteStation: (station: Station) => {
        set(state => ({
          favoriteStationList: state.favoriteStationList.filter(
            s => s.cpId !== station.cpId
          )
        }))
      },
      reset: () => {
        set(initialState)
      }
    }),
    {
      name: 'favoriteStore-storage' // 로컬 스토리지에 저장될 키 이름
      //storage: createJSONStorage(() => localStorage) // 로컬 스토리지에 상태 저장
    }
  )
)

export default useFavoriteStore
