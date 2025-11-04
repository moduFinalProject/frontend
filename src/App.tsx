// 절대 경로 alias 테스트: @/design-system 사용
import { vars } from "@/design-system";

function App() {
  return (
    <div>
      <h1>개취 개발중</h1>
      {/* 절대 경로 alias 테스트 완료 */}
      <p style={{ color: vars.color.gray.lv3 }}>
        절대 경로 alias 테스트: @/design-system 정상 작동
      </p>
    </div>
  );
}

export default App;
