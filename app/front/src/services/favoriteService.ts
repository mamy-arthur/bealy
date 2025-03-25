import { apiUrl } from "@/constants/apiContant";

export const getStories = async (page: number = 1, favoritePage: boolean = false, userId: number = 0) => {
  let url = `${apiUrl}/stories?page=${page}&favoritePage=${Number(favoritePage)}`;
  if (userId) {
    url = `${url}&userId=${userId}`;
  }
  return await fetch(url, {
    credentials: 'include',
  });
};

export const manageFavorite = async (storyId: number, isfavorite: boolean) => {
    const params = !isfavorite ? 'add' : 'delete';
    const data = {
        favoriteId: storyId
    };
    return await fetch(`${apiUrl}/userfavorite/${params}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
    });
};