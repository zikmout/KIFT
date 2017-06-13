# include <string.h>

# include <unistd.h>
# include <string.h>
# include <sys/types.h>
# include <sys/uio.h>
# include <stdio.h>
# include <fcntl.h>
# include <stdlib.h>
# include <stdarg.h>
int main(int ac, char **av)
{
  int fd = -1;
  if ((fd = open("file2", O_RDWR | O_CREAT | O_APPEND, 0666)) == -1)
    return (-1);
  if (ac > 1 && av[1])
    write(fd,av[1],strlen(av[1]));
  else
    write(fd,"EMPTY\n",6);
  close(fd);
  return 1;
}
