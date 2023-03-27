import {useTypescalesStore} from '../stores/typescales'

export function calculateMinFontSize(step: number): number {
  const typescaleStore = useTypescalesStore()
  return Math.round(typescaleStore.stepWidth * (typescaleStore.minF0 * Math.pow(typescaleStore.minR,  step / typescaleStore.minN))) / typescaleStore.stepWidth
}
