export default (): HTMLElement => {
  const [allControls, controls, sizeControls] = [
    document.createElement('div'),
    document.createElement('div'),
    document.createElement('div')

  ];
  controls.classList.add('game__panel__controls');
  const btnSetName = ['start', 'stop', 'save', 'result'];
  btnSetName.forEach((elem, i) => {
    const btn = document.createElement('button');
    btn.classList.add('game__panel__controls-btn');
    btn.append(btnSetName[i]);
    btn.setAttribute('data-btn', btnSetName[i]);
    controls.append(btn);
  });
  allControls.classList.add('game__panel__all-controls-btn');
  allControls.append(controls, sizeControls);
  return allControls;
};

