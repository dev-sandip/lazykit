import { IDoc, IRegistryFunctionPropTable } from "@/types/registry.types";

const Docs = () => {
  return (
    <>
      <p>
        The or function is a utility function in TypeScript that performs a
        logical OR operation on the given arguments.
      </p>
    </>
  );
};
export default Docs;

export const Info: IDoc = {
  description: "Performs a logical OR operation on the given arguments.",
};

export const Props: IRegistryFunctionPropTable[] = [
  {
    title: "args",
    required: true,
    defaultValue: undefined,
    propDesc: "The arguments to perform the OR operation on.",
    type: "any[]",
  },
];
