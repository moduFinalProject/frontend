import { topbar, topbarRight, userInfo, userDetails, userName, userEmail } from "./Topbar.css";
import { Button } from "@/components/Button";
import { useMemo, useState } from "react";
import { Modal } from "@/components/Modal";
import JobList from '@/pages/Jobs/JobList';

export default function Topbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = useMemo(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        console.error("Failed to parse user from localStorage:", e);
      }
    }
    return null;
  }, []);

  return (
    <>
      <aside className={topbar}>
        <section className={topbarRight}>
          <Button
            widthStyle="fit"
            color="none"
            text=""
            callback={() => setIsModalOpen(true)}
            icon="ALAM"
          ></Button>
          {user && (
            <div className={userInfo}>
              <div className={userDetails}>
                <p className={userName}>{user.name}</p>
                <p className={userEmail}>{user.email}</p>
              </div>
            </div>
          )}
        </section>
      </aside>

      {/* <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="신규 알림"
        subtitle="알림을 확인하세요"
        width={400}
        height={400}
      >
        <p>신규 알림창은 서비스 제공 예정입니다.</p>        
      </Modal> */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="등록된 채용공고 선택"
        subtitle="관리하고 있는 채용공고 중 하나를 선택하세요."
        width={800}
        height={600}
      >
        <JobList 
          isModal={true}
           onSelect={(job) => {
            console.log("선택된 Job:", job);
            // 선택된 job으로 뭔가 처리
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </>
  );
}
