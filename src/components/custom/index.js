// custom/index.js
import CustomPalette from './CustomPalette'
import CustomRenderer from './CustomRenderer'
import CustomContextPad from './CustomContextPad'

export default {
    __init__: ['customPalette','CustomRenderer','CustomContextPad'],
    customPalette: ['type', CustomPalette],
    CustomRenderer: ['type', CustomRenderer],
    CustomContextPad: ['type', CustomContextPad],
}