export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

// render function
export const render = (container, component) => {
  container.append(component.getElement());
};

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.parentElement;
  const newElement = newComponent;
  const oldElement = oldComponent;

  const isExistElement = !!(parentElement && newElement && oldElement);
  if (isExistElement && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export const appendChild = (parent, component) => {
  parent.appendChild(component.getElement());
};

export const removeChild = (parent, component) => {
  parent.removeChild(component.getElement());
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
