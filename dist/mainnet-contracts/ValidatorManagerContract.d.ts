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

interface ValidatorManagerContractInterface extends Interface {
  functions: {
    rotateValidators: TypedFunctionDescription<{
      encode([_newValidators, _newPowers, _signIndexes, _v, _r, _s]: [
        (string)[],
        (BigNumberish)[],
        (BigNumberish)[],
        (BigNumberish)[],
        (Arrayish)[],
        (Arrayish)[]
      ]): string;
    }>;

    toggleAllowAnyToken: TypedFunctionDescription<{
      encode([allow, validatorIndex]: [boolean, BigNumberish]): string;
    }>;

    toggleAllowToken: TypedFunctionDescription<{
      encode([tokenAddress, allow, validatorIndex]: [
        string,
        boolean,
        BigNumberish
      ]): string;
    }>;
  };

  events: {
    ValidatorSetChanged: TypedEventDescription<{
      encodeTopics([_validators, _powers]: [null, null]): string[];
    }>;
  };
}

export class ValidatorManagerContract extends Contract {
  connect(
    signerOrProvider: Signer | Provider | string
  ): ValidatorManagerContract;
  attach(addressOrName: string): ValidatorManagerContract;
  deployed(): Promise<ValidatorManagerContract>;

  on(event: EventFilter | string, listener: Listener): ValidatorManagerContract;
  once(
    event: EventFilter | string,
    listener: Listener
  ): ValidatorManagerContract;
  addListener(
    eventName: EventFilter | string,
    listener: Listener
  ): ValidatorManagerContract;
  removeAllListeners(eventName: EventFilter | string): ValidatorManagerContract;
  removeListener(eventName: any, listener: Listener): ValidatorManagerContract;

  interface: ValidatorManagerContractInterface;

  functions: {
    validators(arg0: BigNumberish): Promise<string>;

    powers(arg0: BigNumberish): Promise<BigNumber>;

    nonces(arg0: string): Promise<BigNumber>;

    allowedTokens(arg0: string): Promise<boolean>;

    signedByValidator(
      _message: Arrayish,
      signersIndex: BigNumberish,
      _v: BigNumberish,
      _r: Arrayish,
      _s: Arrayish
    ): Promise<void>;

    checkThreshold(
      _message: Arrayish,
      signersIndex: (BigNumberish)[],
      _v: (BigNumberish)[],
      _r: (Arrayish)[],
      _s: (Arrayish)[]
    ): Promise<void>;

    isTokenAllowed(tokenAddress: string): Promise<boolean>;

    rotateValidators(
      _newValidators: (string)[],
      _newPowers: (BigNumberish)[],
      _signIndexes: (BigNumberish)[],
      _v: (BigNumberish)[],
      _r: (Arrayish)[],
      _s: (Arrayish)[],
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>;

    toggleAllowAnyToken(
      allow: boolean,
      validatorIndex: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>;

    toggleAllowToken(
      tokenAddress: string,
      allow: boolean,
      validatorIndex: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>;

    loomAddress(): Promise<string>;
    threshold_denom(): Promise<number>;
    nonce(): Promise<BigNumber>;
    threshold_num(): Promise<number>;
    totalPower(): Promise<BigNumber>;
    getPowers(): Promise<(BigNumber)[]>;
    getValidators(): Promise<(string)[]>;
  };

  filters: {
    ValidatorSetChanged(_validators: null, _powers: null): EventFilter;
  };

  estimate: {
    rotateValidators(
      _newValidators: (string)[],
      _newPowers: (BigNumberish)[],
      _signIndexes: (BigNumberish)[],
      _v: (BigNumberish)[],
      _r: (Arrayish)[],
      _s: (Arrayish)[]
    ): Promise<BigNumber>;

    toggleAllowAnyToken(
      allow: boolean,
      validatorIndex: BigNumberish
    ): Promise<BigNumber>;

    toggleAllowToken(
      tokenAddress: string,
      allow: boolean,
      validatorIndex: BigNumberish
    ): Promise<BigNumber>;
  };
}
