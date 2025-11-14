import { Fragment } from "react/jsx-runtime";
import {
  row,
  widthStyle,
  topTitle,
  topTitleText,
  stackWrap,
  stack,
  lisence,
  subText,
  dateText,
  descText,
  descTextLink,
  flexContainer,
  preWrap,
} from "./JobCardRow.css.ts";

type rowData = {
  value?: string;
  keyword?: string[];
  label?: string;
  subTile?: string;
  date?: string;
  desc?: string;
  isLisence?: boolean;
  isUrl?: boolean;
  isPreWrap?: boolean;
  widthType: "half" | "full";
};

export default function JobCardRow({
  label,
  value,
  keyword,
  subTile,
  date,
  desc,
  isLisence = false,
  isUrl = false,
  isPreWrap = false,
  widthType,
}: rowData) {
  return (
    <div className={`${row} ${widthStyle[widthType]}`}>
      {(value || subTile) && (
        <div className={topTitle}>
          <div className={topTitleText}>
            {label && <h4>{label}</h4>}
            {!Array.isArray(value) && (
              <p className={flexContainer}>
                {value?.split("\n").map((line, idx) => (
                  <Fragment key={idx}>
                    {line}
                    <br />
                  </Fragment>
                ))}
                {isLisence && <span className={lisence}>자격증</span>}
              </p>
            )}
            {subTile && <p className={subText}>{subTile}</p>}
          </div>
          {date && <p className={dateText}>{date}</p>}
        </div>
      )}
      {desc &&
        (isPreWrap ? (
          <p className={`${descText} ${preWrap}`}>{desc}</p>
        ) : (
          <div className={descText}>
            {desc.split("\n").map((line, idx) => (
              <Fragment key={idx}>
                {isUrl ? (
                  <a className={descTextLink} href={line} target="_blank">
                    {line}
                  </a>
                ) : (
                  line
                )}
                <br />
              </Fragment>
            ))}
          </div>
        ))}
      {Array.isArray(keyword) && (
        <div className={stackWrap}>
          {keyword.map((item) => (
            <span key={item} className={stack}>
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
