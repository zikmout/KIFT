#include <string.h>
#include <pocketsphinx.h>
#include <unistd.h>
# include <string.h>
# include <sys/types.h>
# include <sys/uio.h>
# include <unistd.h>
# include <fcntl.h>
# include <stdlib.h>

#define NB_INSTRUCTIONS 3
typedef struct s_cmd
{
  int id;
  char *key_words;
}              t_cmd;

t_cmd g_cmds[NB_INSTRUCTIONS]=
  {
    {0, NULL},
    {1, "ALARM"},
    {2, "WEATHER RAIN"}
  };

int get_id_by_hyp(const char *hyp)
{
  int i = 0;
  while (++i < NB_INSTRUCTIONS)
    {
      if (strstr(hyp, g_cmds[i].key_words))
	return (i);
    }
  return (-1);  
  
}

int main(int argc, char *argv[])
{
    ps_decoder_t *ps;
    cmd_ln_t *config;
    FILE *fh;
    char const *hyp, *uttid;
    int16 buf[512];
    int rv;
    int32 score;
    char *username;

    //    config = cmd_ln_init(NULL, ps_args(), TRUE,
    //           "-hmm", MODELDIR "/en-us/en-us",
    //           "-lm", MODELDIR "/en-us/en-us.lm.bin",
    //           "-jsgf", "hello_team.gram",
    //           "-dict", MODELDIR "/en-us/cmudict-en-us.dict",
    //           NULL);

    config = cmd_ln_init(NULL, ps_args(), TRUE,
			 "-hmm", MODELDIR "/en-us/en-us",
			 "-lm","/var/www/html/app/tutorial/init.lm",
			 "-dict", "/var/www/html/app/tutorial/init.dic",
			 NULL);
    if (config == NULL) {
        fprintf(stderr, "Failed to create config object, see log for  details\n");
        return -1;
    }

    ps = ps_init(config);
    if (ps == NULL) {
        fprintf(stderr, "Failed to create recognizer, see log for  details\n");
        return -1;
    }
    fh = fopen(argv[1], "rb");
    if (fh == NULL) {
      fprintf(stderr, "Unable to open input file %s\n", argv[1]);
        return -1;
    }

    rv = ps_start_utt(ps);
    //    username = argv[2];
    //if (username == NULL) 
    //{
    // fprintf(stderr, "Failed to assign username\n");
    //  return (-1);
    //}
      
    while (!feof(fh)) {
        size_t nsamp;
        nsamp = fread(buf, 2, 512, fh);
        rv = ps_process_raw(ps, buf, nsamp, FALSE, FALSE);
    }

    rv = ps_end_utt(ps);
    hyp = ps_get_hyp(ps, &score);
    printf("Recognized: %s\n", hyp);
    int fd = 0;
    char *filename = argv[1];
    filename[strlen(argv[1]) - 4] = '\0';
    if ((fd = open(filename, O_RDWR | O_CREAT, 0666)) == -1)
      return (-1);
    write(fd, hyp, strlen(hyp));
    write(fd, " (", 2);
    write(fd, argv[1], strlen(argv[1]));
    write(fd, ")\n", 2);
    close(fd);
    if (strstr(hyp, "ALARM"))
    {
	printf("*** *** *** *** ***");
    }
    int id_instruction = 0;
    if ((id_instruction = get_id_by_hyp(hyp)) == -1)
      {
	fprintf(stderr, "Failed to recognize instruction\n");
	return -1;
      }
    printf("id instruction %i\n", get_id_by_hyp(hyp));
    fclose(fh);
    ps_free(ps);
    cmd_ln_free_r(config);

    return 0;
}
