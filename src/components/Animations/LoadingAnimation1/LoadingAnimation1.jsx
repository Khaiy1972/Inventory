import styles from "./LoadingAnimation1.module.css";

function LoadingAnimation1() {
  return (
    <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
      <circle
        className={`${styles.pl__ring} ${styles.pl__ring__a}`}
        cx="120"
        cy="120"
        r="105"
        fill="none"
        stroke="#000"
        strokeWidth="20"
        strokeDasharray="0 660"
        strokeSashoffset="-330"
        strokeLinecap="round"></circle>
      <circle
        className={`${styles.pl__ring} ${styles.pl__ring__b}`}
        cx="120"
        cy="120"
        r="35"
        fill="none"
        stroke="#000"
        strokeWidth="20"
        strokeDasharray="0 220"
        strokeDashoffset="-110"
        strokeLinecap="round"></circle>
      <circle
        className={`${styles.pl__ring} ${styles.pl__ring__c}`}
        cx="85"
        cy="120"
        r="70"
        fill="none"
        stroke="#000"
        strokeWidth="20"
        strokeDasharray="0 440"
        strokeLinecap="round"></circle>
      <circle
        className={`${styles.pl__ring} ${styles.pl__ring__d}`}
        cx="155"
        cy="120"
        r="70"
        fill="none"
        stroke="#000"
        strokeWidth="20"
        strokeDasharray="0 440"
        strokeLinecap="round"></circle>
    </svg>
  );
}

export default LoadingAnimation1;
