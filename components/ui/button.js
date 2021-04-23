import Link from 'next/link';
import classes from './button.module.css';

const Button = ({ link, children, onClick }) =>
  link ? (
    <Link href={link}>
      <a className={classes.btn}>{children}</a>
    </Link>
  ) : (
    <button className={classes.btn} onClick={onClick}>
      {children}
    </button>
  );

export default Button;
