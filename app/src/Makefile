

NAME		:= kift

SRC			:=	kift.c

OBJ			:= $(SRC:%.c=%.o)

# Colors
NO_COLOR	:= \x1b[0m
GREEN		:= \x1b[32;01m
RED			:= \x1b[31;01m
YELLOW		:= \x1b[33;01m
GRAY		:= \x1b[30;01m


.PHONY: all re clean fclean

all: $(NAME)

$(NAME): $(OBJ)
	@printf "$(GRAY)Creating $(RED)$(NAME) $(NO_COLOR)"
	@gcc -I. $< -DMODELDIR=\"`pkg-config --variable=modeldir pocketsphinx`\"    `pkg-config --cflags --libs pocketsphinx sphinxbase` -o $@ 
	@if [ -a $(NAME) ] ; \
	then \
		printf "\e[31G$(GREEN)✓$(NO_COLOR)\n" ; \
	fi;

%.o: %.c
	@printf "$(GRAY)Compiling $(GREEN)$(<:src/%.c=%) $(NO_COLOR)"
	@gcc -I. -c $< -DMODELDIR=\"`pkg-config --variable=modeldir pocketsphinx`\"    `pkg-config --cflags pocketsphinx sphinxbase` -o $@
	@if [ -a $(<) ] ; \
	then \
		printf "\e[31G$(GREEN)✓$(NO_COLOR)\n" ; \
	fi;

clean:
	@printf "$(GRAY)Removing objects$(NO_COLOR)"
	@rm -f $(OBJ)
	@printf "\e[31G$(GREEN)✓$(NO_COLOR)\n"

fclean: clean
	@printf "$(GRAY)Removing library/executable$(NO_COLOR)"
	@rm -f $(NAME)
	@printf "\e[31G$(GREEN)✓$(NO_COLOR)\n"

re: fclean all
