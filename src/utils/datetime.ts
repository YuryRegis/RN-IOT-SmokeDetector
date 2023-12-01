export function getDateFromIsoFormat(isoDate: string): string {
  const date = new Date(isoDate);
  // console.log(
  //   `${date.getUTCDay()}/${
  //     date.getUTCMonth() + 1
  //   } ${date.getUTCHours()}:${date.getUTCMinutes()}`,
  // );

  return `${date.getUTCDate()}/${
    date.getUTCMonth() + 1
  } ${date.getUTCHours()}:${date.getUTCMinutes()}`;
}
