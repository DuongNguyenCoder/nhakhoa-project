import { http } from "@/lib/http";

export const DirectoryService = {
  getAll: (query, init) =>
    http({
      path: "/directory",
      method: "GET",
      query,
      init,
    }),

  /**
   * Return the directory object for given id or null.
   */
  getById: async (id, init = { cache: "no-store" }) => {
    if (!id) return null;

    const res = await http({
      path: "/directory",
      method: "GET",
      query: { id },
      init,
    });

    // Backend may return { success, data: [...] } or { success, data: {...} }
    if (!res) return null;

    const payload = res.data ?? res;

    if (Array.isArray(payload)) {
      return payload.find((d) => d._id === id || d.id === id) ?? null;
    }

    if (payload && (payload._id === id || payload.id === id)) return payload;

    // If res.data is an object wrapper like { success, data }
    if (res.data && Array.isArray(res.data)) {
      return res.data.find((d) => d._id === id || d.id === id) ?? null;
    }

    return res.data ?? null;
  },

  create: ({ data }) =>
    http({
      path: "/directory/add-directory",
      method: "POST",
      body: data,
      init: { cache: "no-store" },
    }),

  update: ({ id, data }) =>
    http({
      path: `/directory/update-directory/${id}`,
      method: "PUT",
      body: data,
      init: { cache: "no-store" },
    }),

  delete: (id) =>
    http({
      path: `/directory/delete-directory/${id}`,
      method: "DELETE",
      init: { cache: "no-store" },
    }),
};

export default DirectoryService;
