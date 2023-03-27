<script setup lang="ts">
  import {computed} from 'vue'
  import {generateTypescaleSteps} from '../../lib/generateTypescaleSteps'
  import {StepSettings, useTypescalesStore} from '../../stores/typescales'

  const typescaleStore = useTypescalesStore()
  const exampleTypescales = computed<StepSettings[][]>(() => generateTypescaleSteps(2, 6))
  const exampleTypescaleVariables = computed(() => exampleTypescales.value.reduce<Record<string, string>>((output, scale) => {
    const step = scale[0].step
    const size = scale[2].cssValue
    output[`--typescale-${step}`] = size.toFixed(2) + 'px'
    return output
  }, {}))
  const exampleContainerStyles = computed(() => ({
    ...exampleTypescaleVariables.value,
    width: typescaleStore.screenWidth.toFixed(2) + 'px'
  }))
</script>

<template>
  <div class="container" :style="exampleContainerStyles">
    <h1 class="mt-0">Welcome to the Fun Typographic Hierarchy!</h1>
    <h2>Explore Different Levels of Fun</h2>
    <h3>Level 1: The Magic of Colors</h3>
    <p>Let's embark on a journey through the captivating world of colors, where every hue has its own story to tell and mood to express. From vibrant reds to calming blues, colors have the power to evoke emotions and transform any design.</p>
    <h4>Level 2: The Rhythm of Shapes</h4>
    <div class="grid">
      <div class="col-8">
        <p>Dive into the rhythm of shapes, where circles, squares, and triangles dance together in perfect harmony. Explore how the combination of different shapes can create visually stunning patterns and designs that captivate the eye.</p>
        <h5>Level 3: The Whimsy of Typography</h5>
        <p>Discover the whimsical world of typography, where letters come to life as expressive characters. Learn how the right font and style can convey the essence of your message, creating an unforgettable impact on your audience.</p>
        <h6>Level 4: The Joy of Patterns</h6>
        <p>Unleash your creativity in the delightful realm of patterns, where the repetition of elements forms enchanting visual landscapes. Experiment with various combinations of colors, shapes, and textures to create your own unique and mesmerizing patterns.</p>

      </div>
      <div class="col-4">
        <figure>
          <img src="//images.unsplash.com/photo-1603204254626-d0de8eb24cf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2942&q=80" alt="A vibrant color palette" class="w-full">
          <figcaption class="f-2">
            Photo by <a href="https://unsplash.com/@brunus?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Bruno Martins</a> on <a href="https://unsplash.com/photos/4cwf-iW6I1Q?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
          </figcaption>
        </figure>
      </div>
    </div>

    <div class="grid">
      <div class="col">
        <h4>Card 1: Colorful Adventures</h4>
        <p>Join us as we explore the fascinating world of colors and how they can transform your designs.</p>
      </div>
      <div class="col">
        <h4>Card 2: Shape Shifting</h4>
        <p>Discover the endless possibilities of shapes and how they can create captivating patterns.</p>
      </div>
      <div class="col">
        <h4>Card 3: Typographic Tales</h4>
        <p>Uncover the secrets of typography and how the right font can make all the difference.</p>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>
.container {
  margin: 3rem auto;
  padding: 1.5rem;
  max-width: 100%;
  font-size: var(--typescale-f0);
  box-shadow: hsl(266, 100%, 64%) 0 0 2rem;
}

@for $i from 1 through 6 {
  h#{$i} {
    font-size: var(--typescale-f#{7-$i})
  }
}

figcaption {
  font-size: var(--typescale-f-2)
}
</style>
