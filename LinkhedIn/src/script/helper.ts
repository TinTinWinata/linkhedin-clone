

export function addCharacterToString(str : String, newStr: String, idx: number)
{
  const result = str.slice(0, idx) + newStr + str.slice(idx);
  return result;
}
