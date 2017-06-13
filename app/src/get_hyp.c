#include "kift.h"

const char *get_hyp(char *argv[])
{
  ps_decoder_t *ps;
  cmd_ln_t *config;
  char const *hyp, *uttid;
  int16 buf[512];
  int rv;
  int32 score;
  FILE *fh;

  config = cmd_ln_init(NULL, ps_args(), TRUE,
		       "-hmm", MODELDIR "/en-us/en-us",
		       "-lm","/var/www/html/app/tutorial/init.lm",
		       "-dict", "/var/www/html/app/tutorial/init.dic",
		       NULL);
  if (config == NULL) {
    fprintf(stderr, "Failed to create config object, see log for  details\n");
    return NULL;
  }
  ps = ps_init(config);
  if (ps == NULL) {
    fprintf(stderr, "Failed to create recognizer, see log for  details\n");
    return NULL;
  }
  fh = fopen(argv[1], "rb");
  if (fh == NULL) {
    fprintf(stderr, "Unable to open input file %s\n", argv[1]);
    return NULL;
  }
  rv = ps_start_utt(ps);
  char *username;
  username = argv[2];
  if (username == NULL)
    {
      fprintf(stderr, "Failed to assign username\n");
      return (NULL);
    }

  while (!feof(fh)) {
    size_t nsamp;
    nsamp = fread(buf, 2, 512, fh);
    rv = ps_process_raw(ps, buf, nsamp, FALSE, FALSE);
  }

  rv = ps_end_utt(ps);
  hyp = ps_get_hyp(ps, &score);
  char *ret;
  ret= strdup((char*)hyp);
  fclose(fh);
  ps_free(ps);
  cmd_ln_free_r(config);
 
  return (ret);
}
