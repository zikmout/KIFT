NAME	=	kift2
CC	=  	gcc -D_GNU_SOURCE
CFLAGS	= 	-Wall 
RM	=	 rm -f
LIBFT	=	 -L../libft -lft
SRCS	=	get_hyp.c kift2.c
 
OBJS	=   $(SRCS:.c=.o)

LIBFT_PATH	= ../libft

all:	$(NAME)

$(NAME):$(OBJS)
	@gcc -D_GNU_SOURCE -I. $< -DMODELDIR=\"`pkg-config --variable=modeldir pocketsphinx`\"    `pkg-config --cflags --libs pocketsphinx sphinxbase` -o $@

%.o: %.c
	@gcc -D_GNU_SOURCE -I. -c $< -DMODELDIR=\"`pkg-config --variable=modeldir pocketsphinx`\"    `pkg-config --cflags pocketsphinx sphinxbase` -o $@

clean:
	@rm -f $(OBJS)

fclean:	clean
	@rm -f $(NAME)

re:		fclean all

.PHONY:		all clean fclean re

