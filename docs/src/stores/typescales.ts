import { defineStore } from 'pinia'
import {calculateMaxFontSize} from '../lib/calculateMaxFontSize'
import {calculateMinFontSize} from '../lib/calculateMinFontSize'
import {calculateFluidFontSize} from '../lib/calculateFluidFontSize'

export const useTypescalesStore = defineStore('typescales', {
  state: () => ({
    minBreakpoint: 360,
    minF0: 16,
    minR: 2,
    minN: 5,
    maxBreakpoint: 1920,
    maxF0: 18,
    maxR: 2.8,
    maxN: 5,
    stepsDown: 3,
    stepsUp: 10,
    stepWidth: 1 as 1 | 2,
    rem: 16,
    offsetGraph: 160,
    screenWidth: Math.min(1920, Math.max(360, window.innerWidth)) / 2
  }),
  getters: {
    typescales: (state) => {
      const typescales: StepSettings[][] = [];

      for (let i = -state.stepsDown; i <= state.stepsUp; i++) {
        const scale: StepSettings[] = [];
        const step = "f" + i;
        const minFontSize = calculateMinFontSize(i);
        const maxFontSize = calculateMaxFontSize(i);
        const { clamped: fluidFontSize } = calculateFluidFontSize(minFontSize, maxFontSize, state.screenWidth)

        scale.push({ breakpoint: state.minBreakpoint - state.offsetGraph, cssValue: minFontSize, step });
        scale.push({ breakpoint: state.minBreakpoint, cssValue: minFontSize, step });
        scale.push({ breakpoint: state.screenWidth, cssValue: fluidFontSize, step });
        scale.push({ breakpoint: state.maxBreakpoint, cssValue: maxFontSize, step });
        scale.push({ breakpoint: state.maxBreakpoint + state.offsetGraph, cssValue: maxFontSize, step });
        typescales.push(scale);
      }
      return typescales;
    },
    designTokens(state) {
      interface DesignTokensFontScaleConst {
        min: Object,
        max: Object
      }
      interface DesignTokensFontScale {
        min: DesignTokensFontSizes,
        max: DesignTokensFontSizes,
        v: DesignTokensFontSizes,
        r: DesignTokensFontSizes,
        fluid: DesignTokensFontSizes,
      }
      interface DesignTokensFontSizes {
        value: string,
        type: string
      }

      const designTokens = {
        "font-scale": {
          const: {
            "min": {
              "f0": { "value": `${state.minF0}`, "type": "fontSizes" },
              "r": { "value": `${state.minR}`, "type": "fontSizes" },
              "n": { "value": `${state.minN}`, "type": "fontSizes" }
            },
            "max": {
              "f0": { "value": `${state.maxF0}`, "type": "fontSizes" },
              "r": { "value": `${state.maxR}`, "type": "fontSizes" },
              "n": { "value": `${state.maxN}`, "type": "fontSizes" }
            }
          }
        } as {[key: string]:  DesignTokensFontScale | DesignTokensFontScaleConst},
        "font-size": {} as {[key: string]: DesignTokensFontSizes},
        "viewport": {
          "width": { "value": "{viewport.min}", "type": "sizing" },
          "min": { "value": `${state.minBreakpoint}`, "type": "sizing" },
          "max": { "value": `${state.maxBreakpoint}`, "type": "sizing" }
        }
      };

      this.typescales.forEach((scale) => {
        const step = scale[0].step.slice(1);
        const key = scale[0].step;

        designTokens["font-scale"][key] = {
          "min": {
            "value": `5*roundTo(({font-scale.const.min.f0}*{font-scale.const.min.r}^(${step}/{font-scale.const.min.n})/5),1)`,
            "type": "fontSizes"
          },
          "max": {
            "value": `5*roundTo(({font-scale.const.max.f0}*{font-scale.const.max.r}^(${step}/{font-scale.const.max.n})/5),1)`,
            "type": "fontSizes"
          },
          "v": {
            "value": `100 * ({font-scale.${key}.max}-{font-scale.${key}.min}) / ({viewport.max}-{viewport.min})`,
            "type": "fontSizes"
          },
          "r": {
            "value": `( {viewport.min} * {font-scale.${key}.max} - {viewport.max} * {font-scale.${key}.min}) / ({viewport.min}-{viewport.max})`,
            "type": "fontSizes"
          },
          "fluid": {
            "value": `round(({viewport.width}/100) * {font-scale.${key}.v} + {font-scale.${key}.r})`,
            "type": "fontSizes"
          }
        };

        designTokens["font-size"][key] = {
          "value": `min( max( {font-scale.${key}.min},  {font-scale.${key}.fluid}) ,{font-scale.${key}.max})`,
          "type": "fontSizes"
        };
      });
      return designTokens;
    }
  },
})
