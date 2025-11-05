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
  flexContainer,
} from "./ResumeCardRow.css.ts";

type rowData = {
  value?: string;
  keyword?: string[];
  lavel?: string;
  subTile?: string;
  date?: string;
  desc?: string;
  isLisence?: boolean;
  isUrl?: boolean;
  widthType: "half" | "full";
};

export default function ResumeCardRow({
  lavel,
  value,
  keyword,
  subTile,
  date,
  desc,
  isLisence = false,
  isUrl = false,
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
                {value?.split("\n").map((line) => (
                  <>
                    {line}
                    <br />
                  </>
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
          {desc.split("\n").map((line) => (
            <>
              {isUrl ? (
                <a href={line} target="_blank">
                  {line}
                </a>
              ) : (
                line
              )}
              <br />
            </>
          ))}
        </div>
      )}
      {Array.isArray(keyword) && (
        <div className={stackWrap}>
          {keyword.map((item) => (
            <span className={stack}>{item}</span>
          ))}
        </div>
      )}
    </div>
  );
}
