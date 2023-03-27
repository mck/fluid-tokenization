import {calculateMinFontSize} from './calculateMinFontSize'
import {calculateMaxFontSize} from './calculateMaxFontSize'
import {calculateFluidFontSize} from './calculateFluidFontSize'
import {useTypescalesStore} from '../stores/typescales'

export function generateTypescaleSteps(stepsDown: number, stepsUp: number): StepSettings[][] {
  const typescaleStore = useTypescalesStore()
  const typescales: StepSettings[][] = [];

  for (let i = -stepsDown; i <= stepsUp; i++) {
    const scale: StepSettings[] = [];
    const step = "f" + i;
    const minFontSize = calculateMinFontSize(i);
    const maxFontSize = calculateMaxFontSize(i);
    const { clamped: fluidFontSize } = calculateFluidFontSize(minFontSize, maxFontSize, typescaleStore.screenWidth)

    scale.push({ breakpoint: typescaleStore.minBreakpoint - typescaleStore.offsetGraph, cssValue: minFontSize, step });
    scale.push({ breakpoint: typescaleStore.minBreakpoint, cssValue: minFontSize, step });
    scale.push({ breakpoint: typescaleStore.screenWidth, cssValue: fluidFontSize, step });
    scale.push({ breakpoint: typescaleStore.maxBreakpoint, cssValue: maxFontSize, step });
    scale.push({ breakpoint: typescaleStore.maxBreakpoint + typescaleStore.offsetGraph, cssValue: maxFontSize, step });
    typescales.push(scale);
  }
  return typescales;
}
