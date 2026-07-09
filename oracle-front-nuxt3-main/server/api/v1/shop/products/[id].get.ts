import { ProductsData } from "~/shared/constants/shops";
import { proxyToBackend } from "~/server/utils/proxy";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Product ID is required" });
  }

  if (!config.public.useMocks) {
    return proxyToBackend(event, `/shop/products/${id}`);
  }

  const product = ProductsData.find((p) => p.id === parseInt(id));

  if (!product) {
    throw createError({ statusCode: 404, statusMessage: `Product ${id} not found` });
  }

  return product;
});

