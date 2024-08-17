export const FormatDate = ({ dateString, time }: { dateString: string; time: string }) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
  const day = ('0' + date.getDate()).slice(-2); // Add leading zero if needed
  const formattedDate = `${day}/${month}/${year} - ${time}`;
  return formattedDate
};

export const DetailedDate = ({ dateString, time }: { dateString: string; time: string }) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
  const day = ('0' + date.getDate()).slice(-2); // Add leading zero if needed
  const monthName = getMonthName({ monthNumber: parseInt(month) });
  const DetailedDate = `${day} de ${monthName}.de ${year} - ${time}`
  return DetailedDate
}

export function getMonthName({ monthNumber }: { monthNumber: number }) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  if (monthNumber >= 1 && monthNumber <= 12) {
    return months[monthNumber - 1];
  } else {
    return 'Invalid month number';
  }
}