import BN from 'bn.js'
import { Client } from './client'
import { Contract } from './contract'
import { Address } from './address'
import {
  TransferGatewayWithdrawERC721Request,
  TransferGatewayWithdrawalReceiptRequest,
  TransferGatewayWithdrawalReceiptResponse,
  TransferGatewayWithdrawalReceipt,
  TransferGatewayTokenKind,
  TransferGatewayAddContractMappingRequest,
  TransferGatewayTokenWithdrawalSigned,
  TransferGatewayContractMappingConfirmed
} from './proto/loom_pb'
import { marshalBigUIntPB, unmarshalBigUIntPB } from './big-uint'
import { B64ToUint8Array } from './crypto-utils'

export interface ITransferGatewayReceipt {
  tokenOwner: Address
  // Mainnet address of token contract
  tokenContract: Address
  tokenKind: TransferGatewayTokenKind
  // ERC721 token ID, or amount of ERC20/ETH
  value: BN
  withdrawalNonce: BN
  // Signature generated by the Oracle that confirmed the withdrawal
  oracleSignature: Uint8Array
}

export interface ITransferGatewayEventTokenWithdrawal {
  tokenOwner: Address
  // Mainnet address of token contract, blank if ETH
  tokenContract: Address
  tokenKind: TransferGatewayTokenKind
  // ERC721 token ID, or amount of ERC20/ETH
  value: BN
  // Oracle signature
  sig: Uint8Array
}

export interface ITransferGatewayEventContractMappingConfirmed {
  // Address of a contract on a foreign blockchain
  foreignContract: Address
  // Address of corresponding contract on the local blockchain
  localContract: Address
}

export class TransferGateway extends Contract {
  // LoomJS user events
  static readonly EVENT_TOKEN_WITHDRAWAL = 'event_token_withdrawal'
  static readonly EVENT_CONTRACT_MAPPING_CONFIRMED = 'event_contract_mapping_confirmed'

  // Events from Loomchain
  private tokenWithdrawalSignedEventTopic: String = 'event:TokenWithdrawalSigned'
  private contractMappingConfirmedEventTopic: String = 'event:ContractMappingConfirmed'

  static async createAsync(client: Client, callerAddr: Address): Promise<TransferGateway> {
    const contractAddr = await client.getContractAddressAsync('gateway')
    if (!contractAddr) {
      throw Error('Failed to resolve contract address for TransferGateway')
    }

    return new TransferGateway({ contractAddr, callerAddr, client })
  }

  constructor(params: { contractAddr: Address; callerAddr: Address; client: Client }) {
    super(params)

    this.on(Contract.EVENT, event => {
      if (event.topics[0] === this.tokenWithdrawalSignedEventTopic) {
        const tokenWithdrawalSigned = TransferGatewayTokenWithdrawalSigned.deserializeBinary(
          B64ToUint8Array(event.data)
        )

        this.emit(TransferGateway.EVENT_TOKEN_WITHDRAWAL, {
          tokenOwner: Address.UmarshalPB(tokenWithdrawalSigned.getTokenOwner()!),
          tokenContract: Address.UmarshalPB(tokenWithdrawalSigned.getTokenContract()!),
          tokenKind: tokenWithdrawalSigned.getTokenKind(),
          value: unmarshalBigUIntPB(tokenWithdrawalSigned.getValue()!),
          sig: tokenWithdrawalSigned.getSig_asU8()
        } as ITransferGatewayEventTokenWithdrawal)
      }

      if (event.topics[0] === this.contractMappingConfirmedEventTopic) {
        const contractMappingConfirmed = TransferGatewayContractMappingConfirmed.deserializeBinary(
          B64ToUint8Array(event.data)
        )

        this.emit(TransferGateway.EVENT_CONTRACT_MAPPING_CONFIRMED, {
          foreignContract: Address.UmarshalPB(contractMappingConfirmed.getForeignContract()!),
          localContract: Address.UmarshalPB(contractMappingConfirmed.getLocalContract()!)
        } as ITransferGatewayEventContractMappingConfirmed)
      }
    })
  }

  async addContractMappingAsync(params: {
    foreignContract: Address
    localContract: Address
    foreignContractCreatorSig: Uint8Array
    foreignContractCreatorTxHash: Uint8Array
  }): Promise<void> {
    const {
      foreignContract,
      localContract,
      foreignContractCreatorSig,
      foreignContractCreatorTxHash
    } = params

    const mappingContractRequest = new TransferGatewayAddContractMappingRequest()
    mappingContractRequest.setForeignContract(foreignContract.MarshalPB())
    mappingContractRequest.setLocalContract(localContract.MarshalPB())
    mappingContractRequest.setForeignContractCreatorSig(foreignContractCreatorSig)
    mappingContractRequest.setForeignContractTxHash(foreignContractCreatorTxHash)

    return this.callAsync<void>('AddContractMapping', mappingContractRequest)
  }

  async withdrawERC721Async(tokenId: BN, tokenContract: Address): Promise<void> {
    const tgWithdrawERC721Req = new TransferGatewayWithdrawERC721Request()
    tgWithdrawERC721Req.setTokenId(marshalBigUIntPB(tokenId))
    tgWithdrawERC721Req.setTokenContract(tokenContract.MarshalPB())

    return this.callAsync<void>('WithdrawERC721', tgWithdrawERC721Req)
  }

  async withdrawalReceiptAsync(owner: Address): Promise<ITransferGatewayReceipt | null> {
    const tgWithdrawReceiptReq = new TransferGatewayWithdrawalReceiptRequest()
    tgWithdrawReceiptReq.setOwner(owner.MarshalPB())

    const result = await this.staticCallAsync(
      'WithdrawalReceipt',
      tgWithdrawReceiptReq,
      new TransferGatewayWithdrawalReceiptResponse()
    )

    const tgReceipt = result.getReceipt() as TransferGatewayWithdrawalReceipt

    if (tgReceipt) {
      return {
        tokenOwner: Address.UmarshalPB(tgReceipt.getTokenOwner()!),
        tokenContract: Address.UmarshalPB(tgReceipt.getTokenContract()!),
        tokenKind: tgReceipt.getTokenKind(),
        value: unmarshalBigUIntPB(tgReceipt.getValue()!),
        withdrawalNonce: new BN(tgReceipt.getWithdrawalNonce()!),
        oracleSignature: tgReceipt.getOracleSignature_asU8()
      } as ITransferGatewayReceipt
    } else {
      return null
    }
  }
}
