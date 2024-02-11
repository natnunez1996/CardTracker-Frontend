import { CardCategory } from '@/enums/ECard'
import { type IRecordItem } from '@/model/CardModel'

export const calculateBalance = (recordList: IRecordItem[]): number => {
  let sum = 0

  recordList.forEach(item => {
    if (item.category === CardCategory.INCOME) {
      sum += item.amount
    }
    else {
      sum -= item.amount
    }
  })

  return sum
}
