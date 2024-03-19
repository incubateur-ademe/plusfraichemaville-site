export const generateRandomId = () => Math.floor(Math.random() * 900000000) + 100000000;

/**
 *
 * @param element Classname or id of the targeted element: .customModal, #card, div ...
 */
export const scrollToTop = (element?: string) => {
  const target = element && document.querySelector(element);
  return element ? target && (target.scrollTop = 0) : window.scrollTo({ top: 0 });
};
