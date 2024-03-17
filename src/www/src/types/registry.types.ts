export interface IRegistryJSON {
  [type: string]: {
    [category: string]: {
      methods: {
        name: string;
        code: {
          typescript: string;
          javascript: string;
          commonjs: string;
        };
        param: string;
        createdAt: {
          date: string;
          packageVersion: string;
        };
        lastUpdated: {
          date: string;
          packageVersion: string;
        };
      }[];
    };
  };
}
