import Image from 'next/image';
import styles from './classTitle.module.scss';
import Kebab from '@/components/DropDown/Kebab';

interface TitleProps {
  title: string;
  category: string;
  rating: number;
  reviewCount: number;
  address: string;
}

export default function ClassTitle({
  title,
  category,
  rating,
  reviewCount,
  address,
}: TitleProps) {
  const onClick = () => {};
  return (
    <>
      <section className={styles.titleSection}>
        <div className={styles.classCategory}>{category}</div>
        <div className={styles.titleContainer}>
          <div>
            <div className={styles.classTitle}>{title}</div>
            <div className={styles.infoContainer}>
              <div className={styles.infoWrapper}>
                <Image
                  src="/assets/images/star.svg"
                  alt="별점 아이콘"
                  width={16}
                  height={16}
                />
                <div className={styles.starNum}>
                  {rating.toFixed(1)} ({reviewCount})
                </div>
              </div>
              <div className={styles.infoWrapper}>
                <Image
                  src="/assets/images/location.svg"
                  alt="위치 아이콘"
                  width={18}
                  height={18}
                />
                <div>{address}</div>
              </div>
            </div>
          </div>
          {/* 본인 글에만 보이게 */}
          <Kebab dropDownList={['수정하기', '삭제하기']} onClick={onClick} />
        </div>
      </section>
    </>
  );
}
