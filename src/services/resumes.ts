import { fetchWithAuth } from "./api";

// 이력서 리스트
export async function getResumeList({
  page = 1,
  limit,
  search,
}: {
  page: number;
  limit?: number;
  search?: string;
}) {
  const limitParam = limit ? `&limit=${limit}` : "";
  const searchParam = search ? `&search=${search}` : "";
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
