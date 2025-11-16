import { useLoading } from "@/contexts/LoadingContext";
import { overlay, spinnerImage } from "./LoadingOverlay.css";
import loadingGif from "@/assets/images/loading/loading.gif";

export default function LoadingOverlay() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className={overlay}>
      <div>
        <img src={loadingGif} alt="로딩 중..." className={spinnerImage} />
      </div>
    </div>
  );
}
