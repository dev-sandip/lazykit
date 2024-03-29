import { IDoc } from "@/types/registry.types";

const Docs = () => {
  return <div>Docs</div>;
};
export default Docs;

export const Info: IDoc = {
  name: "Chunk",
  description: "Chunks an array into smaller arrays of a specified size.",
  externalLinks: [
    {
      label: "lodash",
      url: "https://lodash.com/docs/4.17.15#chunk",
    },
  ],
};