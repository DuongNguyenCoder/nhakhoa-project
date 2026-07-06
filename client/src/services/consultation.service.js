import { http } from "@/lib/http";
import z from "zod";

export const ConsultationService = {
  getAll: (query, init) =>
    http({
      path: "/consultation",
      method: "GET",
      query,
      init,
    }),

  create: (data) =>
    http({
      path: "/consultation/create",
      method: "POST",
      body: data,
      init: {
        cache: "no-store",
      },
    }),

  update: ({ id, data }) =>
    http({
      path: `/consultation/update/${id}`,
      method: "PUT",
      body: data,
      init: {
        cache: "no-store",
      },
    }),

  delete: (id) =>
    http({
      path: `/consultation/delete/${id}`,
      method: "DELETE",
      init: {
        cache: "no-store",
      },
    }),
};
