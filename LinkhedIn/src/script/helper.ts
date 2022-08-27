import { stringLength } from "@firebase/util";
import { isObjectType } from "graphql";
import { toastError } from "../config/toast";


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

export function removeDuplicatesObjectID(arr : any)
{
  const temp = []
  for (let i =0;i<arr.length;i++)
  {
    let isSame = false;
    const obj = arr[i];
    for(let j = 0;j<temp.length;j++)
    {
      const secObj = temp[j]
      if(obj.ID === secObj.ID)
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

export function isAFirebaseImage(url: string){
  if(url.includes("https://firebasestorage"))
  return true;
  else return false;
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

export function addString(str: string, idx : number, add: string){
 return str.slice(0, idx) + add + str.slice(idx);
}

export function appendDivString(str: string, idx : number,end:number, div: string, lastDiv : string){
  const len = div.length;
  str =  str.slice(0, idx) + div + str.slice(idx);
  str = str.slice(0, len + end - 1)  + lastDiv + str.slice(len + end ) ;
  return str;
 }

export function RichTextPost(str : string, idx : any){
  for(let i=0;i<str.length;i++){
    if(i >= 500)
    {
      toastError("There are error in loading data!")
      return "";
    }
    if(str.charAt(i) === '@'){
      let text = ""
      for(let j=i;j<str.length;j++){
        if(j != i)
        text += str.charAt(j)
        text = text.trim()
        if(str.charAt(j) == ' ' || j == str.length - 1){
          const div = `<a href="/profile/${text}" value="${text}" id="rich-tag${"-" + idx}" class='richat ri-class-${idx}'>`
          const endDiv = '</a>'
          const lenDiv = div.length + 1;
          str = appendDivString(str, i, j + 1, div , endDiv)
          i += lenDiv;
          break;
        }
      }
    }
    if(str.charAt(i) === '#'){
      let text = ""
      for(let j=i;j<str.length;j++){
        if(j != i)
        text += str.charAt(j)
        if(str.charAt(j) == ' ' || j == str.length - 1){
          const div = `<a href='/search/${text}' class='richhashtag'>`
          const endDiv = '</a>'
          const lenDiv = div.length + 1;
          str = appendDivString(str, i, j + 1, div , endDiv)
          i += lenDiv;
          break;
        }
      }
    }


    if(str.slice(i, i + 4) === 'http')
    {
      let text = ""
        for(let j = i;j < str.length;j++){
        const char = str.charAt(j);
        text += char;
        if(char === ' ' || j === str.length - 1)
        {
          const div = `<a href=${text}>`
          const endDiv = `</a>`
          const lenDiv = div.length + 1;
          str = appendDivString(str, i, j + 1, div, endDiv);
          i += lenDiv;
          break;
        }
      }

    }

    //    if(idxHttp === -1 || str.charAt(idxHttp - 1) === '>') break;
    //   let end :number = 0;
    //   let text = ""
    //   for(let i = idxHttp;i < str.length;i++){
    //     const char = str.charAt(i);
    //     text += char;
    //     if(char === ' ' || i === str.length - 1)
    //     {
    //       end = i;
    //       break;
    //     }
    //   }

  }
  
  return str;
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