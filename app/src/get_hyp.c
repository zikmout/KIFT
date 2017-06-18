#include "kift.h"


char *toupper_str(char *str)
{
  int i = -1;
  int diff = 'A' - 'a';
  //printf(">>>>>>>>>>>>>>>>>>>>>>%s\n", str);
  if (!str || !str[0])
    return (str);
  while (++i && str[i] )
    str[i] = str[i] + diff;
  //printf(">>>>>>>>>>>>>>>>>>>>>>>>>> %s\n", str);
  return (str);
}

