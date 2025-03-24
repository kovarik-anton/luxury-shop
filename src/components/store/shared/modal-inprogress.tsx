// import { useOutsideClick } from "@/hooks/useOutsideClick";
// import {
//   cloneElement,
//   createContext,
//   ReactNode,
//   useContext,
//   useState,
// } from "react";
// import { createPortal } from "react-dom";

// const ModalContext = createContext({
//     openName: "",
// });

// interface ModalProps {
//   children: ReactNode;
// }

// function Modal({ children }: ModalProps) {
//   const [openName, setOpenName] = useState("");

//   const close = () => setOpenName("");
//   const open = setOpenName;

//   return (
//     <ModalContext.Provider value={{ openName, close, open }}>
//       {children}
//     </ModalContext.Provider>
//   );
// }

// interface OpenProps {
//   children?: ReactNode;
//   opens: string;
// }

// function Open({ children, opens: opensWindowName }: OpenProps) {
//   const { open } = useContext(ModalContext);

//   return cloneElement(children, { onClick: () => open(opensWindowName) });
// }

// interface WindowProps {
//   children: ReactNode;
//   name: string;
// }

// function Window({ children, name }: WindowProps) {
//   const { openName, close } = useContext(ModalContext);
//   const ref = useOutsideClick(close);

//   if (name !== openName) return null;

//   return createPortal(
//         <div>{cloneElement(children, { onCloseModal: close })}</div>
//     document.body
//   );
// }

// Modal.Open = Open;
// Modal.Window = Window;

// export default Modal;
