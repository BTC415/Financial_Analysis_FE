const FormatDate = ({ dateString, time }: { dateString: string; time: string }) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
  const day = ('0' + date.getDate()).slice(-2); // Add leading zero if needed
  const formattedDate = `${day}/${month}/${year} - ${time}`;
  return formattedDate

};

export default FormatDate;
