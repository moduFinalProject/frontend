import { fetchWithAuth } from "./api";

export async function getUserInfo() {
  try {
    const response = await fetchWithAuth("/user/userinfo", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("로딩 중 에러:", error);
  }
}

// 이력서 리스트
export async function getResumeList({
  page = 1,
  limit,
  search,
}: {
  page: number;
  limit?: number | undefined;
  search?: string | undefined;
}) {
  const limitParam = limit ? `&page_size=${limit}` : "";
  const searchParam = search ? `&title=${search}` : "";
  try {
    const response = await fetchWithAuth(
      `/resumes/?page=${page}${limitParam}${searchParam}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      // 400, 500 등 다른 오류 발생 시
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data = await response.json();
    console.log("사용자 데이터:", data);
    console.log(data.length);
    return data;
  } catch (error) {
    console.error("로딩 중 에러:", error);
    // UI에 에러 메시지를 표시하거나 다른 처리를 할 수 있습니다.
  }
}

// 이력서 상세
export async function getResume(resume_id: string | undefined) {
  if (resume_id === undefined) return;

  try {
    const response = await fetchWithAuth(`/resumes/${resume_id}`);

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("로딩 중 에러:", error);
  }
}

// 이력서 생성
export async function createResume(formData) {
  try {
    const response = await fetchWithAuth("/resumes", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("로딩 중 에러:", error);
  }
}

// 이력서 삭제
export async function delResume(resume_id: string | undefined) {
  if (resume_id === undefined) return;
  console.log(resume_id, "삭제 시도");

  try {
    const response = await fetchWithAuth(`/resumes/${resume_id}`, {
      method: "PATCH",
    });

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("로딩 중 에러:", error);
  }
}

// 이력서 수정
export async function updateResume(formData, id) {
  if (id === undefined) return;

  try {
    const response = await fetchWithAuth(`/resumes/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("로딩 중 에러:", error);
  }
}

export function addDay(arrayData) {
  if (!Array.isArray(arrayData)) return arrayData;

  const result = arrayData.map((item) => {
    if (
      item.start_date &&
      typeof item.start_date === "string" &&
      item.start_date.length === 7
    ) {
      item.start_date = item.start_date + "-01";
    }
    if (
      item.end_date &&
      typeof item.end_date === "string" &&
      item.end_date.length === 7
    ) {
      item.end_date = item.end_date + "-01";
    }
    if (
      item.acquisition_date &&
      typeof item.acquisition_date === "string" &&
      item.acquisition_date.length === 7
    ) {
      item.acquisition_date = item.acquisition_date + "-01";
    }
    return item;
  });

  return result;
}
