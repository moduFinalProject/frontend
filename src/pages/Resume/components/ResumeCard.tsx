import { vars } from "@/design-system/index.ts";
import { card, grid, titleWrap } from "./ResumeCard.css.ts";
import { Button } from "@/components/index.ts";

type rowData = {
  children: React.ReactNode;
  title?: string;
  isMust?: boolean;
  useButton?: boolean;
  span?: number;
};

export default function ResumCard({
  title,
  children,
  isMust = false,
  useButton = false,
  span = 1,
}: rowData) {
  return (
    <section className={card} style={{ gridColumn: "span 2" }}>
      <div className={titleWrap}>
        <h3>
          {title}
          {isMust && <span style={{ color: vars.color.delete }}> *</span>}
        </h3>
        {useButton && (
          <div>
            <Button
              callback={() => {
                alert("개발중입니다.");
              }}
              color="white"
              text="추가"
              widthStyle="fit"
              icon="PLUSBLACK"
            />
          </div>
        )}
      </div>
      <div className={grid}>{children}</div>
    </section>
  );
}
