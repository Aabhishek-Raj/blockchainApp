declare module '*.svg' {
    import { FunctionComponent, SVGProps } from 'react';
    // const content: FunctionComponent<SVGProps<SVGSVGElement>>;
    const content: string
    export default content;
  }
  
  declare module '*.png' {
    const value: string;
    export default value;
  }
  