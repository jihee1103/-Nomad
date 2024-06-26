import Button from '@/components/Button/Button';
import styles from './myClassTitle.module.scss';
import CategoryInput from '../MyClassInputs/CategoryInput/CategoryInput';
import DescriptionInput from '../MyClassInputs/DescriptionInput/DescriptionInput';
import PriceInput from '../MyClassInputs/PriceInput/PriceInput';
import DateInput from '../MyClassInputs/DateInput/DateInput';
import AddressInput from '../MyClassInputs/AddressInput/AddressInput';
import SubImageInputContainer from '@/containers/ImageInput/SubImageInputContainer';
import { useFieldArray, useForm } from 'react-hook-form';

import TitleInput from '../MyClassInputs/TitleInput/TitleInput';
import { useState } from 'react';
import {
  postActivitiesImageApi,
  postAddMyActivityApi,
} from '@/apis/activitiesApi';

import ModalBase from '@/components/Modal/ModalBase';
import MyClassModal from '../MyClassModal';
import { useRouter } from 'next/router';
import EditBannerImageInputContainer from '@/containers/ImageInput/EditBannerImageInputContainer';

export interface FormValues {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  mainSchedule: {
    date: string;
    startTime: string;
    endTime: string;
  };
  schedules: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
  image: string;
  subImage: string[];
}

interface MyClassTitleProps {
  buttonTitle: string;
}

export default function MyClassTitle({ buttonTitle }: MyClassTitleProps) {
  const router = useRouter();
  const [getAddress, setGetAddress] = useState('');

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    name: 'schedules',
    control: control,
  });

  const [bannerImgURL, setBannerImgURL] = useState('');
  const [formData, setFormData] = useState<FormData>();
  const [subImgFormData, setSubImgFormData] = useState<FormData[]>([]);

  const checkBannerURL = async (): Promise<void> => {
    if (formData) {
      const data = await postActivitiesImageApi(formData);

      return data.activityImageUrl;
    }
  };

  const postImgApi = async (subImgFormData: FormData) => {
    const data = await postActivitiesImageApi(subImgFormData);

    return data.activityImageUrl;
  };

  const convertSubImgURL = async (): Promise<string[]> => {
    if (subImgFormData) {
      const subImgApiUrlArray = await Promise.all(
        subImgFormData.map((item) => postImgApi(item)),
      );
      return subImgApiUrlArray;
    }
    return [];
  };

  const [subImgUrl, setSubImgUrl] = useState<string[]>([]);
  const [isModalOpen, setIsModalOepn] = useState(false);

  const onSubmit = async (data: FormValues) => {
    try {
      const subImgApiArray = await convertSubImgURL();
      const banner = await checkBannerURL();
      const dateArray = [data.mainSchedule];
      const combinedDateArray = dateArray.concat(data.schedules);

      const sendData = {
        title: data.title,
        category: data.category,
        description: data.description,
        address: data.address,
        price: Number(data.price),
        schedules: combinedDateArray,
        bannerImageUrl: String(banner),
        subImageUrls: subImgApiArray,
      };

      const apiData = await postAddMyActivityApi(sendData);
      if (apiData && apiData.status === 201) {
        setIsModalOepn(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  function closeModal() {
    setIsModalOepn(false);
    router.push('/my-page/my-class');
  }
  subImgUrl.splice(4);
  subImgFormData.splice(4);

  return (
    <>
      <div>
        <form
          className={styles.myClassAddBox}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.myClassTitleWrapper}>
            <span className={styles.myClassSubtitle}>내 체험 등록</span>
          </div>
          <div className={styles.inputContainer}>
            <TitleInput id="title" register={register} errors={errors} />
            <CategoryInput id="category" register={register} errors={errors} />
            <DescriptionInput
              id="description"
              register={register}
              errors={errors}
            />
            <PriceInput id="price" register={register} errors={errors} />
            <AddressInput
              id="address"
              register={register}
              errors={errors}
              getAddress={getAddress}
              setGetAddress={setGetAddress}
              setValue={setValue}
            />
            <DateInput
              id="date"
              register={register}
              errors={errors}
              fields={fields}
              append={append}
              remove={remove}
            />
            <EditBannerImageInputContainer
              id="image"
              register={register}
              errors={errors}
              bannerImgURL={bannerImgURL}
              setBannerImgURL={setBannerImgURL}
              setFormData={setFormData}
              setValue={setValue}
            />
            <SubImageInputContainer
              id="subImage"
              register={register}
              errors={errors}
              setValue={setValue}
              subImgUrl={subImgUrl}
              setSubImgUrl={setSubImgUrl}
              subImgFormData={subImgFormData}
              setSubImgFormData={setSubImgFormData}
            />
          </div>
          <div className={styles.button}>
            <Button buttonTitle={buttonTitle} radius={4} fontSize={1.6} />
          </div>
        </form>
      </div>
      {isModalOpen ? (
        <ModalBase
          children={
            <MyClassModal
              message="체험 등록이 완료되었습니다."
              onClick={closeModal}
            />
          }
          type="alert"
        ></ModalBase>
      ) : (
        ''
      )}
    </>
  );
}
