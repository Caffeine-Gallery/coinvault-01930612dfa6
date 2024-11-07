export const idlFactory = ({ IDL }) => {
  const PriceEntry = IDL.Record({
    'timestamp' : IDL.Int,
    'price' : IDL.Float64,
  });
  return IDL.Service({
    'addPrice' : IDL.Func([IDL.Float64], [], []),
    'getPrices' : IDL.Func([], [IDL.Vec(PriceEntry)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
