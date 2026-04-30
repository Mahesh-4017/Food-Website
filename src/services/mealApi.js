const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const searchMealByLetter = async (letter) => {
  const res = await fetch(`${BASE_URL}/search.php?f=${letter}`);
  const data = await res.json();
  return data.meals;
};

export const getRandomMeal = async () => {
  const res = await fetch(`${BASE_URL}/random.php`);
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
};

export const getAllCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories.php`);
  const data = await res.json();
  return data.categories;
};

export const getMealsByCategory = async (category) => {
  const res = await fetch(`${BASE_URL}/filter.php?c=${category}`);
  const data = await res.json();
  return data.meals || [];
};

export const getAllAreas = async () => {
  const res = await fetch(`${BASE_URL}/list.php?a=list`);
  const data = await res.json();
  return data.meals || [];
};


export const searchMealByName = async (name) => {
  const res = await fetch(`${BASE_URL}/search.php?s=${name}`);
  const data = await res.json();
  return data.meals || [];
};

import { countryMeals } from "../data/countryMeals";

export const getMealsByArea = async (area) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(countryMeals[area] || []);
    }, 500);
  });
};

export const getYoutubeId = (url) => {
  if (!url) return null;
  const regex =
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
