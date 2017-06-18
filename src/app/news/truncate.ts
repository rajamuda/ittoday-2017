// truncate.ts

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, args: string[]) : string {
  	value = this.strip(value);

    let limit = args.length > 0 ? parseInt(args[0], 10) : 200;
    let trail = args.length > 1 ? args[1] : '...';
    // console.log(args)
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }

  strip(html){
		var tmp = document.createElement("DIV");
		tmp.innerHTML = html;
		return tmp.textContent || tmp.innerText || "";
	}
}