import React, { forwardRef } from 'react';
import Button from '../Button/Button';
import res from './ReservationCard.module.scss';
import Image from 'next/image';
import { ReservationCardType } from '../../types/type';

const ReservationCard = forwardRef<HTMLDivElement, ReservationCardType>(
  (
    {
      classImage,
      revStatus,
      title,
      date,
      startTime,
      endTime,
      headCount,
      price,
      buttonStatus,
      buttonTitle,
      isButtonHidden,
    },
    ref,
  ) => {
    const getKoreanRevStatus = (status: string) => {
      switch (status) {
        case 'confirmed':
          return '예약 완료';
        case 'declined':
          return '예약 거절';
        case 'pending':
          return '예약 승인';
        case 'canceled':
          return '예약 취소';
        case 'completed':
          return '체험 완료';
        default:
          return status;
      }
    };

    return (
      <div ref={ref} className={res.reservationCardContainer}>
        <div className={res.mainBox}>
          <div className={res.imageDiv}>
            <Image
              // width={132}
              // height={128}
              objectFit="cover"
              fill
              style={{
                borderBottomLeftRadius: '24px',
                borderTopLeftRadius: '24px',
              }}
              src={classImage}
              alt="예약한 클래스 이미지"
            />
          </div>
          <div className={res.reservationDetail}>
            <div className={res.detailMainArea}>
              <div className={`${res[revStatus]}`} id={res.revStatus}>
                {getKoreanRevStatus(revStatus)}
              </div>
              <div className={res.title}>{title}</div>
              <div className={res.datebox}>
                <div>{date}</div>
                <div>·</div>
                <div>
                  {startTime} - {endTime}
                </div>
                <div>·</div>
                <div className={res.headCount}>{headCount}명</div>
              </div>
            </div>
            <div className={res.priceAndButtonArea}>
              <div className={res.price}>₩{price.toLocaleString('ko-KR')}</div>
              <div className={res.buttonDiv}>
                <Button
                  status={buttonStatus}
                  buttonTitle={buttonTitle}
                  hidden={isButtonHidden}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
export default ReservationCard;
