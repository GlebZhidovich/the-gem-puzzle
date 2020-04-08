import createPanel from './panel';
import {activeCells, addCells, addDragListener, createField, randomNumbers} from './field';
import {
  getCellArr, getCurSize,
  getData,
  getTimer, getTop,
  setCellArrNum, setCurSize,
  setData,
  setSteps,
  setTime,
  stopTimer,
  timeCounter
} from './features';

let timeDisplay;
let curField: HTMLElement;
let isResult = false;
let fieldWrap: HTMLElement;
let isGameStart = false;

export function getGameStart(): boolean{
  return isGameStart;
}

const actions = {
  'new game'(): void {
    if (isResult) {
      isResult = !isResult;
      fieldWrap.innerHTML = '';
      fieldWrap.append(curField);
    }
    isGameStart = true;
    setSteps(0);
    setTime(0, 0);
    curField.innerHTML = '';
    const arrNum = randomNumbers(getCurSize());
    addCells(getCurSize(), curField, arrNum);
    timeCounter((timeDisplay as HTMLElement));
    activeCells(getCellArr(), true);
  },
  'start/stop'(): void {
    if (getTimer()) {
      isGameStart = false;
      activeCells(getCellArr(), false);
      stopTimer();
    } else {
      if (isResult) {
        isResult = !isResult;
        fieldWrap.innerHTML = '';
        fieldWrap.append(curField);
      }
      isGameStart = true;
      activeCells(getCellArr(), true);
      timeCounter((timeDisplay as HTMLElement));
    }
  },
  save(): void {
      this['start/stop']();
      setCellArrNum(getCellArr());
      localStorage.setItem('data', JSON.stringify(getData()));
      alert('You save game');
  },
  result(): void {
    if (!isResult) {
      isResult = !isResult;
      stopTimer();
      fieldWrap = document.querySelector('.game__field-wrap');
      fieldWrap.innerHTML = '';
      const top10 = getTop();
      const topElem = document.createElement('div');
      topElem.classList.add('game__result__list');
      const title = document.createElement('span');
      title.append('Top 10');
      title.classList.add('game__result__title');
      topElem.append(title);
      top10.forEach((elem, i) => {
        const item = document.createElement('div');
        const [num, res] = [
          document.createElement('span'),
          document.createElement('span')
        ];
        num.append(`№ ${i + 1} - `);
        res.append(elem + '');
        item.append(num, res);
        topElem.append(item);
      });
      fieldWrap.append(topElem);
    }
  },
  size(s): void {
    setCurSize(s);
    this['new game']();
  }
};

function ready(): void {
  if (localStorage.getItem('data')) {
    const data = JSON.parse(localStorage.getItem('data'));
    setData(data);
  }

  const body = document.body;
  const game = document.createElement('section');
  game.classList.add('game');
  body.append(game);
  const [panel, field, fieldContainer] = [
    createPanel(),
    createField(),
    document.createElement('div')
  ];
  const arrNum = randomNumbers(getCurSize());
  addCells(getCurSize(),field, arrNum);
  fieldContainer.classList.add('game__field-wrap');
  curField = field;
  addDragListener(field);
  fieldContainer.append(field);
  game.append(panel, fieldContainer);

  function actionsHandler(e): void {
    if (e.target.dataset['btn']) {
      const action = e.target.dataset['btn'];
      if (actions[action]) {
        actions[action]();
      }
    }
    if (e.target.dataset['size']) {
      const cellSize = e.target.dataset['size'];
      actions['size'](cellSize);
    }
  }

  const panelControls = document.querySelector('.game__panel__all-controls-btn');
  panelControls.addEventListener('click', actionsHandler);
  timeDisplay = document.querySelector('.game__panel__time-num');
}

document.addEventListener('DOMContentLoaded', ready);
