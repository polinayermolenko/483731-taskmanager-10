export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const parent = document.createElement(`div`);
  parent.innerHTML = template;

  return parent.firstChild;
};

export const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;

    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isElementExists = !!(parentElement && newElement && oldElement);

  if (isElementExists) {
    parentElement.replaceChild(newElement, oldElement);
  }
};
