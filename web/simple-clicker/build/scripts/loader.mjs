let entrypoint = true;
export async function load(url, context, defaultLoad) {
  if (entrypoint) {
    context.format = "module";
    entrypoint = false;
  }
  return defaultLoad(url, context, defaultLoad);
}
