type SnowFlake = {
  x: number;
  y: number;
  opacity: number;
  speedX: number;
  speedY: number;
  radius: number;
};

export const snowStorm = (): void => {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "-1";
  canvas.id = "snow";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  const particlesOnScreen = 100;
  const particlesArray: SnowFlake[] = [];
  let w: number, h: number;
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;

  function random(min: number, max: number) {
    return min + Math.random() * (max - min + 1);
  }

  function clientResize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", clientResize);

  function createSnowFlakes() {
    for (let i = 0; i < particlesOnScreen; i++) {
      particlesArray.push({
        x: Math.random() * w,
        y: Math.random() * h,
        opacity: Math.random(),
        speedX: random(-11, 11),
        speedY: random(7, 15),
        radius: random(0.5, 4.2),
      });
    }
  }

  function drawSnowFlakes() {
    for (let i = 0; i < particlesArray.length; i++) {
      const gradient = ctx.createRadialGradient(
        particlesArray[i].x,
        particlesArray[i].y,
        0,
        particlesArray[i].x,
        particlesArray[i].y,
        particlesArray[i].radius,
      );

      gradient.addColorStop(
        0,
        "rgba(255, 255, 255," + particlesArray[i].opacity + ")",
      ); // white
      gradient.addColorStop(
        0.8,
        "rgba(210, 236, 242," + particlesArray[i].opacity + ")",
      ); // bluish
      gradient.addColorStop(
        1,
        "rgba(237, 247, 249," + particlesArray[i].opacity + ")",
      ); // lighter bluish

      ctx.beginPath();
      ctx.arc(
        particlesArray[i].x,
        particlesArray[i].y,
        particlesArray[i].radius,
        0,
        Math.PI * 2,
        false,
      );

      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }

  function moveSnowFlakes() {
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].x += particlesArray[i].speedX;
      particlesArray[i].y += particlesArray[i].speedY;

      if (particlesArray[i].y > h) {
        particlesArray[i].x = Math.random() * w * 1.5;
        particlesArray[i].y = -50;
      }
    }
  }

  function updateSnowFall() {
    ctx.clearRect(0, 0, w, h);
    drawSnowFlakes();
    moveSnowFlakes();
  }

  setInterval(updateSnowFall, 50);
  createSnowFlakes();
};

export const isInFestiveSeason = (givenDate: Date): boolean => {
  const dateCopy = new Date(givenDate.getTime());
  const givenYear = dateCopy.getFullYear();
  const beginningFestiveSeason = new Date(givenYear, 11, 19);
  const endFestiveSeason = new Date(givenYear + 1, 0, 6);

  givenDate.setDate(dateCopy.getDate() + 1);
  return dateCopy >= beginningFestiveSeason && dateCopy < endFestiveSeason;
};
