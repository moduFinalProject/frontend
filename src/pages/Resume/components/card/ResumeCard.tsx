import { vars } from "@/design-system/index.ts";
import { card, grid, titleWrap } from "./ResumeCard.css.ts";
import { Button } from "@/components/index.ts";

type rowData = {
  children: React.ReactNode;
  title?: string;
  isMust?: boolean;
  useButton?: boolean;
  btnType?: "PLUSBLACK" | "DEL";
  span?: number;
  onAdd?: () => void;
  onDelete?: () => void;
};

export default function ResumCard({
  title,
  children,
  isMust = false,
  useButton = false,
  btnType,
  onAdd,
  onDelete,
}: rowData) {
  return (
    <section className={card}>
      <div className={titleWrap}>
        <h3>
          {title}
          {isMust && <span style={{ color: vars.color.delete }}> *</span>}
        </h3>
        {useButton && (
          <div>
            <Button
              callback={
                onAdd
                  ? onAdd
                  : onDelete
                  ? onDelete
                  : () => {
                      alert("개발중입니다.");
                    }
              }
              color={btnType !== "DEL" ? "white" : "gray"}
              text={btnType !== "DEL" ? "추가" : ""}
              widthStyle="fit"
              icon={btnType}
            />
          </div>
        )}
      </div>
      <div className={grid}>{children}</div>
    </section>
  );
}
