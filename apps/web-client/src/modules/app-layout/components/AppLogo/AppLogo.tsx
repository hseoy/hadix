import styles from './AppLogo.module.scss';

export const AppLogo = () => {
  return (
    <div className={styles.logo}>
      <span className={styles['animated-letter-container']}>
        <span className={styles['animated-letter']}>P</span>
      </span>
      <span>놀이터</span>
    </div>
  );
};
