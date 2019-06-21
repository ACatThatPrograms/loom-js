/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Contract, ContractTransaction, EventFilter, Signer } from "ethers";
import { Listener, Provider } from "ethers/providers";
import { Arrayish, BigNumber, BigNumberish, Interface } from "ethers/utils";
import {
  TransactionOverrides,
  TypedEventDescription,
  TypedFunctionDescription
} from ".";

interface ERC20Gateway_v2Interface extends Interface {
  functions: {
    withdrawERC20: TypedFunctionDescription<{
      encode([amount, contractAddress, _signersIndexes, _v, _r, _s]: [
        BigNumberish,
        string,
        (BigNumberish)[],
        (BigNumberish)[],
        (Arrayish)[],
        (Arrayish)[]
      ]): string;
    }>;

    depositERC20: TypedFunctionDescription<{
      encode([amount, contractAddress]: [BigNumberish, string]): string;
    }>;
  };

  events: {
    TokenWithdrawn: TypedEventDescription<{
      encodeTopics([owner, kind, contractAddress, value]: [
        string | null,
        null,
        null,
        null
      ]): string[];
    }>;

    LoomCoinReceived: TypedEventDescription<{
      encodeTopics([from, amount, loomCoinAddress]: [
        string | null,
        null,
        null
      ]): string[];
    }>;

    ERC20Received: TypedEventDescription<{
      encodeTopics([from, amount, contractAddress]: [
        null,
        null,
        null
      ]): string[];
    }>;
  };
}

export class ERC20Gateway_v2 extends Contract {
  connect(signerOrProvider: Signer | Provider | string): ERC20Gateway_v2;
  attach(addressOrName: string): ERC20Gateway_v2;
  deployed(): Promise<ERC20Gateway_v2>;

  on(event: EventFilter | string, listener: Listener): ERC20Gateway_v2;
  once(event: EventFilter | string, listener: Listener): ERC20Gateway_v2;
  addListener(
    eventName: EventFilter | string,
    listener: Listener
  ): ERC20Gateway_v2;
  removeAllListeners(eventName: EventFilter | string): ERC20Gateway_v2;
  removeListener(eventName: any, listener: Listener): ERC20Gateway_v2;

  interface: ERC20Gateway_v2Interface;

  functions: {
    nonces(arg0: string): Promise<BigNumber>;

    getERC20(contractAddress: string): Promise<BigNumber>;

    withdrawERC20(
      amount: BigNumberish,
      contractAddress: string,
      _signersIndexes: (BigNumberish)[],
      _v: (BigNumberish)[],
      _r: (Arrayish)[],
      _s: (Arrayish)[],
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>;

    depositERC20(
      amount: BigNumberish,
      contractAddress: string,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>;

    vmc(): Promise<string>;
    loomAddress(): Promise<string>;
  };

  filters: {
    TokenWithdrawn(
      owner: string | null,
      kind: null,
      contractAddress: null,
      value: null
    ): EventFilter;

    LoomCoinReceived(
      from: string | null,
      amount: null,
      loomCoinAddress: null
    ): EventFilter;

    ERC20Received(from: null, amount: null, contractAddress: null): EventFilter;
  };

  estimate: {
    withdrawERC20(
      amount: BigNumberish,
      contractAddress: string,
      _signersIndexes: (BigNumberish)[],
      _v: (BigNumberish)[],
      _r: (Arrayish)[],
      _s: (Arrayish)[]
    ): Promise<BigNumber>;

    depositERC20(
      amount: BigNumberish,
      contractAddress: string
    ): Promise<BigNumber>;
  };
}
