export const formatDate=(date)=>{
    const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      });
    
      const formattedDate = formatter.format(date);
      return formattedDate

}