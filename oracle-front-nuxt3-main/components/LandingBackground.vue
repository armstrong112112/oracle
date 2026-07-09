<template>
  <div class="landing-animated-background">
    <div class="glow-circle glow-circle-1"></div>
    <div class="glow-circle glow-circle-2"></div>
    <div class="glow-circle glow-circle-3"></div>
    <div class="glow-circle glow-circle-4"></div>
    <div class="glow-circle glow-circle-5"></div>
    <div class="glow-circle glow-circle-6"></div>

    <div class="overlay-dark"></div>
  </div>
</template>

<style scoped>
.landing-animated-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

.glow-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
}

.glow-circle-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    #c41e1e 0%,
    rgba(196, 30, 30, 0.8) 30%,
    rgba(196, 30, 30, 0.4) 70%,
    transparent 100%
  );
  top: -10%;
  left: -10%;
  animation: chaos1 18s infinite ease-in-out;
}

.glow-circle-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(
    circle,
    #7c3aed 0%,
    rgba(124, 58, 237, 0.7) 30%,
    rgba(124, 58, 237, 0.4) 70%,
    transparent 100%
  );
  top: 50%;
  right: -15%;
  animation: chaos2 22s infinite ease-in-out;
}

.glow-circle-3 {
  width: 350px;
  height: 350px;
  background: radial-gradient(
    circle,
    #d97706 0%,
    rgba(217, 119, 6, 0.8) 30%,
    rgba(217, 119, 6, 0.4) 70%,
    transparent 100%
  );
  bottom: -5%;
  left: -5%;
  animation: chaos3 16s infinite ease-in-out;
}

.glow-circle-4 {
  width: 450px;
  height: 450px;
  background: radial-gradient(
    circle,
    #db2777 0%,
    rgba(219, 39, 119, 0.7) 30%,
    rgba(219, 39, 119, 0.4) 70%,
    transparent 100%
  );
  top: 20%;
  left: 60%;
  animation: chaos4 20s infinite ease-in-out;
}

.glow-circle-5 {
  width: 300px;
  height: 300px;
  background: radial-gradient(
    circle,
    #0891b2 0%,
    rgba(8, 145, 178, 0.8) 30%,
    rgba(8, 145, 178, 0.4) 70%,
    transparent 100%
  );
  bottom: 30%;
  right: 10%;
  animation: chaos5 14s infinite ease-in-out;
}

.glow-circle-6 {
  width: 380px;
  height: 380px;
  background: radial-gradient(
    circle,
    #059669 0%,
    rgba(5, 150, 105, 0.7) 30%,
    rgba(5, 150, 105, 0.4) 70%,
    transparent 100%
  );
  top: 70%;
  left: 30%;
  animation: chaos6 24s infinite ease-in-out;
}

.overlay-dark {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  z-index: 2;
}

@keyframes chaos1 {
  0% {
    transform: translateY(0px) translateX(0px) scale(1);
    opacity: 0.7;
  }
  15% {
    transform: translateY(-60px) translateX(40px) scale(1.3);
    opacity: 0.9;
  }
  30% {
    transform: translateY(20px) translateX(-30px) scale(0.8);
    opacity: 0.5;
  }
  45% {
    transform: translateY(-40px) translateX(60px) scale(1.1);
    opacity: 0.8;
  }
  60% {
    transform: translateY(30px) translateX(-20px) scale(1.4);
    opacity: 0.6;
  }
  75% {
    transform: translateY(-50px) translateX(10px) scale(0.9);
    opacity: 0.7;
  }
  90% {
    transform: translateY(40px) translateX(-40px) scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: translateY(0px) translateX(0px) scale(1);
    opacity: 0.7;
  }
}

@keyframes chaos2 {
  0% {
    transform: translateY(0px) translateX(0px) scale(1);
    opacity: 0.8;
  }
  18% {
    transform: translateY(50px) translateX(-60px) scale(0.7);
    opacity: 0.5;
  }
  35% {
    transform: translateY(-30px) translateX(40px) scale(1.5);
    opacity: 0.9;
  }
  52% {
    transform: translateY(60px) translateX(-10px) scale(1.1);
    opacity: 0.7;
  }
  68% {
    transform: translateY(-40px) translateX(-50px) scale(0.8);
    opacity: 0.8;
  }
  82% {
    transform: translateY(20px) translateX(30px) scale(1.3);
    opacity: 0.6;
  }
  100% {
    transform: translateY(0px) translateX(0px) scale(1);
    opacity: 0.8;
  }
}

@keyframes chaos3 {
  0% {
    transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
    opacity: 0.8;
  }
  20% {
    transform: translateY(-70px) translateX(30px) scale(1.2) rotate(45deg);
    opacity: 0.5;
  }
  40% {
    transform: translateY(40px) translateX(-50px) scale(0.6) rotate(90deg);
    opacity: 0.9;
  }
  60% {
    transform: translateY(-20px) translateX(70px) scale(1.4) rotate(180deg);
    opacity: 0.6;
  }
  80% {
    transform: translateY(50px) translateX(-30px) scale(0.9) rotate(270deg);
    opacity: 0.7;
  }
  100% {
    transform: translateY(0px) translateX(0px) scale(1) rotate(360deg);
    opacity: 0.8;
  }
}

@keyframes chaos4 {
  0% {
    transform: translateY(0px) translateX(0px) scale(1);
    opacity: 0.6;
  }
  12% {
    transform: translateY(35px) translateX(50px) scale(1.6);
    opacity: 0.8;
  }
  28% {
    transform: translateY(-80px) translateX(-25px) scale(0.7);
    opacity: 0.7;
  }
  44% {
    transform: translateY(60px) translateX(35px) scale(1.2);
    opacity: 0.4;
  }
  60% {
    transform: translateY(-45px) translateX(-60px) scale(0.9);
    opacity: 0.9;
  }
  76% {
    transform: translateY(25px) translateX(45px) scale(1.3);
    opacity: 0.5;
  }
  92% {
    transform: translateY(-35px) translateX(-15px) scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: translateY(0px) translateX(0px) scale(1);
    opacity: 0.6;
  }
}

@keyframes chaos5 {
  0% {
    transform: translateY(0px) translateX(0px) scale(1);
    opacity: 0.9;
  }
  25% {
    transform: translateY(-55px) translateX(-70px) scale(0.5);
    opacity: 0.4;
  }
  50% {
    transform: translateY(70px) translateX(20px) scale(1.7);
    opacity: 0.8;
  }
  75% {
    transform: translateY(-30px) translateX(55px) scale(0.8);
    opacity: 0.7;
  }
  100% {
    transform: translateY(0px) translateX(0px) scale(1);
    opacity: 0.9;
  }
}

@keyframes chaos6 {
  0% {
    transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
    opacity: 0.7;
  }
  16% {
    transform: translateY(45px) translateX(-40px) scale(1.4) rotate(60deg);
    opacity: 0.8;
  }
  32% {
    transform: translateY(-65px) translateX(60px) scale(0.6) rotate(120deg);
    opacity: 0.5;
  }
  48% {
    transform: translateY(30px) translateX(-35px) scale(1.2) rotate(180deg);
    opacity: 0.9;
  }
  64% {
    transform: translateY(-50px) translateX(25px) scale(0.8) rotate(240deg);
    opacity: 0.6;
  }
  80% {
    transform: translateY(65px) translateX(-55px) scale(1.5) rotate(300deg);
    opacity: 0.7;
  }
  100% {
    transform: translateY(0px) translateX(0px) scale(1) rotate(360deg);
    opacity: 0.7;
  }
}
</style>
