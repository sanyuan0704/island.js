import styles from './index.module.scss';
import { toggle } from '../../logic/toggleAppearance';

interface SwitchProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Switch(props: SwitchProps) {
  return (
    <button
      className={`${styles.switch} ${props.className}`}
      id={props.id ?? ''}
      type="button"
      role="switch"
      {...(props.onClick ? { onClick: props.onClick } : {})}
    >
      <span className={styles.check}>
        <span className={styles.icon}>{props.children}</span>
      </span>
    </button>
  );
}

export function SwitchAppearance() {
  return (
    <Switch onClick={toggle}>
      <div className={styles.sun}>
        <div className="i-carbon-sun" w="full" h="full"></div>
      </div>
      <div className={styles.moon}>
        <div className="i-carbon-moon" w="full" h="full"></div>
      </div>
    </Switch>
  );
}
