import { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { createCampaign } from "../assets";
import { FormDataType } from "../pages/CreateCampaign";

interface StateContextType {
  address: string | undefined;
  contract: any;
  connect: () => void;
  createCampaign: (form: any) => Promise<void>;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateContextProvider = ({ children }: any) => {
  const { contract } = useContract(
    "0x94C247a24b5A83bfD2C0c5A91F8bbea01B2d2d1D"
  );

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form: any) => {
    try {
      const data = await createCampaign([
        address,
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ] as any);

      console.log("Contract call sucess", data);
    } catch (error) {
      console.log("Contract Failed", error);
    }
  };

  const contextValue: StateContextType = {
    address,
    contract,
    connect,
    createCampaign: publishCampaign,
  };

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = (): StateContextType => {
    const context = useContext(StateContext);

    if(!context) {
        throw new Error("error, seStateContext must be used within StateContextProvider")
    }
    
    return context
} 

