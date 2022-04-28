
export default function formatageDate (item_date){
    var date = new Date(item_date);
    if(date.getMonth()>9 || date.getMonth()<2 || (date.getMonth()==9 && date.getDay()>20) || (date.getMonth()==2 && date.getDay()<=20) ){
      date.setTime( date.getTime() + 60*60*1000+date.getTimezoneOffset()*60*1000);
    }else{
      date.setTime( date.getTime() + 2*60*60*1000+date.getTimezoneOffset()*60*1000);
    }
    var  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    var formattedDate =date.getDate()+" "+months[(date.getMonth())]+". "+ date.getFullYear(); 
    return formattedDate
}