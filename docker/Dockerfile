FROM debian:jessie

MAINTAINER ziKmouT <ssicard@student.42.fr>

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && apt-get install -y \
		dialog \
		git \
		libxml2-dev \
		python \
		build-essential \
		make \
		gcc \
		python-dev \
		locales \
		python-pip \
		nginx \
		openssh-server \
		supervisor

RUN dpkg-reconfigure locales && \
		locale-gen C.UTF-8 && \
		/usr/sbin/update-locale LANG=C.UTF-8

ENV LC_ALL C.UTF-8
