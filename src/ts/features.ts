let sec = 0;
let min = 0;
let timer = null;
let steps = 0;

export function getTime(): string {
    return `${min < 10 ? '0' + min : min}:${sec < 10 ?  '0' + sec : sec}`;
}

export function setTime(s: number, m: number): void {
    sec = s; min = m;
}

export function getSteps(): number {
    return steps;
}

export function stopTimer(): void {
  clearInterval(timer);
  timer = null;
}

export function timeCounter(elem: HTMLElement): void {
  if (timer) {
    stopTimer();
  }
  timer = setInterval(() => {
      if (sec === 60) {
        sec = 0;
        min += 1;
      }
      sec += 1;
      elem.innerHTML = `${min < 10 ? '0' + min : min}:${sec < 10 ?  '0' + sec : sec}`;
    }, 1000);
}

function displaySteps(num: number): void {
  const stepsField = document.querySelector('.game__panel__steps-num');
  stepsField.textContent = num + '';
}

export function addSteps(num: number): void {
  steps += num;
  displaySteps(steps);
}

export function setSteps(num: number): void {
  steps = num;
  displaySteps(steps);
}

