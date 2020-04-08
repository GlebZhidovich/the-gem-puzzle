interface Data {
  sec: number;
  min: number;
  timer: null | any;
  steps: number;
  top10: number[];
  cellArr: HTMLElement[];
  cellArrNum: string[];
}

let data: Data = {
  sec: 0,
  min: 0,
  timer: null,
  steps: 0,
  top10: [8, 10, 15, 50, 70],
  cellArr: null,
  cellArrNum: null
};

export function getTimer(): null | any {
  return data.timer;
}

export function getData(): Data {
  return data;
}

export function setData(obj: Data): void {
  data = obj;
}

export function getCellArr(): HTMLElement[] {
  return data.cellArr;
}

export function addCellArr(elem: HTMLElement): void {
  data.cellArr.push(elem);
}

export function setCellArr(arr: HTMLElement[]): void {
  data.cellArr = arr;
}

export function getCellArrNum(): string[] {
  return data.cellArrNum;
}

export function setCellArrNum(elem: HTMLElement[] | null): void {
  if (elem === null) {
    data.cellArrNum = null;
    return;
  }
  data.cellArrNum = elem.map(elem => elem.textContent);
}

export function getTop(): number[] {
  return data.top10;
}

export function setTop(arr: number[]): void {
  data.top10 = arr;
}

export function getTime(): string {
    return `${data.min < 10 ? '0' + data.min : data.min}:${data.sec < 10 ?  '0' + data.sec : data.sec}`;
}

export function setTime(s: number, m: number): void {
    data.sec = s; data.min = m;
}

export function getSteps(): number {
    return data.steps;
}

export function stopTimer(): void {
  clearInterval(data.timer);
  data.timer = null;
}

export function timeCounter(elem: HTMLElement): void {
  if (data.timer) {
    stopTimer();
  }
  data.timer = setInterval(() => {
      if (data.sec === 60) {
        data.sec = 0;
        data.min += 1;
      }
      data.sec += 1;
      elem.innerHTML = `${data.min < 10 ? '0' + data.min : data.min}:${data.sec < 10 ?  '0' + data.sec : data.sec}`;
    }, 1000);
}

function displaySteps(num: number): void {
  const stepsField = document.querySelector('.game__panel__steps-num');
  stepsField.textContent = num + '';
}

export function addSteps(num: number): void {
  data.steps += num;
  displaySteps(data.steps);
}

export function setSteps(num: number): void {
  data.steps = num;
  displaySteps(data.steps);
}

