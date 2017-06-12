#ifndef KIFT_H
#define KIFT_H 

# include <string.h>
# include <pocketsphinx.h>
# include <unistd.h>
# include <string.h>
# include <sys/types.h>
# include <sys/uio.h>
# include <stdio.h>
# include <fcntl.h>
# include <stdlib.h>

#define NB_INSTRUCTIONS 3
#define TRANSCRIPTION_FILE "../../app/tutorial/instruction.transcription"
#define FILEIDS_FILE "../../app/tutorial/instruction.fileids"
#define LOG_FILE "log.txt"
#define ID_INSTRUCTION_FILE "id_inst.txt"


typedef struct s_cmd
{
  int id;
  char *key_words;
  char *train_sentence;
}              t_cmd;

#endif
