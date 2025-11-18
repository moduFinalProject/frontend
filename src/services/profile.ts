import { fetchWithAuth } from "./api";

interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export const getUser = async () => {
  const response = await fetchWithAuth("/user/profile", {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

export const updateUser = async (userData: User) => {
  const response = await fetchWithAuth("/user/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  return data;
};

export const deleteUser = async () => {
  const response = await fetchWithAuth("/user/me", {
    method: "DELETE",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "계정 삭제에 실패했습니다.");
  }
};
