import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface PriceEntry { 'timestamp' : bigint, 'price' : number }
export interface _SERVICE {
  'addPrice' : ActorMethod<[number], undefined>,
  'getAveragePrice' : ActorMethod<[], [] | [number]>,
  'getPrices' : ActorMethod<[], Array<PriceEntry>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
