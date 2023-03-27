const { registerTransforms } = require('@tokens-studio/sd-transforms');
const StyleDictionary = require('style-dictionary');

registerTransforms(StyleDictionary);

const sd = StyleDictionary.extend({
    source: ['./tokens/clamped.json'],
    platforms: {
        css: {
            transforms: [
                'ts/descriptionToComment',
                'ts/resolveMath',
                'ts/size/px',
                'ts/size/letterspacing',
                'ts/size/lineheight',
                'ts/type/fontWeight',
                'ts/color/hexrgba',
                'ts/color/modifiers',
                'ts/typography/css/shorthand',
                'ts/shadow/shorthand',
                'attribute/cti',
                'name/cti/kebab',
            ],
            buildPath: 'build/css/',
            files: [
                {
                    destination: 'variables.css',
                    format: 'css/variables',
                },
            ],
        },
    },
});

sd.cleanAllPlatforms();
sd.buildAllPlatforms();