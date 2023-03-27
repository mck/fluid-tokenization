import "primevue/inputtext/InputText.d.ts"
declare module "primevue/inputtext/InputText.d.ts" {
    import {Nullable} from 'primevue/ts-helpers'

    export interface InputTextProps {
        modelValue?: Nullable<string | number>
    }
}
