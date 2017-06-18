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
# include <stdarg.h>
#include <ctype.h>

#define NB_INSTRUCTIONS 220
#define TRANSCRIPTION_FILE "/instruction.transcription"
#define FILEIDS_FILE "/instruction.fileids"
#define LOG_FILE "/log.txt"
#define RESPONSE_INSTRUCTION_FILE "/response_instruction.txt"
#define RESPONSE_TRAIN_FILE "/response_train.txt"
#define END_OF_TRAIN  "END OF TRAIN"
#define BASE_LOG "logs/"
#define BASE_AUDIO "audio/"
#define BASE_TRAIN_UTILS "train_utils/"
#define TRAIN_SH_FILE "/tutorial/train_model.sh"

typedef struct s_cmd
{
  int id;
  char *key_words;
  char *train_sentence;
  int is_train;
}              t_cmd;

const char *get_hyp(char *argv[]);
char *toupper_str(char *str);
#endif
