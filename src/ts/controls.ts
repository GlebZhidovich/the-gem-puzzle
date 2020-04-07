export default (): HTMLElement => {
  const [allControls, controls, sizeControls] = [
    document.createElement('div'),
    document.createElement('div'),
    document.createElement('div')

  ];
  controls.classList.add('game__panel__controls');
  const btnSetName = ['start', 'stop', 'save', 'result'];
  const btnSet = [
    document.createElement('button'),
    document.createElement('button'),
    document.createElement('button'),
    document.createElement('button')
  ];
  btnSet.forEach((elem, i) => {
    elem.classList.add('game__panel__controls-btn');
    elem.append(btnSetName[i]);
    elem.setAttribute('data-btn', btnSetName[i]);
  });
  const [startBtn, stopBtn, saveBtn, resultBtn] = btnSet;
  controls.append(startBtn, stopBtn, saveBtn, resultBtn);

  allControls.append(controls, sizeControls);
  return allControls;
};

