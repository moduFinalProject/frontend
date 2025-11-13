import { useState, useRef, useEffect } from "react";
import Modal from "@/components/Modal/Modal";
import { Button } from "@/components/index";
import checkIcon from "@/assets/icons/Icon-check.svg";
import {
  agreementContainer,
  agreementContainerChecked,
  agreementRow,
  checkbox,
  checkboxLabel,
  agreementText,
  contentScroll,
  buttonContainer,
  agreementContentParagraph,
} from "./AgreementSection.css";

interface AgreementSectionProps {
  title: string;
  isChecked: boolean;
  onToggle: () => void;
  content: string;
}

export default function AgreementSection({
  title,
  isChecked,
  onToggle,
  content,
}: AgreementSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (isChecked) {
      // 이미 체크된 경우 체크만 해제
      onToggle();
    } else {
      // 체크되지 않은 경우 모달 열기
      setIsModalOpen(true);
      setIsScrolledToBottom(false);
    }
  };

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      // 스크롤 가능한 경우: 하단까지 스크롤했을 때
      // 스크롤 불가능한 경우: 전체 내용이 보일 때 (clientHeight >= scrollHeight)
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 10 || clientHeight >= scrollHeight;
      setIsScrolledToBottom(isAtBottom);
    }
  };

  // 모달이 열렸을 때 초기 상태 확인
  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        handleScroll();
      }, 0);
    }
  }, [isModalOpen]);

  const handleAgree = () => {
    onToggle();
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={isChecked ? agreementContainerChecked : agreementContainer} onClick={handleClick}>
        <div className={agreementRow}>
          <label className={checkboxLabel}>
            <span className={agreementText}>{title}</span>
          </label>
          <div className={checkbox}>
            {isChecked && <img src={checkIcon} alt="checked" />}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        width={500}
        height={600}
      >
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div className={contentScroll} ref={contentRef} onScroll={handleScroll}>
            <p className={agreementContentParagraph}>{content}</p>
          </div>
          <div className={buttonContainer}>
            <Button
              text="동의하기"
              color={isScrolledToBottom ? "blue" : "gray"}
              widthStyle="full"
              callback={handleAgree}
              disabled={!isScrolledToBottom}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
