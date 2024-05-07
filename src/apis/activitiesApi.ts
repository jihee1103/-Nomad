import axiosInstance from './axiosInstance';

// 체험 리스트 조회
export const getClassListApi = async (
  method: string,
  cursorId?: number,
  category?: string,
  keyword?: string,
  sort?: string,
  page?: number,
  size?: number,
) => {
  const res = await axiosInstance.get(
    `activities/method=${method}&cursorId?=${cursorId}&category?=${category}&keyword?=${keyword}&sort?=${sort}&page?=${page}$size?=${size}`,
    {
      headers: {
        Accept: 'application/json',
      },
    },
  );
  if (res.status === 200) {
    return res.data;
  } else if (res.status === 400) {
    throw new Error('error');
  }
};

// 체험 상세 조회
export const getDetailClassApi = async (id: number = 776) => {
  const detail = await axiosInstance.get(`activities/${id}`);

  return detail.data;
};

// 체험 리뷰 조회
export const getDetailClassReviewApi = async (
  id: number = 776,
  page: number,
  size: number,
) => {
  const review = await axiosInstance.get(
    `activities/${id}/reviews?page=${page}&size=${size}`,
  );
  return review.data;
};
