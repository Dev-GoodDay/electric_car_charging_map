import { Station } from '@/api/전기차 충전/types'
import useFavoriteStore from '@/store/favoriteStore'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card'
import { Button } from '../ui/button'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'

export default function StationCard(props: Station) {
  // 스토어에서 상태와 액션을 가져옵니다.
  const isFavorited = useFavoriteStore(state => {
    return state.favoriteStationList.some(s => s.cpId === props.cpId)
  })
  const addFavoriteStation = useFavoriteStore(state => state.addFavoriteStation)
  const removeFavoriteStation = useFavoriteStore(
    state => state.removeFavoriteStation
  )

  // 즐겨찾기 상태를 토글하는 함수
  const toggleFavorite = () => {
    if (isFavorited) {
      removeFavoriteStation(props)
    } else {
      addFavoriteStation(props)
    }
  }

  return (
    <Card className="w-60">
      <CardHeader>
        <CardTitle>{props.csNm}</CardTitle>
        <CardDescription>{props.addr}</CardDescription>
      </CardHeader>
      <CardContent className="grid">
        <div className="grid grid-cols-3 gap-2">
          <div className="flex items-center gap-2 text-sm">
            <span>{props.cpNm}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>{props.cpStat === '1' ? '사용가능' : '사용불가'}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-2"
            onClick={() => toggleFavorite()}>
            {isFavorited ? (
              <MdFavorite size={32} />
            ) : (
              <MdFavoriteBorder size={32} />
            )}
            <span className="sr-only">Favorite</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
