import { http } from "../lib/http";

export const CategoryService = {
  getAll: (query, init) =>
    http({
      path: "/category",
      method: "GET",
      query,
      init,
    }),

  getOne: (slug, init) =>
    http({
      path: `/category/${slug}`,
      method: "GET",
      init: {
        ...init,
        tag: [`news/${slug}`],
      },
    }),

  create: (data) =>
    http({
      path: "/category/create",
      method: "POST",
      body: data,
      init: {
        cache: "no-store",
      },
    }),

  update: (id, data) =>
    http({
      path: `/category/update/${id}`,
      method: "PUT",
      body: data,
      init: {
        cache: "no-store",
      },
    }),

  delete: (id) =>
    http({
      path: `/category/delete/${id}`,
      method: "DELETE",
      init: {
        cache: "no-store",
      },
    }),
};
