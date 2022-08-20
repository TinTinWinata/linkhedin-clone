import { stringLength } from "@firebase/util";
import { isObjectType } from "graphql";


export function addCharacterToString(str : String, newStr: String, idx: number)
{
  const result = str.slice(0, idx) + newStr + str.slice(idx);
  return result;
}

export function findHashtags(searchText : string) {
  var regexp = /\B\#\w\w+\b/g
  const result = searchText.match(regexp);
  if (result) {
    return result
  } else {
      return [];
  }
}

export function removeDuplicates(arr : any) {
  return arr.filter((item :any,
    index:any) => arr.indexOf(item) === index);
}

export function removeDuplicatesObjectId(arr : any)
{
  console.log(arr)
  const temp = []
  for (let i =0;i<arr.length;i++)
  {
    let isSame = false;
    const obj = arr[i];
    for(let j = 0;j<temp.length;j++)
    {
      const secObj = temp[j]
      if(obj.id === secObj.id)
      {
        isSame = true;
      }
    }
    if(!isSame) temp.push(obj)
  }
  return temp;
}

export function findAtTags(searchText : string) {
  var regexp = /\B\@\w\w+\b/g
  const result = searchText.match(regexp);
  if (result) {
    return result
  } else {
      return [];
  }
}

export function sortAtMention(str: string){
  // removing first index
  if(str.charAt(2) === '@')
  {
    const temp = str.slice(1)
    const tempArr = findAtTags(temp)    
    return tempArr[0]
  }else if(str.charAt(2) === '#'){
    const temp = str.slice(1)
    const tempArr = findHashtags(temp)    
    return tempArr[0]
  }
}

export function replaceAt(str: any, index: any,length: any, replacement: any) {
  return str.substring(0, index) + replacement + str.substring(index + length);
}

export function filteringAtMention(str : string){
  for(var i = 0; i < str.length;i++)
  {
    if(str.charAt(i) === '@')
    {
      let j = i;
      while(true){
        j++;
        if(str.charAt(j) === ' ' || j === str.length)
        break;
      }
      const obj = {
        "index" : i,
        "end" : j,
      }
      const wantToSort = str.slice(obj.index, obj.end);
      const newStr = sortAtMention(wantToSort)
      str = replaceAt(str, obj.index, obj.end - obj.index, newStr)
    }
  }
  return str;
}