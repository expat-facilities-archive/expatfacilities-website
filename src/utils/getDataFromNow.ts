export const getDataFromNow = (dataList: any[], beforeNow: boolean) => {
  const currentDate = new Date().getTime();
  if (beforeNow) {
    return dataList.filter(
      (item) => getDateFromObject(item.date.end) >= currentDate
    );
  } else {
    return dataList.filter(
      (item) => getDateFromObject(item.date.end) <= currentDate
    );
  }
};

const getDateFromObject = (date: string) => {
  const dateArray: any[] = date.split("-");
  const dateA = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
  return dateA.getTime();
};
