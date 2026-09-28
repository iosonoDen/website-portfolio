const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

// next/image (unoptimized) and plain links do not prepend basePath to files in public/.
export function withBasePath(path: `/${string}`) {
  return `${basePath}${path}`;
}
