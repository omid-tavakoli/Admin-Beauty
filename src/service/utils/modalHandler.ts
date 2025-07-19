export const openModalHandler = (modalId: string ) => {
  //@ts-ignore
  document.getElementById(modalId)?.showModal();
};

export const closeModalHandler = (modalId: string ) => {
  //@ts-ignore
  document.getElementById(modalId)?.close();
};
