import { card, grid } from "./ResumeCard.css.ts";

export default function ResumCard({ title, children }) {
  return (
    <div className={card}>
      <h3>{title}</h3>
      <div className={grid}>{children}</div>
    </div>
  );
}
