import cn from 'classnames';
import styles from './styles.module.scss';

const Button = props => {
  const {
    variant,
    children,
    className,
    onClick,
    onMouseEnter,
    id,
    disabled,
    type,
    width,
  } = props;

  const buttonClass = cn(
    styles['new-button'],
    'new-button',
    {
      [styles['new-button--max']]: width === 'max',
      [styles['new-button--primary']]: variant === 'primary',
    },
    className,
  );

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={buttonClass}
      onMouseEnter={onMouseEnter}
      id={id}
      type={type}
      role="button"
      aria-pressed="false"
    >
      {children}
    </button>
  );
};

export default Button;
