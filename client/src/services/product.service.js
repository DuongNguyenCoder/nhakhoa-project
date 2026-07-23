import { http } from "@/lib/http";

export const ProductService = {
  getAll: (query, init) =>
    http({
      path: "/product",
      method: "GET",
      query,
      init,
    }),

  getBySlug: (slug = undefined, init = undefined) =>
    http({
      path: `/product/${slug}`,
      method: "GET",
      init,
    }),

  create: ({ data }) =>
    http({
      path: "/product/create",
      method: "POST",
      body: data,
      init: {
        cache: "no-store",
      },
    }),

  update: ({ id, data }) =>
    http({
      path: `/product/update/${id}`,
      method: "PUT",
      body: data,
      init: {
        cache: "no-store",
      },
    }),

  delete: (id) =>
    http({
      path: `/product/delete/${id}`,
      method: "DELETE",
      init: {
        cache: "no-store",
      },
    }),
};
