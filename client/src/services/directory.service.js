import { http } from "../lib/http";

export const DirectoryService = {
  getAll: (query, init) =>
    http({
      path: "/directory",
      method: "GET",
      query,
      init,
    }),

  getOne: (slug, init) =>
    http({
      path: `/directory/${slug}`,
      method: "GET",
      init,
    }),

  create: (data) =>
    http({
      path: "/directory/create",
      method: "POST",
      body: data,
      init: {
        cache: "no-store",
      },
    }),

  update: (id, data) =>
    http({
      path: `/directory/update/${id}`,
      method: "PUT",
      body: data,
      init: {
        cache: "no-store",
      },
    }),

  delete: (id) =>
    http({
      path: `/directory/delete/${id}`,
      method: "DELETE",
      init: {
        cache: "no-store",
      },
    }),
};
