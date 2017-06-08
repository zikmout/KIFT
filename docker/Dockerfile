FROM debian:jessie

MAINTAINER ziKmouT <ssicard@student.42.fr>

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && apt-get install -y \
		dialog \
		git \
		#libxml2-dev \
		python \
		#build-essential \
		make \
		gcc \
		python-dev \
		locales \
		python-pip \
		nginx \
		openssh-server \
		supervisor \
		curl \
		zsh \
		wget

RUN dpkg-reconfigure locales && \
		locale-gen C.UTF-8 && \
		/usr/sbin/update-locale LANG=C.UTF-8

ENV LC_ALL C.UTF-8

RUN pip install --upgrade virtualenv
RUN apt-get install -y python-pip python-dev python-virtualenv 
RUN mkdir -p /home/tensorflow
RUN virtualenv --system-site-packages /home/tensorflow/
#RUN sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
RUN git clone git://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh 
RUN cp ~/.zshrc ~/.zshrc.orig
RUN cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
RUN chsh -s /bin/zsh
