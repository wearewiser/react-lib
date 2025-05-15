import { FC } from 'react';
import styles from './Hello.module.scss';
import { SessionCounter } from '{{pkg}}/ui/client/atoms';

export interface HelloProps {
  name: string | null | undefined;
};

export const Hello: FC<HelloProps> = ({name}) => {
  const is_server = !!process && !!process.env;
  return (
    <div className={styles.hello}>
      <h1>Hello {name || "world"}, from the {is_server ? "server!" : "client"}!</h1>
      <p>...this component should be running from the server</p>
      <div>
        <h2>Session Counter (client)</h2>
        <SessionCounter />
      </div>
    </div>
  )
}