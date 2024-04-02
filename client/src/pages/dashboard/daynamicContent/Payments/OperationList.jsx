function OperationList({ operationList, totalPrice }) {
  return (
    <div className="operationList  ">
      <ul className="h-full">
        <li className="flex justify-around select-non bg-p bg-ph text-white p-2">
          <span>operation : </span>
          <span className="inline-block w-16">prix :</span>
        </li>
        <div className=" h-[382px] overflow-y-auto py-2">
          {operationList.map((operation, index) => (
            <li key={index} className="flex justify-around p-3">
              <span>
                {index + 1} - {operation.label}
              </span>
              <span>{operation.price} DA</span>
            </li>
          ))}
        </div>
        <li className="flex justify-around select-non bg-p bg-ph text-white p-2 rounded-md">
          <span>Total : </span>
          <span>{totalPrice} DA</span>
        </li>
      </ul>
    </div>
  );
}

export default OperationList;
