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

interface ERC20GatewayInterface extends Interface {
  functions: {
    toggleToken: TypedFunctionDescription<{
      encode([_token]: [string]): string;
    }>;

    renounceOwnership: TypedFunctionDescription<{ encode([]: []): string }>;

    addValidator: TypedFunctionDescription<{
      encode([_validator, _v, _r, _s]: [
        string,
        (BigNumberish)[],
        (Arrayish)[],
        (Arrayish)[]
      ]): string;
    }>;

    removeValidator: TypedFunctionDescription<{
      encode([_validator, _v, _r, _s]: [
        string,
        (BigNumberish)[],
        (Arrayish)[],
        (Arrayish)[]
      ]): string;
    }>;

    transferOwnership: TypedFunctionDescription<{
      encode([_newOwner]: [string]): string;
    }>;

    withdrawERC20: TypedFunctionDescription<{
      encode([amount, sig, contractAddress]: [
        BigNumberish,
        Arrayish,
        string
      ]): string;
    }>;

    depositERC20: TypedFunctionDescription<{
      encode([amount, contractAddress]: [BigNumberish, string]): string;
    }>;

    toggleAllowAnyToken: TypedFunctionDescription<{
      encode([_allow]: [boolean]): string;
    }>;
  };

  events: {
    ERC20Received: TypedEventDescription<{
      encodeTopics([from, amount, contractAddress]: [
        null,
        null,
        null
      ]): string[];
    }>;

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

    AddedValidator: TypedEventDescription<{
      encodeTopics([validator]: [null]): string[];
    }>;

    RemovedValidator: TypedEventDescription<{
      encodeTopics([validator]: [null]): string[];
    }>;

    OwnershipRenounced: TypedEventDescription<{
      encodeTopics([previousOwner]: [string | null]): string[];
    }>;

    OwnershipTransferred: TypedEventDescription<{
      encodeTopics([previousOwner, newOwner]: [
        string | null,
        string | null
      ]): string[];
    }>;
  };
}

export class ERC20Gateway extends Contract {
  connect(signerOrProvider: Signer | Provider | string): ERC20Gateway;
  attach(addressOrName: string): ERC20Gateway;
  deployed(): Promise<ERC20Gateway>;

  on(event: EventFilter | string, listener: Listener): ERC20Gateway;
  once(event: EventFilter | string, listener: Listener): ERC20Gateway;
  addListener(
    eventName: EventFilter | string,
    listener: Listener
  ): ERC20Gateway;
  removeAllListeners(eventName: EventFilter | string): ERC20Gateway;
  removeListener(eventName: any, listener: Listener): ERC20Gateway;

  interface: ERC20GatewayInterface;

  functions: {
    checkValidator(_address: string): Promise<boolean>;

    nonces(arg0: string): Promise<BigNumber>;

    allowedTokens(arg0: string): Promise<boolean>;

    getERC20(contractAddress: string): Promise<BigNumber>;

    toggleToken(
      _token: string,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>;

    addValidator(
      _validator: string,
      _v: (BigNumberish)[],
      _r: (Arrayish)[],
      _s: (Arrayish)[],
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>;

    removeValidator(
      _validator: string,
      _v: (BigNumberish)[],
      _r: (Arrayish)[],
      _s: (Arrayish)[],
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>;

    transferOwnership(
      _newOwner: string,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>;

    withdrawERC20(
      amount: BigNumberish,
      sig: Arrayish,
      contractAddress: string,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>;

    depositERC20(
      amount: BigNumberish,
      contractAddress: string,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>;

    toggleAllowAnyToken(
      _allow: boolean,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>;

    loomAddress(): Promise<string>;
    numValidators(): Promise<BigNumber>;
    allowAnyToken(): Promise<boolean>;
    owner(): Promise<string>;
    nonce(): Promise<BigNumber>;
  };

  filters: {
    ERC20Received(from: null, amount: null, contractAddress: null): EventFilter;

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

    AddedValidator(validator: null): EventFilter;

    RemovedValidator(validator: null): EventFilter;

    OwnershipRenounced(previousOwner: string | null): EventFilter;

    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): EventFilter;
  };

  estimate: {
    toggleToken(_token: string): Promise<BigNumber>;

    renounceOwnership(): Promise<BigNumber>;

    addValidator(
      _validator: string,
      _v: (BigNumberish)[],
      _r: (Arrayish)[],
      _s: (Arrayish)[]
    ): Promise<BigNumber>;

    removeValidator(
      _validator: string,
      _v: (BigNumberish)[],
      _r: (Arrayish)[],
      _s: (Arrayish)[]
    ): Promise<BigNumber>;

    transferOwnership(_newOwner: string): Promise<BigNumber>;

    withdrawERC20(
      amount: BigNumberish,
      sig: Arrayish,
      contractAddress: string
    ): Promise<BigNumber>;

    depositERC20(
      amount: BigNumberish,
      contractAddress: string
    ): Promise<BigNumber>;

    toggleAllowAnyToken(_allow: boolean): Promise<BigNumber>;
  };
}
