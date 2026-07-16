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
