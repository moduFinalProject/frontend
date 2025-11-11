import { card, grid } from "./JobCard.css.ts";

type rowData = {
  children: React.ReactNode;
  span?: number;
};

export default function JobCard({ children }: rowData) {
  return (
    <section className={card} style={{ gridColumn: "span 2" }}>
      <div className={grid}>{children}</div>
    </section>
  );
}
