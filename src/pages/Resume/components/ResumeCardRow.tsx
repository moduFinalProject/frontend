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
  imgWrap,
} from "./ResumeCardRow.css.ts";

type rowData = {
  value?: string;
  keyword?: string[];
  lavel?: string;
  subTile?: string;
  date?: string;
  desc?: string;
  imgUrl?: string;
  isLisence?: boolean;
  isUrl?: boolean;
  isPhoto?: boolean;
  widthType: "half" | "full";
};

export default function ResumeCardRow({
  lavel,
  value,
  keyword,
  subTile,
  date,
  desc,
  imgUrl,
  isLisence = false,
  isUrl = false,
  isPhoto = false,
  widthType,
}: rowData) {
  return (
    <div className={`${row} ${widthStyle[widthType]}`}>
      {value && (
        <div className={topTitle}>
          <div className={topTitleText}>
            {lavel && <h4>{lavel}</h4>}
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
      {desc && (
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
      )}
      {Array.isArray(keyword) && (
        <div className={stackWrap}>
          {keyword.map((item) => (
            <span key={item} className={stack}>
              {item}
            </span>
          ))}
        </div>
      )}
      {isPhoto && (
        <div className={imgWrap}>
          <img src={imgUrl} alt="증명사진" />
        </div>
      )}
    </div>
  );
}
