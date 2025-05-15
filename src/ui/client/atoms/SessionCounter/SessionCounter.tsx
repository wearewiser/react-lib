import { FC, useEffect, useRef, useState } from 'react';
import styles from './SessionCounter.module.scss';

export interface SessionCounterProps {

};

export const SessionCounter: FC<SessionCounterProps> = ({}) => {
  const [visitCount, setVisitCount] = useState<number>(0);
  const has_run = useRef(false);
  useEffect(() => {
    if (has_run.current) return;
    has_run.current = true;
    const stored_count = sessionStorage.getItem('visit_count');
    const current_count = stored_count ? parseInt(stored_count, 10) : 0;
    const new_count = current_count + 1;
    sessionStorage.setItem('visit_count', new_count.toString());
    setVisitCount(new_count);
  }, []);
  return (
    <>
      <p className={styles.session_counter}>You have visited this page {visitCount} {visitCount === 1 ? 'time' : 'times'} this session.</p>
    </>
  )
}