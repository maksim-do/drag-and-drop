export default () => {
  const birthPlace = document.querySelector('.block__create');
  const hopePlace = document.querySelector('.block__hoop');
  const orderPlace = document.querySelector('.block__order');
  // инициализируем переменную, для хранения перемещаемого элемента
  let stroller = null;

  const getRandomColor = () => {
    const r = Math.round(255.0 * Math.random()).toString(16);
    const g = Math.round(255.0 * Math.random()).toString(16);
    const b = Math.round(255.0 * Math.random()).toString(16);
    return `#${r}${g}${b}`;
  };

  const moveAt = (e) => {
    stroller.style.left = `${e.pageX - 50}px`;
    stroller.style.top = `${e.pageY - 50}px`;
  };

  const movePointer = (e) => {
    e.preventDefault();
    moveAt(e);
  };

  // Создаем div и привязываем его перемещение к координатам указателя
  birthPlace.addEventListener('pointerdown', (e) => {
    /* в некоторых мобильных браузерах все события PointerEvent намертво цепляются к
        элементу где произошёл touchstart, поэтому отцепляем их от текущего элемента */
    e.target.releasePointerCapture(e.pointerId);
    stroller = document.createElement('div');
    stroller.style.backgroundColor = getRandomColor();
    stroller.classList.add('block__stroller');
    moveAt(e);
    document.body.append(stroller);
    /* в идеале нужно просто привязать событие перемещения к stroller,
       но необходима реация других элементов */
    document.addEventListener('pointermove', movePointer);
  });

  // обрабатываем pointerup  на разных уровнях документа
  hopePlace.addEventListener('pointerup', (e) => {
    if (stroller === null) return;
    e.target.append(stroller);
    stroller.style.left = `${e.offsetX - 50}px`;
    stroller.style.top = `${e.offsetY - 50}px`;
    stroller = null;
  });

  orderPlace.addEventListener('pointerup', (e) => {
    if (stroller === null) return;
    if (e.target === orderPlace) {
      e.target.append(stroller);
    } else {
      e.target.before(stroller);
    }
    stroller.classList.remove('block__stroller');
    stroller.classList.add('block__homebody');
    stroller = null;
  });

  document.addEventListener('pointerup', () => {
    if (stroller !== null) {
      stroller.remove();
      stroller = null;
    }
    document.removeEventListener('pointermove', movePointer);
  });
};
