"use client";

import { useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Modal = ({ children }) => {
  const router = useRouter();
  const overlay = useRef(null);
  const wrapper = useRef(null);

  const onDismiss = useCallback(() => {
    router.push("/");
  }, [router]);

  const handleClick = useCallback(
    (e) => {
      if ((e.target === overlay.current) & onDismiss) {
        onDismiss();
      }
    },
    [onDismiss, overlay]
  );

  return (
    <div className="modal" ref={overlay} onClick={handleClick}>
      <button
        type="button"
        className="absolute top-4 right-8"
        onClick={onDismiss}
      >
        <Image src="/close.svg" width={17} height={17} alt="close" />
      </button>
      <div className="modal_wrapper" ref={wrapper}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
