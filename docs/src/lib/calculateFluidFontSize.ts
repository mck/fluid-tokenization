import {useTypescalesStore} from '../stores/typescales'

export function calculateFluidFontSize(minFontSize: number, maxFontSize: number, screenWidth: number) {
  const typescaleStore = useTypescalesStore()
  const fontV = (100 * (maxFontSize-minFontSize) / (typescaleStore.maxBreakpoint-typescaleStore.minBreakpoint));
  const fontR = (( typescaleStore.minBreakpoint * maxFontSize - typescaleStore.maxBreakpoint * minFontSize) / (typescaleStore.minBreakpoint-typescaleStore.maxBreakpoint));
  const fluid = (screenWidth / 100 * fontV) + fontR
  const clamped = Math.min(maxFontSize, Math.max(minFontSize, fluid))

  return {clamped, fontR, fontV, fluid}
}
