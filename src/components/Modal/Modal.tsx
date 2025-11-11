import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { Rnd } from "react-rnd";
import {
  modalOverlay,
  modalContent,
  modalHeader,
  modalTitle,
  modalSubTitle,
  closeButton,
  modalBody,
  modalHeaderButton,
  modalHeaderButtons,
} from "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  width?: number;
  height?: number;
}

interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

const getInitialPosition = (width: number = 480, height: number = 400): Position => ({
  x: typeof window !== "undefined" ? window.innerWidth / 2 - width / 2 : 0,
  y: typeof window !== "undefined" ? window.innerHeight / 2 - height / 2 : 0,
  width,
  height,
});

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  width = 480,
  height = 400,
}: ModalProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const savedPositionRef = useRef<Position | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>(getInitialPosition(width, height));

  // 모달이 열렸을 때 포커스 설정
  useEffect(() => {
    if (isOpen && overlayRef.current) {
      overlayRef.current.focus();
    }
  }, [isOpen]);

  // 모달이 닫혔을 때 위치, 크기, 최대화 상태 초기화
  useEffect(() => {
    if (!isOpen) {
      setPosition(getInitialPosition(width, height));
      setIsMaximized(false);
      savedPositionRef.current = null;
    }
  }, [isOpen, width, height]);

  if (!isOpen) return null;

  // ESC 키로 닫기
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const toggleMaximize = () => {
    if (!isMaximized) {
      // 최대화 전에 현재 위치 저장
      savedPositionRef.current = position;
      setPosition({
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      });
    } else {
      // 복원
      if (savedPositionRef.current) {
        setPosition(savedPositionRef.current);
      }
    }
    setIsMaximized(!isMaximized);
  };

  return (
    <div
      ref={overlayRef}
      className={modalOverlay}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
    >
      <Rnd
        position={{ x: position.x, y: position.y }}
        size={{ width: position.width, height: position.height }}
        onDragStop={(_e, d) => {
          setPosition({
            ...position,
            x: d.x,
            y: d.y,
          });
        }}
        onResizeStop={(_e, _direction, ref, _delta, pos) => {
          setPosition({
            x: pos.x,
            y: pos.y,
            width: ref.offsetWidth,
            height: ref.offsetHeight,
          });
        }}
        minWidth={300}
        minHeight={200}
        bounds="parent"
        dragHandleClassName="modal-drag-handle"
        disableDragging={isMaximized}
        enableResizing={!isMaximized}
      >
        <div
          className={modalContent}
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
        >
          <div className={`${modalHeader} modal-drag-handle`}>
            <div>
              <h2 className={modalTitle} id="modal-title">
                {title}
              </h2>
              {subtitle && <p className={modalSubTitle}>{subtitle}</p>}
            </div>
            <div className={modalHeaderButtons}>
              <button
                className={modalHeaderButton}
                onClick={toggleMaximize}
                aria-label="Maximize/Restore modal"
                title={isMaximized ? "복원" : "최대화"}
                type="button"
              >
                {isMaximized ? "🗗" : "🗖"}
              </button>
              <button
                className={closeButton}
                onClick={onClose}
                aria-label="Close modal"
                type="button"
              >
                🗙
              </button>
            </div>
          </div>
          <div className={modalBody}>{children}</div>
        </div>
      </Rnd>
    </div>
  );
}
