import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  standalone: true
})
export class TimePipe implements PipeTransform {

  transform(value: number) {
    var minute=value%60;
    var hour=((value-minute)/60)
    if(hour<1){
    hour=0
    const goodTime=`${minute} minute`;
    return goodTime;
    }
    if(minute==0){
      const goodTime=`${hour} hour`;
      return goodTime;
    }
      const goodTime=`${hour} hour and ${minute} minute`;
    return goodTime;
  }

}
