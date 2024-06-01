import withMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "tsx", "md", "mdx"],
};

export default withMDX()(nextConfig);
