import createPanel from './panel';
import {activeCells, addCells, addDragListener, createField, randomNumbers} from './field';
import {
  getCellArr,
  getData,
  getTimer, getTop,
  setCellArrNum,
  setData,
  setSteps,
  setTime,
  stopTimer,
  timeCounter
} from './features';

let timeDisplay;
let curSize: number;
let curField: HTMLElement;
let isResult = false;
let fieldWrap: HTMLElement;

const actions = {
  'new game'(): void {
    setSteps(0);
    setTime(0, 0);
    curField.innerHTML = '';
    console.log(curField);
    const arrNum = randomNumbers(curSize);
    addCells(curSize, curField, arrNum);
    timeCounter((timeDisplay as HTMLElement));
    activeCells(getCellArr(), true);
    if (isResult) {
      isResult = !isResult;
      fieldWrap.append(curField);
    }
  },
  'start/stop'(): void {
    if (getTimer()) {
      activeCells(getCellArr(), false);
      stopTimer();
    } else {
      activeCells(getCellArr(), true);
      timeCounter((timeDisplay as HTMLElement));
      if (isResult) {
        isResult = !isResult;
        fieldWrap.append(curField);
      }
    }
  },
  save() {
      this['start/stop']();
      setCellArrNum(getCellArr());
      localStorage.setItem('data', JSON.stringify(getData()));
      alert('You save game');
  },
  result(): void {
    if (!isResult) {
      isResult = !isResult;
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
    curSize = s;
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
  curSize = 4;
  const [panel, field, fieldContainer] = [
    createPanel(),
    createField(),
    document.createElement('div')
  ];
  const arrNum = randomNumbers(curSize);
  addCells(curSize,field, arrNum);
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
