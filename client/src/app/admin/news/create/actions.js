// "use server";

// import { revalidateTag } from "next/cache";
// import { NewService } from "@/services/new.service";

// async function createNewsWithCache(formData) {
//   "use cache";
//   return NewService.create({ data: formData });
// }

// export async function createNewsAction(formData) {
//   try {
//     console.log("ACTION START");
//     const response = await createNewsWithCache(formData);
//     console.log("SERVICE DONE");

//     revalidateTag("news-list", "max");
//     revalidateTag("news-detail", "max");
//     console.log("REVALIDATED");

//     return {
//       success: response?.success ?? true,
//       message: response?.mes || response?.message || "Tạo tin tức thành công!",
//     };
//   } catch (error) {
//     return {
//       success: false,
//       message: error?.message || "Không thể tạo tin tức tại thời điểm này.",
//     };
//   }
// }

"use server";

import { revalidateTag } from "next/cache";
import { NewService } from "@/services/new.service";
import { cookies } from "next/headers";

export async function createNewsAction(formData) {
  try {
    console.log("ACTION START");

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await NewService.create({
      data: formData,
      cookieHeader,
    });

    console.log("SERVICE DONE");

    revalidateTag("news-list");
    revalidateTag("news-detail");

    return {
      success: response?.success ?? true,
      message: response?.mes || response?.message,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: error?.message,
    };
  }
}
