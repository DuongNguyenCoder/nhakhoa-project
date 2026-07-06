import { http } from "@/lib/http";
import z, { object } from "zod";

export const NewService = {
  getAll: (query, init) =>
    http({
      path: "/new",
      method: "GET",
      query,
      init,
    }),

  getBySlug: (slug, init) =>
    http({
      path: `/new/${slug}`,
      method: "GET",
      init,
    }),

  create: ({ data, cookieHeader }) =>
    http({
      path: "/new/create",
      method: "POST",
      body: data,
      headers: {
        Cookie: cookieHeader,
      },
      init: {
        cache: "no-store",
      },
    }),

  update: ({ id, data }) =>
    http({
      path: `/new/update/${id}`,
      method: "PUT",
      body: data,
      init: {
        cache: "no-store",
      },
    }),

  delete: (id) =>
    http({
      path: `/new/delete/${id}`,
      method: "DELETE",
      init: {
        cache: "no-store",
      },
    }),
};
