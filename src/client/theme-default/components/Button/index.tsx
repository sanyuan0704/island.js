import { Link } from '../Link';
import styles from './index.module.scss';

interface ButtonProps {
  type?: string;
  size?: 'medium' | 'big';
  theme?: 'brand' | 'alt';
  text: string;
  href?: string;
}

export function Button(props: ButtonProps) {
  const { theme = 'brand', size = 'big', href = '/' } = props;
  let ButtonContent;
  if (props.type === 'button') {
    ButtonContent = <button>{props.text}</button>;
  } else if (props.type === 'a') {
    if (import.meta.env.ENABLE_SPA) {
      ButtonContent = <Link href={href}>{props.text}</Link>;
    } else {
      ButtonContent = <a href={href}>{props.text}</a>;
    }
  }
  return (
    <div className={`${styles.button} ${styles[theme]} ${styles[size]}`}>
      {ButtonContent}
    </div>
  );
}
