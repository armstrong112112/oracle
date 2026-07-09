<template>
  <div class="wheel">
    <div class="modal__container">
      <div class="modal-header__container">
        <h2>The wheel of fortune</h2>
        <button @click="closeModal">
          <img src="/svg/shop/icons/close.svg" alt="close" />
        </button>
      </div>
      <div class="wheel-of-fortune">
        <div class="fortune__header">
          <h6>A series of logins</h6>
          <div class="days">
            <button class="lost">
              <img src="/svg/shop/icons/checked.svg" alt="checked" />
              Day 1
            </button>
            <button class="present">
              <img src="/svg/shop/icons/checked.svg" alt="checked" />
              Day 2
            </button>
            <button>
              <img src="/svg/shop/icons/checked.svg" alt="checked" />
              Day 3
            </button>
          </div>
          <div class="wheel-content">
            <div class="fortune">
              <svg
                width="373"
                height="372"
                viewBox="0 0 373 372"
                ref="svgRef"
                v-html="wheelContent"
                class="wheel-svg"></svg>

              <div class="fortune-item">Position 1</div>
              <div class="fortune-item">Position 2</div>
              <div class="fortune-item">Position 3</div>
              <div class="fortune-item">Position 4</div>
              <div class="fortune-item">Position 5</div>
              <div class="fortune-item">Position 6</div>
              <div class="fortune-arrow" ref="arrow">
                <img src="/svg/shop/images/fortune-arrow.svg" alt="fortune" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal__action">
        <button @click="spinArrow" v-if="route.query.store === 'fortune'">
          Twist
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import gsap from "gsap";
import { nextTick, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const emit = defineEmits<{
  close: [];
}>();

const wheelContent = ref("");
const isSpinning = ref(false);
const currentRotation = ref(0);
const arrow = ref<SVGAElement>();
const svgRef = ref<SVGSVGElement>();

async function svgMount(): Promise<void> {
  try {
    // const response = await fetch('/images/shop/wheel-light.svg')
    const response = await fetch("/images/shop/wheel.svg");
    wheelContent.value = await response.text();
  } catch (error) {
    console.error("Failed to load SVG:", error);
  }
}

function getIds(): void {
  try {
    const svgElement = document.querySelector(".wheel-svg");
    if (svgElement) {
      for (let i = 1; i <= 12; i++) {
        // const numericGroups = svgRef.value?.querySelector(
        //   `g[id="bulb-${i}"]`
        // ) as SVGElement
        // console.log('Numeric groups:', numericGroups)
      }
    }
  } catch (error) {
    console.error("Failed to get IDs:", error);
  }
}

function spinArrow(): void {
  if (isSpinning.value) return;

  isSpinning.value = true;

  // Случайный угол от 3 до 6 оборотов
  const extraSpins = 3 + Math.floor(Math.random() * 10);
  const angle = extraSpins * 360;
  const duration = 5; // секунды

  const finalRotation = currentRotation.value + angle;

  gsap.to(arrow.value as SVGElement, {
    rotation: `+=${angle}`, // всегда прибавляется к текущему
    duration,
    ease: "power3.out", // плавное замедление
    onComplete: () => {
      isSpinning.value = false;
      currentRotation.value = finalRotation % 360; // сохраняем остаточный угол
    },
  });
}

function pickNonAdjacent(
  segments: SVGGraphicsElement[],
  count: number
): SVGGraphicsElement[] {
  const available = [...segments]; // копия
  const chosen: SVGGraphicsElement[] = [];

  while (chosen.length < count && available.length > 0) {
    // берём случайный элемент
    const i = Math.floor(Math.random() * available.length);
    const el = available[i];
    chosen.push(el);

    // узнаём номер лампочки из id (например "bulb-5" -> 5)
    const idx = parseInt(el.id.replace("bulb-", ""), 10);

    // удаляем сам элемент и соседей (idx-1 и idx+1) из available
    for (let j = available.length - 1; j >= 0; j--) {
      const testIdx = parseInt(available[j].id.replace("bulb-", ""), 10);
      if (Math.abs(testIdx - idx) <= 1) {
        available.splice(j, 1);
      }
    }
  }

  return chosen;
}

function highlightRandomSegments(): void {
  const svg = svgRef.value;
  if (!svg) return;

  const segments: SVGGraphicsElement[] = [];
  for (let i = 1; i <= 12; i++) {
    const el = svg.querySelector(`#bulb-${i}`) as SVGGraphicsElement;
    if (el) segments.push(el);
  }

  const lights: SVGGraphicsElement[] = [];
  for (let i = 1; i <= 6; i++) {
    const el = svg.querySelector(`#light-${i}`) as SVGGraphicsElement;
    if (!el) continue;

    if (el.id === "light-2") {
      // удаляем из DOM
      el.parentNode?.removeChild(el);
      continue; // пропускаем push
    }

    // остальные пушим в массив
    lights.push(el);
  }

  const shuffled = segments.sort(() => 0.5 - Math.random());
  const chosen = pickNonAdjacent(segments, 6);
  // const chosen = pickChess(segments, 6)

  lights.forEach((light, i) => {
    const bulb = chosen[i];
    if (bulb && bulb.parentNode) {
      const bulbBox = bulb.getBBox();
      const bulbCx = bulbBox.x + bulbBox.width / 2;
      const bulbCy = bulbBox.y + bulbBox.height / 2;

      const lightBox = light.getBBox();
      const lightCx = lightBox.x + lightBox.width / 2;
      const lightCy = lightBox.y + lightBox.height / 2;

      const dx = bulbCx - lightCx;
      const dy = bulbCy - lightCy;

      light.setAttribute("transform", `translate(${dx}, ${dy})`);

      // чтобы было поверх
      bulb.parentNode.insertBefore(light, bulb.nextSibling);
    }
  });
}

function closeModal(): void {
  emit("close");
}

onMounted(async () => {
  await svgMount();
  nextTick(() => {
    getIds();

    setInterval(() => {
      highlightRandomSegments();
    }, 500);
  });
});
</script>
<style lang="scss" scoped>
.wheel {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 10000;
  background-color: rgba($color: #000000, $alpha: 0.8);
  user-select: none;

  .modal__container {
    width: 500px;
    padding: 20px 24px;
    border-radius: 30px;
    background-color: #14131b;

    .modal-header__container {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h2 {
        color: #fff;
        font: 500 20px Roboto, sans-serif;
      }
    }

    .wheel-of-fortune {
      margin-top: 16px;

      .fortune__header {
        h6 {
          color: #fff;
          font: 500 16px Roboto, sans-serif;
        }

        .days {
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 8px;

          button {
            padding: 10px 12px;
            display: flex;
            align-items: center;
            gap: 4px;
            background: #14131b;
            border-radius: 12px;
            border: 1px solid rgba($color: #e6e6e6, $alpha: 0.24);
            color: #fff;
            font: 400 14px Roboto, sans-serif;

            img {
              display: none;
            }

            &.lost {
              img {
                display: block;
              }
            }

            &.present {
              border: 1px solid #f64e2a;
            }
          }
        }

        .wheel-content {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 32px;

          .fortune {
            width: 375px;
            height: 369.71px;
            position: relative;

            .fortune-arrow {
              position: absolute;
              top: 144.66px;
              left: 144.69px;
              cursor: pointer;
              user-select: none;
            }

            .fortune-item {
              color: #000;
              font: 600 12px Inter, sans-serif;
              text-transform: uppercase;
              position: absolute;

              &:nth-of-type(1) {
                transform: rotate(-90deg);
                top: 80px;
                left: 155px;
              }

              &:nth-of-type(2) {
                transform: rotate(-30deg);
                top: 125px;
                left: 240px;
              }

              &:nth-of-type(3) {
                transform: rotate(35deg);
                top: 230px;
                left: 240px;
              }

              &:nth-of-type(4) {
                transform: rotate(90deg);
                top: 280px;
                left: 150px;
              }

              &:nth-of-type(5) {
                transform: rotate(150deg);
                top: 225px;
                left: 70px;
              }

              &:nth-of-type(6) {
                transform: rotate(210deg);
                top: 130px;
                left: 65px;
              }
            }
          }
        }
      }
    }

    .result-of-twist {
      margin-top: 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;

      h4 {
        color: #fff;
        font: 600 18px Roboto, sans-serif;
      }

      .result__container {
        width: 100%;
        margin-top: 12px;
        background-color: #2c2a3d;
        border-radius: 8px;
        padding: 15px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        h6 {
          color: #fff;
          font: 500 14px Roboto, sans-serif;
        }
      }
    }

    .modal__action {
      margin-top: 32px;

      button {
        width: 100%;
        padding: 16.5px 0;
        background-color: #f64e2a;
        border-radius: 14px;
        color: #fff;
        font: 500 16px Roboto, sans-serif;
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .wheel {
    align-items: flex-end;

    .modal__container {
      width: 100%;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
}
</style>
