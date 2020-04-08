export default (): HTMLElement => {
  const [allControls, controls, sizeControls] = [
    document.createElement('div'),
    document.createElement('div'),
    document.createElement('div')

  ];
  controls.classList.add('game__panel__controls');
  const btnSetName = ['start', 'stop', 'save', 'result'];

  btnSetName.forEach(elem => {
    const btn = document.createElement('button');
    btn.classList.add('game__panel__controls-btn');
    btn.append(elem);
    btn.setAttribute('data-btn', elem);
    controls.append(btn);
  });

  const btnSetSize = ['3x3', '4x4', '5x5', '6x6', '7x7', '8x8'];
  btnSetSize.forEach(elem => {
    const btn = document.createElement('button');
    btn.classList.add('game__panel__controls-btn');
    btn.append(elem);
    btn.setAttribute('data-size', elem[0]);
    sizeControls.append(btn);
  });
  sizeControls.classList.add('game__panel__controls-size');
  allControls.classList.add('game__panel__all-controls-btn');
  allControls.append(controls, sizeControls);
  return allControls;
};

