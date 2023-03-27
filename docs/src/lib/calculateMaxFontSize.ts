import {useTypescalesStore} from '../stores/typescales'

export function calculateMaxFontSize(step: number): number {
  const typescaleStore = useTypescalesStore()
  return Math.round(typescaleStore.stepWidth * (typescaleStore.maxF0 * Math.pow(typescaleStore.maxR, step / typescaleStore.maxN))) / typescaleStore.stepWidth
}
